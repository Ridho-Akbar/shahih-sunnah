'use client';

import { Quote } from 'lucide-react';
import { USTAZ_MOTIVATIONS } from '../../lib/ustazData';
import { useLanguage } from '../../context/LanguageContext';
import { ClickableText } from './ClickableText';

export function UstazMotivationSection() {
  const { lang } = useLanguage();

  return (
    <section id="motivasi-ustadz" aria-labelledby="heading-motivasi" className="scroll-mt-24 space-y-6">
      <div className="pb-6 border-b border-[var(--color-border)]/70">
        <p className="text-xs font-semibold tracking-wide text-primary-600 dark:text-primary-400">
          {lang === 'en'
            ? 'Contemporary Sunnah Teachers · Reminders of Paradise'
            : 'Nasihat Ustadz Kontemporer · Pengingat Akhirat'}
        </p>
        <h2
          id="heading-motivasi"
          className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text-primary)]"
        >
          {lang === 'en'
            ? 'Motivations for Steadfast Dhikr & Worship'
            : 'Motivasi Istiqamah Zikir & Meraih Derajat Surga'}
        </h2>
        <p className="mt-1.5 text-sm sm:text-base text-[var(--color-text-secondary)] max-w-prose">
          {lang === 'en'
            ? 'Heartfelt reminders from respected contemporary Ahlus Sunnah teachers grounded in authentic narrations.'
            : 'Untaian nasihat menyejukkan dari para ustadz pembimbing kajian sunnah kontemporer yang selaras dengan dalil Al-Quran dan hadis shahih.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {USTAZ_MOTIVATIONS.map((item) => (
          <article key={item.id} className="neu-outset p-6 sm:p-7 flex flex-col justify-between gap-5">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
                    {item.ustazName}
                  </h3>
                  <p className="text-xs font-medium text-primary-600 dark:text-primary-400 mt-0.5">
                    {lang === 'en' ? item.roleEn : item.roleId}
                  </p>
                </div>
                <Quote
                  className="w-5 h-5 text-accent-600 dark:text-accent-400 shrink-0 opacity-75"
                  aria-hidden="true"
                />
              </div>

              <p className="font-prose text-sm sm:text-base leading-relaxed text-[var(--color-text-primary)]">
                <ClickableText text={lang === 'en' ? item.quoteEn : item.quoteId} />
              </p>
            </div>

            <div className="neu-inset-sm px-4 py-3 text-xs leading-relaxed text-[var(--color-text-secondary)]">
              <ClickableText text={lang === 'en' ? item.dalilNoteEn : item.dalilNoteId} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
