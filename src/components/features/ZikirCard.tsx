'use client';

import { useState, type ReactNode } from 'react';
import { Check, Copy, Info, RotateCcw } from 'lucide-react';
import { ZIKIR_TIME_LABELS, type Zikir } from '../../lib/validations/content';
import { translateCategoryName, translateDalilSource, translateDalilStatus } from '../../lib/i18n';
import { useLanguage } from '../../context/LanguageContext';
import { ClickableText } from './ClickableText';
import { LatinGuideButton } from './LatinGuideButton';

export type ArabicSize = 'md' | 'lg' | 'xl';

interface ZikirCardProps {
  zikir: Zikir;
  categoryName?: string;
  categoryNameEn?: string;
  arabicSize: ArabicSize;
  showLatin: boolean;
  index: number;
  count: number;
  isActive: boolean;
  onSelect: () => void;
  onIncrement: () => void;
  onReset: () => void;
  adminActions?: ReactNode;
}

const ARABIC_SIZE_CLASS: Record<ArabicSize, string> = {
  md: 'text-2xl sm:text-[1.75rem] leading-[2.25]',
  lg: 'text-3xl sm:text-[2.15rem] leading-[2.3]',
  xl: 'text-[2.1rem] sm:text-[2.5rem] leading-[2.35]',
};

