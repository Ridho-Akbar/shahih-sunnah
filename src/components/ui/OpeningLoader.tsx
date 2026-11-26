'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { BrandLogo } from './BrandLogo';

interface OpeningLoaderProps {
  ready: boolean;
  onFinished: () => void;
}

export function OpeningLoader({ ready, onFinished }: OpeningLoaderProps) {
  const { lang } = useLanguage();
  const [minDurationElapsed, setMinDurationElapsed] = useState(false);
  const [progress, setProgress] = useState(18);
  const [exiting, setExiting] = useState(false);

  // Durasi minimum tampilan pembuka agar transisi terasa tenang dan tidak berkedip
  useEffect(() => {
    const progressTimer1 = window.setTimeout(() => setProgress(54), 140);
    const progressTimer2 = window.setTimeout(() => setProgress(82), 420);
    const minTimer = window.setTimeout(() => {
      setMinDurationElapsed(true);
    }, 900);

    // Pengaman maksimal jika jaringan lambat
    const safetyTimer = window.setTimeout(() => {
      setMinDurationElapsed(true);
    }, 2200);

    return () => {
      window.clearTimeout(progressTimer1);
      window.clearTimeout(progressTimer2);
      window.clearTimeout(minTimer);
      window.clearTimeout(safetyTimer);
    };
  }, []);

  useEffect(() => {
    if (!ready || !minDurationElapsed) return;
    setProgress(100);

    const exitStartTimer = window.setTimeout(() => {
      setExiting(true);
    }, 180);

    const finishTimer = window.setTimeout(() => {
      onFinished();
    }, 560);

    return () => {
      window.clearTimeout(exitStartTimer);
      window.clearTimeout(finishTimer);
    };
  }, [ready, minDurationElapsed, onFinished]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={!exiting}
      aria-label={lang === 'en' ? 'Opening Shahih Sunnah' : 'Membuka Shahih Sunnah'}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center px-6 bg-[var(--color-surface)] text-[var(--color-text-primary)] transition-opacity duration-350 ease-out ${
        exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ornamen garis sudut halus yang bersih tanpa bayangan */}
      <div
        className={`w-full max-w-md flex flex-col items-center text-center transition-transform duration-350 ease-out ${
          exiting ? 'scale-[0.98]' : 'scale-100'
        }`}
      >
        <p
          dir="rtl"
          className="font-arabic text-2xl sm:text-3xl text-primary-600 dark:text-primary-400 mb-6 tracking-normal"
        >
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>

        <div className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] mb-5">
          <BrandLogo className="w-14 h-14 sm:w-16 sm:h-16" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Shahih Sunnah
        </h1>

        <p className="mt-2 font-prose text-sm sm:text-base text-[var(--color-text-secondary)] max-w-sm leading-relaxed">
          {lang === 'en'
            ? 'Al-Quran & Authentic Hadith · Understanding of Salafush Shalih'
            : 'Al-Quran & Hadis Shahih · Pemahaman Salafush Shalih'}
        </p>

        {/* Progress Bar Pembuka */}
        <div className="w-56 sm:w-64 mt-7 space-y-2">
          <div className="h-1.5 w-full rounded-full overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-raised)]">
            <div
              className="h-full bg-primary-600 dark:bg-primary-500 rounded-full origin-left transition-transform duration-300 ease-out"
              style={{ transform: `scaleX(${progress / 100})` }}
            />
          </div>
          <p className="text-[11px] font-mono tracking-wider uppercase text-[var(--color-text-secondary)]">
            {lang === 'en' ? 'Preparing daily worship guide...' : 'Menyiapkan panduan ibadah harian...'}
          </p>
        </div>
      </div>
    </div>
  );
}
