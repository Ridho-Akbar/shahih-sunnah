'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BookOpenText, Info, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface LatinRuleItem {
  symbol: string;
  titleId: string;
  titleEn: string;
  descId: string;
  descEn: string;
  exampleId: string;
  exampleEn: string;
}

const LATIN_RULES: LatinRuleItem[] = [
  {
    symbol: 'ā · ī · ū',
    titleId: 'Garis di Atas Huruf Vokal (Makron / Tanda Mad)',
    titleEn: 'Line Above Vowels (Macron / Elongation)',
    descId:
      'Garis datar di atas a, i, atau u menunjukkan bacaan panjang (mad thabi‘i / 2 harakat). Huruf tanpa garis dibaca pendek 1 harakat.',
    descEn:
      'A horizontal bar over a, i, or u marks a long vowel held for 2 counts (mad). Plain vowels without a bar are read short.',
    exampleId: 'mā ba‘dah (dibaca panjang: maa ba‘-dah) · qayyūm (qay-yuum) · al-‘aẓīm (al-‘a-zhiim)',
    exampleEn: 'mā ba‘dah (long vowel: maa ba‘-dah) · qayyūm (qay-yuum) · al-‘aẓīm (al-‘a-zheem)',
  },
  {
    symbol: '‘',
    titleId: 'Koma Terbalik — Huruf ‘Ain (ع)',
    titleEn: 'Opening Quote — Arabic Letter ‘Ain (ع)',
    descId:
      'Menandakan huruf ‘Ain yang keluar dari tengah tenggorokan dengan suara bulat dan jernih, bukan huruf A biasa dan bukan terhenti mendadak.',
    descEn:
      'Represents the voiced pharyngeal consonant ‘Ain (ع) articulated from the middle of the throat.',
    exampleId: 'mā ba‘dah · al-‘āfiyah · a‘ūżu',
    exampleEn: 'mā ba‘dah · al-‘āfiyah · a‘ūżu',
  },
  {
    symbol: '’  atau  \'',
    titleId: 'Apostrof Tutup — Huruf Hamzah (ء)',
    titleEn: 'Closing Apostrophe — Glottal Stop Hamzah (ء)',
    descId:
      'Menandakan hentian suara singkat atau huruf Hamzah sukun (ء) yang ditekan sejenak sebelum melanjutkan suku kata berikutnya.',
    descEn:
      'Indicates a crisp glottal stop (Hamzah) with a brief pause before continuing to the next syllable.',
    exampleId: 'ta’khużuhū · syai’in · al-mu’minūn · du‘ā’',
    exampleEn: 'ta’khużuhū · syai’in · al-mu’minūn · du‘ā’',
  },
  {
    symbol: 'ḥ · ṣ · ḍ · ṭ · ẓ',
    titleId: 'Huruf Bertitik Bawah (Makhraj Khusus & Tebal)',
    titleEn: 'Dotted Letters (Pharyngeal & Emphatic Sounds)',
    descId:
      'Titik di bawah membedakan makhraj: ḥ adalah Ha bersih dari tengah tenggorokan (ح), sedangkan ṣ (ص), ḍ (ض), ṭ (ط), dan ẓ (ظ) dibaca tebal (tafkhim) dengan pangkal lidah terangkat.',
    descEn:
      'ḥ represents the crisp throat H (ح); while ṣ (ص), ḍ (ض), ṭ (ط), and ẓ (ظ) are heavy, emphatic letters.',
    exampleId: 'al-ḥamdu (ح) · ṣallallāhu (ص) · al-arḍ (ض) · syaiṭān (ط) · al-‘aẓīm (ظ)',
    exampleEn: 'al-ḥamdu (ح) · ṣallallāhu (ص) · al-arḍ (ض) · syaiṭān (ط) · al-‘aẓīm (ظ)',
  },
  {
    symbol: 'ṡ · ż · kh · sy · gh',
    titleId: 'Gabungan Dua Huruf & Titik Atas',
    titleEn: 'Over-Dotted Letters & Digraphs',
    descId:
      'ṡ = Tsa (ث, ujung lidah di gigi atas); ż = Dzal (ذ, ujung lidah lembut); kh = Kha (خ); sy = Syin (ش); gh = Ghain (غ).',
    descEn:
      'ṡ = th as in "think" (ث); ż = voiced th as in "this" (ذ); kh = خ; sy = sh (ش); gh = غ.',
    exampleId: 'kaṡīran (ث) · żālika (ذ) · khair (خ) · syarri (ش) · ghafūr (غ)',
    exampleEn: 'kaṡīran (ث) · żālika (ذ) · khair (خ) · syarri (ش) · ghafūr (غ)',
  },
  {
    symbol: '-  &  ll / nn / mm',
    titleId: 'Tanda Hubung (Alif Lam) & Huruf Ganda (Tasydid)',
    titleEn: 'Hyphens (Assimilation) & Doubled Consonants (Shaddah)',
    descId:
      'Tanda hubung menunjukkan peleburan Alif Lam Syamsiyah (misal asy-syaiṭān tidak dibaca al-syaiṭān). Huruf ganda dibaca dengan penekanan (tasydid), dan khusus nn/mm didengungkan (ghunnah) sekitar 2 harakat.',
    descEn:
      'Hyphens show Alif-Lam assimilation (sun letters), while doubled letters mark a stressed shaddah (and nasal hum on nn/mm).',
    exampleId: 'asy-syaiṭān · inna (dengung) · allāhumma (tekan + dengung)',
    exampleEn: 'asy-syaiṭān · inna (nasal hum) · allāhumma (stressed + nasal hum)',
  },
];

