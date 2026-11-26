'use client';

import { Fragment, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useScholar } from '../../context/ScholarContext';
import type { ScholarFigure } from '../../lib/validations/content';

interface ClickableTextProps {
  text: string;
}

const WORD_CHAR_REGEX = /[\p{L}\p{N}_]/u;

function isWordBoundaryChar(ch: string | undefined): boolean {
  if (!ch) return true;
  return !WORD_CHAR_REGEX.test(ch);
}

interface TextSegment {
  text: string;
  figure?: ScholarFigure;
}

/**
 * Renders text where ONLY exact matches of admin-registered & published ScholarFigure names
 * become clickable buttons. Any typo in the admin's configured `name` (or casing/spelling mismatch)
 * intentionally prevents matching so only verified exact names are clickable.
 */
export function ClickableText({ text }: ClickableTextProps) {
  const { lang } = useLanguage();
  const { figures, openFigure } = useScholar();

  const sortedFigures = useMemo(() => {
    return [...figures]
      .filter((f) => f.isPublished && f.name.trim().length > 0)
      .sort((a, b) => b.name.length - a.name.length);
  }, [figures]);

  const segments = useMemo<TextSegment[]>(() => {
    if (!text || sortedFigures.length === 0) {
      return [{ text }];
    }

    const result: TextSegment[] = [];
    let cursor = 0;
    let plainStart = 0;

    while (cursor < text.length) {
      let matchedFigure: ScholarFigure | undefined;

      for (const fig of sortedFigures) {
        const name = fig.name;
        if (text.startsWith(name, cursor)) {
          const prevChar = cursor > 0 ? text[cursor - 1] : undefined;
          const nextChar = cursor + name.length < text.length ? text[cursor + name.length] : undefined;
          if (isWordBoundaryChar(prevChar) && isWordBoundaryChar(nextChar)) {
            matchedFigure = fig;
            break;
          }
        }
      }

      if (matchedFigure) {
        if (cursor > plainStart) {
          result.push({ text: text.slice(plainStart, cursor) });
        }
        result.push({
          text: text.slice(cursor, cursor + matchedFigure.name.length),
          figure: matchedFigure,
        });
        cursor += matchedFigure.name.length;
        plainStart = cursor;
      } else {
        cursor += 1;
      }
    }

    if (plainStart < text.length) {
      result.push({ text: text.slice(plainStart) });
    }

    return result;
  }, [text, sortedFigures]);

  return (
    <>
      {segments.map((seg, idx) =>
        seg.figure ? (
          <button
            key={`${idx}-${seg.figure.id}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openFigure(seg.figure!);
            }}
            title={
              lang === 'en'
                ? `${seg.figure.name} — Click to view lineage & hadith biography`
                : `${seg.figure.name} — Klik untuk melihat jalur nasab & biografi ilmu hadis`
            }
            className="inline text-left font-semibold text-primary-700 dark:text-primary-300 underline decoration-dotted decoration-primary-500/75 underline-offset-4 hover:text-primary-600 dark:hover:text-primary-200 hover:decoration-solid transition-colors cursor-pointer"
          >
            {seg.text}
          </button>
        ) : (
          <Fragment key={idx}>{seg.text}</Fragment>
        )
      )}
    </>
  );
}
