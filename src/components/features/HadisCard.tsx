'use client';

import { useState, type ReactNode } from 'react';
import { Bookmark, Check, Copy, Info } from 'lucide-react';
import type { Hadith } from '../../lib/validations/content';
import { translateCategoryName, translateDalilSource, translateDalilStatus } from '../../lib/i18n';
import { useLanguage } from '../../context/LanguageContext';
import { ClickableText } from './ClickableText';
import { LatinGuideButton } from './LatinGuideButton';

interface HadisCardProps {
  hadith: Hadith;
  categoryName?: string;
  categoryNameEn?: string;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
  adminActions?: ReactNode;
}

export function HadisCard({
  hadith,
  categoryName,
  categoryNameEn,
  isBookmarked,
  onToggleBookmark,
  adminActions,
}: HadisCardProps) {
  const { lang, t, pick } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [showDalil, setShowDalil] = useState(false);

  const displayTitle = pick(hadith.title, hadith.titleEn);
  const displayTranslation = pick(hadith.translation, hadith.translationEn);
  const displayDalilText = pick(hadith.dalilText || '', hadith.dalilTextEn);
  const displayTafsir = pick(hadith.tafsir || '', hadith.tafsirEn);
  const displaySource = translateDalilSource(hadith.source, lang);

  const handleCopy = async () => {
    const parts = [displayTitle];
    if (hadith.arabicText) {
      parts.push('', hadith.arabicText);
    }
    if (hadith.latinText) {
      parts.push('', hadith.latinText);
    }
    parts.push('', `"${displayTranslation}"`);
    const meta = [hadith.narrator, displaySource, translateDalilStatus(hadith.dalilStatus || '', lang)]
      .filter(Boolean)
      .join(' · ');
    if (meta) {
      parts.push(`(${meta})`);
    }

    try {
      await navigator.clipboard.writeText(parts.join('\n'));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard unavailability
    }
  };

  return (
    <article className="neu-outset p-6 sm:p-8 flex flex-col justify-between gap-6">
      <div>
        {/* Unboxed metadata line */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--color-border)]/60">
          <p className="text-xs font-medium text-[var(--color-text-secondary)] flex flex-wrap items-center gap-2">
            {categoryName && <span>{translateCategoryName(categoryName, lang, categoryNameEn)}</span>}
            {categoryName && displaySource && <span aria-hidden="true">·</span>}
            {displaySource && (
              <span>
                <ClickableText text={displaySource} />
              </span>
            )}
            {hadith.dalilStatus && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-primary-600 dark:text-primary-400 font-semibold">
                  {translateDalilStatus(hadith.dalilStatus, lang)}
                </span>
              </>
            )}
          </p>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowDalil((prev) => !prev)}
              aria-expanded={showDalil}
              aria-label={`${t.zikir.dalilBtn} ${displayTitle}`}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] ${
                showDalil
                  ? 'neu-inset-sm text-accent-600 dark:text-accent-400 font-semibold'
                  : 'neu-outset-sm text-[var(--color-text-secondary)] hover:text-accent-600 dark:hover:text-accent-400'
              }`}
            >
              <Info className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.zikir.dalilBtn}</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleBookmark(hadith.id)}
              aria-pressed={isBookmarked}
              aria-label={isBookmarked ? t.hadis.saved : t.hadis.save}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] ${
                isBookmarked
                  ? 'neu-inset-sm text-primary-600 dark:text-primary-400'
                  : 'neu-outset-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              <Bookmark
                className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`}
                aria-hidden="true"
              />
              <span>{isBookmarked ? t.hadis.saved : t.hadis.save}</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              aria-label={`${t.zikir.copy} ${displayTitle}`}
              className="neu-outset-sm inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[var(--color-text-primary)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-primary-500" aria-hidden="true" />
                  <span>{t.zikir.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.zikir.copy}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {showDalil && (
          <div className="neu-inset-sm mt-4 p-4 sm:p-5 space-y-3">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-accent-600 dark:text-accent-400">
                {t.zikir.dalilHeading}
              </p>
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">
                <ClickableText text={displaySource} />{' '}
                {hadith.dalilStatus ? `· ${translateDalilStatus(hadith.dalilStatus, lang)}` : ''}
              </p>
              {displayDalilText && (
                <p className="font-prose text-sm leading-relaxed text-[var(--color-text-primary)] pt-1">
                  <ClickableText text={displayDalilText} />
                </p>
              )}
            </div>

            {displayTafsir && (
              <div className="pt-2.5 border-t border-[var(--color-border)]/60 space-y-1">
                <p className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                  {t.zikir.tafsirHeading}
                </p>
                <p className="font-prose text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  <ClickableText text={displayTafsir} />
                </p>
              </div>
            )}
          </div>
        )}

        <h2 className="mt-5 text-xl font-bold text-[var(--color-text-primary)] tracking-tight leading-snug">
          {displayTitle}
        </h2>

        {hadith.arabicText && (
          <div className="neu-inset mt-5 p-5 sm:p-6">
            <p
              lang="ar"
              dir="rtl"
              className="font-arabic text-right text-2xl sm:text-[1.75rem] leading-[2.25] text-[var(--color-text-primary)]"
            >
              {hadith.arabicText}
            </p>
          </div>
        )}

        {hadith.latinText && (
          <div className="mt-4">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                {t.zikir.latinLabel}
              </p>
              <LatinGuideButton />
            </div>
            <p className="mt-1 text-sm sm:text-base italic leading-relaxed text-[var(--color-text-secondary)] max-w-prose">
              {hadith.latinText}
            </p>
          </div>
        )}

        <p className="mt-4 font-prose text-base sm:text-[1.0625rem] leading-relaxed text-[var(--color-text-primary)] max-w-prose">
          “<ClickableText text={displayTranslation} />”
        </p>
      </div>

      {hadith.narrator && (
        <footer className="pt-4 border-t border-[var(--color-border)]/60 text-xs sm:text-sm text-[var(--color-text-secondary)]">
          {t.hadis.narratedBy}{' '}
          <span className="font-medium text-[var(--color-text-primary)]">
            <ClickableText text={hadith.narrator} />
          </span>
        </footer>
      )}

      {adminActions && (
        <div className="pt-3 border-t border-[var(--color-border)]/60 flex flex-wrap items-center justify-between gap-2">
          {adminActions}
        </div>
      )}
    </article>
  );
}