interface LatinGuideButtonProps {
  className?: string;
}

export function LatinGuideButton({ className = '' }: LatinGuideButtonProps) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const title =
    lang === 'en'
      ? 'Guide to Reading Latin Transliteration & Diacritics'
      : 'Panduan Cara Baca Transliterasi Latin & Harakat';

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        aria-label={
          lang === 'en'
            ? 'Open Latin transliteration reading guide'
            : 'Buka panduan cara baca huruf dan tanda baca Latin'
        }
        title={
          lang === 'en'
            ? 'How to read diacritics (ā, ī, ū, ‘, ḥ, etc.)'
            : 'Cara baca tanda baca & harakat Latin (mis. mā ba‘dah)'
        }
        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[var(--color-text-secondary)] hover:text-primary-600 dark:hover:text-primary-400 hover:bg-[var(--color-border)]/30 transition-colors cursor-pointer ${className}`}
      >
        <Info className="w-3.5 h-3.5" aria-hidden="true" />
      </button>

      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="latin-guide-modal-title"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs overflow-y-auto"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 my-6 space-y-5 max-h-[90vh] overflow-y-auto shadow-none"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--color-border)]/70">
                <div className="space-y-1 min-w-0">
                  <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400">
                    <BookOpenText className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>
                      {lang === 'en'
                        ? 'Arabic-to-Latin Phonetic Key'
                        : 'Kaidah Makhraj & Tanda Baca Latin'}
                    </span>
                  </p>
                  <h2
                    id="latin-guide-modal-title"
                    className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text-primary)]"
                  >
                    {title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                    {lang === 'en'
                      ? 'Understanding macrons (like mā ba‘dah), throat consonants, and Arabic-Latin diacritics ensures accurate recitation while learning.'
                      : 'Memahami arti garis di atas huruf (seperti pada “mā ba‘dah”), apostrof, dan tanda titik membantu bacaan mendekati makhraj Arab yang benar.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={lang === 'en' ? 'Close guide modal' : 'Tutup panduan bacaan'}
                  className="neu-outset-sm p-2.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] shrink-0 cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              {/* Rules List */}
              <div className="space-y-3.5">
                {LATIN_RULES.map((rule) => (
                  <div
                    key={rule.symbol}
                    className="neu-inset-sm p-4 space-y-1.5"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
                        {lang === 'en' ? rule.titleEn : rule.titleId}
                      </h3>
                      <span className="font-mono text-sm font-bold text-primary-600 dark:text-primary-400">
                        {rule.symbol}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {lang === 'en' ? rule.descEn : rule.descId}
                    </p>
                    <p className="text-xs font-medium text-accent-600 dark:text-accent-400 pt-0.5">
                      {lang === 'en' ? 'Example: ' : 'Contoh: '}
                      <span className="italic">{lang === 'en' ? rule.exampleEn : rule.exampleId}</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* Note & Footer */}
              <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
                {lang === 'en'
                  ? 'Note: Latin transliteration is a helpful learning aid; listening to authentic Quran/hadith recitation remains essential to master exact makhraj.'
                  : 'Catatan: Transliterasi Latin adalah alat bantu belajar; tetap dianjurkan menyimak pelafalan Arab secara langsung dari guru atau qari untuk ketepatan tajwid dan makhraj.'}
              </p>

              <div className="pt-2 border-t border-[var(--color-border)]/60 flex justify-end">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="neu-outset-sm px-5 py-2 text-sm font-semibold text-[var(--color-text-primary)] cursor-pointer min-h-[40px]"
                >
                  {lang === 'en' ? 'Got It' : 'Tutup'}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
