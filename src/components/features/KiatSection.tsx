'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Info, ShieldCheck } from 'lucide-react';
import { KIAT_CATEGORIES, type KiatCategoryId } from '../../lib/kiatData';
import { translateDalilSource, translateDalilStatus } from '../../lib/i18n';
import { useLanguage } from '../../context/LanguageContext';
import { ClickableText } from './ClickableText';
import { LatinGuideButton } from './LatinGuideButton';

export function KiatSection() {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<KiatCategoryId>('firdaus');
  const [openDalilIds, setOpenDalilIds] = useState<Record<string, boolean>>({});

  const selectedCategory =
    KIAT_CATEGORIES.find((cat) => cat.id === activeCategory) ?? KIAT_CATEGORIES[0];

  const toggleDalil = (id: string) => {
    setOpenDalilIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="kiat" aria-labelledby="heading-kiat" className="scroll-mt-24 space-y-7">
      <div className="pb-6 border-b border-[var(--color-border)]/70">
        <p className="text-xs font-semibold tracking-wide text-primary-600 dark:text-primary-400">
          {lang === 'en'
            ? 'Essential Hereafter Blueprint · Quran & Authentic Hadith'
            : 'Bekal Utama Akhirat · Al-Quran & Hadis Shahih'}
        </p>
        <h2
          id="heading-kiat"
          className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text-primary)]"
        >
          {lang === 'en'
            ? 'Keys to Paradise & Eternal Salvation'
            : 'Kiat-Kiat Meraih Surga & Keselamatan Akhirat'}
        </h2>
        <p className="mt-1.5 text-sm sm:text-base text-[var(--color-text-secondary)] max-w-prose">
          {lang === 'en'
            ? 'Verified prophetic paths toward Al-Firdaus, protection from Hellfire and grave punishment, entering Paradise without reckoning, and a righteous ending.'
            : 'Panduan amalan penting berlandaskan dalil shahih untuk menggapai Surga Firdaus, selamat dari api neraka dan siksa kubur, masuk surga tanpa hisab, serta husnul khatimah.'}
        </p>
      </div>

      {/* Category Switcher */}
      <div
        role="tablist"
        aria-label={lang === 'en' ? 'Salvation categories' : 'Kategori kiat-kiat akhirat'}
        className="neu-inset-sm p-1.5 flex flex-wrap gap-1.5"
      >
        {KIAT_CATEGORIES.map((category) => {
          const isSelected = category.id === selectedCategory.id;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveCategory(category.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer min-h-[42px] ${
                isSelected
                  ? 'neu-outset-sm text-primary-600 dark:text-primary-400'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{lang === 'en' ? category.labelEn : category.labelId}</span>
            </button>
          );
        })}
      </div>

      {/* Subtitle */}
      <div className="neu-inset-sm px-4 py-3 text-xs sm:text-sm text-[var(--color-text-secondary)]">
        {lang === 'en' ? selectedCategory.subtitleEn : selectedCategory.subtitleId}
      </div>

      {/* Practice Cards */}
      <div className="grid grid-cols-1 gap-6">
        {selectedCategory.practices.map((item, idx) => {
          const isOpen = Boolean(openDalilIds[item.id]);
          return (
            <article key={item.id} className="neu-outset p-6 sm:p-7 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[var(--color-border)]/60">
                <div className="min-w-0 flex-1 space-y-1.5">
                  <p className="text-xs font-medium text-[var(--color-text-secondary)] flex flex-wrap items-center gap-2">
                    <span className="font-mono tabular-nums font-semibold text-primary-600 dark:text-primary-400">
                      #{idx + 1}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      <ClickableText text={translateDalilSource(item.dalilSource, lang)} />
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-accent-600 dark:text-accent-400">
                      {translateDalilStatus(item.dalilStatus, lang)}
                    </span>
                  </p>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)] leading-snug">
                    {lang === 'en' ? item.titleEn : item.titleId}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => toggleDalil(item.id)}
                  aria-expanded={isOpen}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] ${
                    isOpen
                      ? 'neu-inset-sm text-accent-600 dark:text-accent-400 font-semibold'
                      : 'neu-outset-sm text-[var(--color-text-primary)] hover:text-accent-600 dark:hover:text-accent-400'
                  }`}
                >
                  <Info className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{lang === 'en' ? 'Evidence & Tafsir' : 'Dalil & Tafsir'}</span>
                  {isOpen ? (
                    <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                </button>
              </div>

              <p className="font-prose text-sm sm:text-base leading-relaxed text-[var(--color-text-primary)] max-w-prose">
                <ClickableText text={lang === 'en' ? item.summaryEn : item.summaryId} />
              </p>

              {item.arabicText && (
                <div className="neu-inset p-4 sm:p-5 space-y-2">
                  <p
                    lang="ar"
                    dir="rtl"
                    className="font-arabic text-right text-xl sm:text-2xl leading-[2.15] text-[var(--color-text-primary)]"
                  >
                    {item.arabicText}
                  </p>
                  {item.latinText && (
                    <div className="pt-1 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                          {lang === 'en' ? 'Latin Transliteration' : 'Bacaan Latin'}
                        </p>
                        <LatinGuideButton />
                      </div>
                      <p className="text-xs sm:text-sm italic text-[var(--color-text-secondary)]">
                        {item.latinText}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {isOpen && (
                <div className="neu-inset-sm p-4 sm:p-5 space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-accent-600 dark:text-accent-400">
                      {lang === 'en' ? 'Primary Evidence Text' : 'Matan / Bunyi Dalil Asal'}
                    </p>
                    <p className="font-prose text-sm leading-relaxed text-[var(--color-text-primary)]">
                      <ClickableText text={lang === 'en' ? item.dalilTextEn : item.dalilTextId} />
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[var(--color-border)]/60 space-y-1">
                    <p className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                      {lang === 'en' ? 'Scholarly Explanation' : 'Tafsir & Faedah Ulama'}
                    </p>
                    <p className="font-prose text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      <ClickableText text={lang === 'en' ? item.tafsirEn : item.tafsirId} />
                    </p>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
