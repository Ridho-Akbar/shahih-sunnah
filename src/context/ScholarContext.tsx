'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { BookOpen, GitBranch, ShieldCheck, UserCheck, Users, X } from 'lucide-react';
import type { ScholarFigure } from '../lib/validations/content';
import { SCHOLAR_ENGLISH_BY_NAME } from '../lib/scholarTranslations';
import { useLanguage } from './LanguageContext';

interface ScholarContextValue {
  figures: ScholarFigure[];
  activeFigure: ScholarFigure | null;
  openFigure: (figure: ScholarFigure) => void;
  closeFigure: () => void;
}

const ScholarContext = createContext<ScholarContextValue | undefined>(undefined);

interface ScholarProviderProps {
  figures: ScholarFigure[];
  children: ReactNode;
}

export function ScholarProvider({ figures, children }: ScholarProviderProps) {
  const { lang } = useLanguage();
  const [activeFigure, setActiveFigure] = useState<ScholarFigure | null>(null);

  const openFigure = (figure: ScholarFigure) => setActiveFigure(figure);
  const closeFigure = () => setActiveFigure(null);

  useEffect(() => {
    if (!activeFigure) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveFigure(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeFigure]);

  const enFallback = activeFigure ? SCHOLAR_ENGLISH_BY_NAME[activeFigure.name] : undefined;
  const resolveField = (
    idValue: string | undefined,
    enCustom: string | undefined,
    enPreset: string | undefined
  ) => {
    if (lang !== 'en') return idValue || '';
    return enCustom?.trim() || enPreset || idValue || '';
  };

  const displayRole = activeFigure
    ? resolveField(activeFigure.role, activeFigure.roleEn, enFallback?.roleEn)
    : '';
  const displayTabaqah = activeFigure
    ? resolveField(activeFigure.tabaqah, activeFigure.tabaqahEn, enFallback?.tabaqahEn)
    : '';
  const displayBirthDeath = activeFigure
    ? resolveField(activeFigure.birthDeath, activeFigure.birthDeathEn, enFallback?.birthDeathEn)
    : '';
  const displayNasab = activeFigure
    ? resolveField(activeFigure.nasab, activeFigure.nasabEn, enFallback?.nasabEn)
    : '';
  const displayJarh = activeFigure
    ? resolveField(activeFigure.jarhWaTadil, activeFigure.jarhWaTadilEn, enFallback?.jarhWaTadilEn)
    : '';
  const displaySanad = activeFigure
    ? resolveField(
        activeFigure.teachersAndStudents,
        activeFigure.teachersAndStudentsEn,
        enFallback?.teachersAndStudentsEn
      )
    : '';
  const displayWorks = activeFigure
    ? resolveField(activeFigure.majorWorks, activeFigure.majorWorksEn, enFallback?.majorWorksEn)
    : '';
  const displayBio = activeFigure
    ? resolveField(activeFigure.biography, activeFigure.biographyEn, enFallback?.biographyEn)
    : '';

  return (
    <ScholarContext.Provider value={{ figures, activeFigure, openFigure, closeFigure }}>
      {children}

      {activeFigure && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="scholar-modal-title"
          onClick={closeFigure}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="shadow-none rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] w-full max-w-2xl p-6 sm:p-8 my-6 space-y-5 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--color-border)]/60">
              <div className="space-y-1.5 min-w-0">
                <p className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                  {displayRole}
                </p>
                <h2
                  id="scholar-modal-title"
                  className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]"
                >
                  {activeFigure.name}
                </h2>
                <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                  {activeFigure.fullName}
                </p>
                {(displayTabaqah || displayBirthDeath) && (
                  <p className="text-xs text-[var(--color-text-secondary)] flex flex-wrap items-center gap-2 pt-1">
                    {displayTabaqah && <span>{displayTabaqah}</span>}
                    {displayTabaqah && displayBirthDeath && <span aria-hidden="true">·</span>}
                    {displayBirthDeath && <span>{displayBirthDeath}</span>}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={closeFigure}
                aria-label={lang === 'en' ? 'Close profile modal' : 'Tutup profil tokoh'}
                className="neu-outset-sm p-2.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Jalur Nasab */}
            {displayNasab && (
              <div className="neu-inset-sm p-4 sm:p-5 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-accent-600 dark:text-accent-400">
                  <GitBranch className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{lang === 'en' ? 'Lineage (Jalur Nasab)' : 'Jalur Nasab & Silsilah'}</span>
                </div>
                <p className="font-prose text-sm sm:text-[0.95rem] leading-relaxed text-[var(--color-text-primary)]">
                  {displayNasab}
                </p>
              </div>
            )}

            {/* Jarh wa Ta'dil & Status Ilmu Hadis */}
            {displayJarh && (
              <div className="neu-inset-sm p-4 sm:p-5 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary-600 dark:text-primary-400">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>
                    {lang === 'en'
                      ? 'Hadith Reliability (Jarh wa Ta’dil)'
                      : 'Status & Penilaian Ilmu Hadis (Jarh wa Ta’dil)'}
                  </span>
                </div>
                <p className="font-prose text-sm sm:text-[0.95rem] leading-relaxed text-[var(--color-text-primary)]">
                  {displayJarh}
                </p>
              </div>
            )}

            {/* Teachers & Students */}
            {displaySanad && (
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-primary)]">
                  <Users className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400 shrink-0" aria-hidden="true" />
                  <span>
                    {lang === 'en'
                      ? 'Teachers, Students & Chain of Knowledge'
                      : 'Guru, Murid & Jalur Sanad Keilmuan'}
                  </span>
                </div>
                <p className="font-prose text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {displaySanad}
                </p>
              </div>
            )}

            {/* Major Works */}
            {displayWorks && (
              <div className="space-y-1.5 pt-2 border-t border-[var(--color-border)]/50">
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-primary)]">
                  <BookOpen className="w-3.5 h-3.5 text-accent-600 dark:text-accent-400 shrink-0" aria-hidden="true" />
                  <span>
                    {lang === 'en'
                      ? 'Narrations & Major Works'
                      : 'Kontribusi Periwayatan & Karya Utama'}
                  </span>
                </div>
                <p className="font-prose text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {displayWorks}
                </p>
              </div>
            )}

            {/* Biography */}
            <div className="space-y-1.5 pt-2 border-t border-[var(--color-border)]/50">
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text-primary)]">
                <UserCheck className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400 shrink-0" aria-hidden="true" />
                <span>{lang === 'en' ? 'Biography' : 'Biografi & Keterangan Singkat'}</span>
              </div>
              <p className="font-prose text-sm sm:text-[0.95rem] leading-relaxed text-[var(--color-text-primary)]">
                {displayBio}
              </p>
            </div>

            <div className="pt-3 border-t border-[var(--color-border)]/60 flex justify-end">
              <button
                type="button"
                onClick={closeFigure}
                className="neu-outset-sm px-5 py-2 text-sm font-semibold text-[var(--color-text-primary)] cursor-pointer min-h-[40px]"
              >
                {lang === 'en' ? 'Close' : 'Tutup'}
              </button>
            </div>
          </div>
        </div>
      )}
    </ScholarContext.Provider>
  );
}

export function useScholar(): ScholarContextValue {
  const ctx = useContext(ScholarContext);
  if (!ctx) {
    throw new Error('useScholar must be used within ScholarProvider');
  }
  return ctx;
}