export function ZikirCard({
  zikir,
  categoryName,
  categoryNameEn,
  arabicSize,
  showLatin,
  index,
  count,
  isActive,
  onSelect,
  onIncrement,
  onReset,
  adminActions,
}: ZikirCardProps) {
  const { lang, t, pick } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [showDalil, setShowDalil] = useState(false);

  const isUnlimited = zikir.repeatCount === 0;
  const isCompleted = !isUnlimited && count >= zikir.repeatCount;
  const displayTitle = pick(zikir.title, zikir.titleEn);
  const displayTranslation = pick(zikir.translation, zikir.translationEn);
  const displayDalilText = pick(zikir.dalilText || zikir.reference, zikir.dalilTextEn);
  const displayTafsir = pick(zikir.tafsir || '', zikir.tafsirEn);
  const displaySource = translateDalilSource(zikir.dalilSource || zikir.reference, lang);
  const timeLabel = ZIKIR_TIME_LABELS[zikir.timeOfDay][lang];

  const handleCopy = async () => {
    const lines = [displayTitle, '', zikir.arabicText];
    if (zikir.latinText) {
      lines.push('', zikir.latinText);
    }
    lines.push('', displayTranslation);
    if (displaySource) {
      lines.push(`(${displaySource})`);
    }
    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard unavailability
    }
  };

  return (
    <article
      id={`zikir-card-${zikir.id}`}
      onClick={onSelect}
      className={`neu-outset p-5 sm:p-8 transition-all duration-200 ${
        isCompleted
          ? 'ring-2 ring-primary-500/50'
          : isActive
          ? 'ring-1 ring-accent-500/40'
          : ''
      }`}
    >
      {/* Header metadata: unboxed typographic separators */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-[var(--color-border)]/60">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-[var(--color-text-secondary)] flex flex-wrap items-center gap-2">
            <span className="font-mono tabular-nums">{String(index + 1).padStart(2, '0')}</span>
            <span aria-hidden="true">·</span>
            <span>{timeLabel}</span>
            {categoryName && (
              <>
                <span aria-hidden="true">·</span>
                <span>{translateCategoryName(categoryName, lang, categoryNameEn)}</span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              {isUnlimited
                ? t.zikir.unlimited
                : lang === 'en'
                ? `Read ${zikir.repeatCount}x`
                : `Dibaca ${zikir.repeatCount}x`}
            </span>
          </p>
          <h2 className="mt-1.5 text-lg sm:text-xl font-bold text-[var(--color-text-primary)] tracking-tight">
            {displayTitle}
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowDalil((prev) => !prev);
            }}
            aria-expanded={showDalil}
            aria-label={`${t.zikir.dalilBtn} ${displayTitle}`}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] ${
              showDalil
                ? 'neu-inset-sm text-accent-600 dark:text-accent-400 font-semibold'
                : 'neu-outset-sm text-[var(--color-text-primary)] hover:text-accent-600 dark:hover:text-accent-400'
            }`}
          >
            <Info className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.zikir.dalilBtn}</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              void handleCopy();
            }}
            aria-label={`${t.zikir.copy} ${displayTitle}`}
            className="neu-outset-sm inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[var(--color-text-primary)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
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

      {/* Expandable Full Dalil, Status & Tafsir Disclosure */}
      {showDalil && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="neu-inset-sm mt-5 p-4 sm:p-6 space-y-4"
        >
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-accent-600 dark:text-accent-400">
              {t.zikir.dalilHeading}
            </p>
            <p className="text-xs font-medium text-[var(--color-text-secondary)] flex flex-wrap items-center gap-2">
              <span>
                {t.zikir.sourceLabel}:{' '}
                <strong className="text-[var(--color-text-primary)]">
                  <ClickableText text={displaySource} />
                </strong>
              </span>
              {zikir.dalilStatus && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    {t.zikir.statusLabel}:{' '}
                    <strong className="text-primary-600 dark:text-primary-400">
                      <ClickableText text={translateDalilStatus(zikir.dalilStatus, lang)} />
                    </strong>
                  </span>
                </>
              )}
            </p>
            <p className="font-prose text-sm sm:text-[0.95rem] leading-relaxed text-[var(--color-text-primary)] pt-1">
              <ClickableText text={displayDalilText} />
            </p>
          </div>

          {displayTafsir && (
            <div className="pt-3 border-t border-[var(--color-border)]/60 space-y-1.5">
              <p className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                {t.zikir.tafsirHeading}
              </p>
              <p className="font-prose text-sm sm:text-[0.95rem] leading-relaxed text-[var(--color-text-secondary)]">
                <ClickableText text={displayTafsir} />
              </p>
            </div>
          )}
        </div>
      )}

      {/* Arabic Script Container */}
      <div className="neu-inset mt-6 p-5 sm:p-7">
        <p
          lang="ar"
          dir="rtl"
          className={`font-arabic text-right text-[var(--color-text-primary)] select-text ${ARABIC_SIZE_CLASS[arabicSize]}`}
        >
          {zikir.arabicText}
        </p>
      </div>

      {/* Bacaan Latin (Transliteration) */}
      {showLatin && zikir.latinText && (
        <div className="mt-4 px-1">
          <div className="flex items-center gap-1.5">
            <p className="text-xs font-semibold text-primary-600 dark:text-primary-400">
              {t.zikir.latinLabel}
            </p>
            <LatinGuideButton />
          </div>
          <p className="mt-1 text-sm sm:text-base italic leading-relaxed text-[var(--color-text-secondary)] max-w-prose">
            {zikir.latinText}
          </p>
        </div>
      )}

      {/* Translation */}
      <div className="mt-5 max-w-prose">
        <p className="font-prose text-base sm:text-[1.0625rem] leading-relaxed text-[var(--color-text-primary)]">
          <ClickableText text={displayTranslation} />
        </p>
        {displaySource && (
          <p className="mt-3 text-xs font-medium text-[var(--color-text-secondary)]">
            <ClickableText text={displaySource} />
            {zikir.dalilStatus ? (
              <>
                {' · '}
                <ClickableText text={translateDalilStatus(zikir.dalilStatus, lang)} />
              </>
            ) : (
              ''
            )}
          </p>
        )}
      </div>

      {adminActions && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-5 pt-4 border-t border-[var(--color-border)]/60 flex flex-wrap items-center justify-between gap-2"
        >
          {adminActions}
        </div>
      )}

      {/* Ergonomic Bottom-Center Count View (away from bottom-right thumb trigger!) */}
      <div className="mt-6 pt-5 border-t border-[var(--color-border)]/60 flex flex-col items-center justify-center gap-3 text-center">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
            onIncrement();
          }}
          disabled={isCompleted}
          aria-label={
            lang === 'en'
              ? isUnlimited
                ? `Increment ${displayTitle}`
                : `Count ${displayTitle}`
              : isUnlimited
              ? `Tambah hitungan ${displayTitle}`
              : `Hitung ${displayTitle}`
          }
          className={`neu-inset-sm px-6 py-3 min-w-[180px] transition-all cursor-pointer ${
            isCompleted ? 'ring-1 ring-primary-500/50 cursor-default' : 'hover:scale-[1.01]'
          }`}
        >
          <p className="text-[11px] font-medium text-[var(--color-text-secondary)]">
            {isCompleted
              ? t.zikir.completed
              : isUnlimited
              ? t.zikir.unlimited
              : lang === 'en'
              ? 'Current Count'
              : 'Hitungan Bacaan'}
          </p>
          <p
            className={`mt-0.5 font-mono text-2xl font-bold tabular-nums ${
              isCompleted
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-[var(--color-text-primary)]'
            }`}
          >
            {isUnlimited ? `${count}` : `${count} / ${zikir.repeatCount}`}
          </p>
        </button>

        <div className="flex items-center justify-center gap-3">
          {count > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onReset();
              }}
              aria-label={
                lang === 'en' ? `Reset count for ${displayTitle}` : `Reset hitungan ${displayTitle}`
              }
              className="neu-outset-sm inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer min-h-[36px]"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.zikir.reset}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
