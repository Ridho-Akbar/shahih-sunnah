'use client';

import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookOpenCheck,
  ChevronLeft,
  ChevronRight,
  Compass,
  Infinity as InfinityIcon,
  MoonStar,
  PlayCircle,
  ShieldCheck,
  Sun,
} from 'lucide-react';
import type { BlogPost, Category, Hadith, TimeOfDay, Zikir } from '../lib/validations/content';
import type { AppRoute } from '../components/layout/Navbar';
import { ResilientImage } from '../components/ui/ResilientImage';
import { ClickableText } from '../components/features/ClickableText';
import { SafeBlogContent } from '../components/features/SafeBlogContent';
import { HadisCard } from '../components/features/HadisCard';
import { LivePrayerWidget } from '../components/features/LivePrayerWidget';
import { QiblaCompassSection } from '../components/features/QiblaCompassSection';
import { UstazMotivationSection } from '../components/features/UstazMotivationSection';
import { KiatSection } from '../components/features/KiatSection';
import { LeaderboardSection } from '../components/features/LeaderboardSection';
import { useLanguage } from '../context/LanguageContext';
import { translateCategoryName } from '../lib/i18n';

interface HomePageProps {
  zikrs: Zikir[];
  hadiths: Hadith[];
  blogs: BlogPost[];
  categories: Category[];
  bookmarks: number[];
  onToggleBookmark: (id: number) => void;
  onNavigate: (path: AppRoute, zikirTime?: TimeOfDay) => void;
}

interface ParadiseSlide {
  image: string;
  altId: string;
  altEn: string;
  hadithId: string;
  hadithEn: string;
  sourceId: string;
  sourceEn: string;
}

const PARADISE_SLIDES: ParadiseSlide[] = [
  {
    image: '/images/paradise_tree_shade_1795406141459.jpg',
    altId: 'Sudut pandang di bawah naungan pohon besar di surga di tepi sungai yang jernih',
    altEn: 'First-person view beneath an immense sunlit tree of Paradise beside a crystal river',
    hadithId:
      '“Sesungguhnya di surga ada sebuah pohon, seorang pengendara berjalan di bawah naungannya selama seratus tahun dan tidak dapat menyelesaikannya.”',
    hadithEn:
      '“Indeed in Paradise there is a tree; a rider travels beneath its shade for a hundred years and cannot cross it.”',
    sourceId: 'HR. Al-Bukhari (no. 3252) & Imam Muslim (no. 2826) dari Abu Hurairah · Shahih',
    sourceEn: 'Narrated by Al-Bukhari (no. 3252) & Imam Muslim (no. 2826) from Abu Hurairah · Shahih',
  },
  {
    image: '/images/paradise_morning_garden_1795408360255.jpg',
    altId: 'Suasana pagi yang tenang di taman surga di tepi sungai sebening kristal',
    altEn: 'Serene morning garden of Paradise beside flowing crystal rivers',
    hadithId:
      '“Penghuni surga diilhamkan untuk selalu bertasbih dan bertahmid sebagaimana kalian diilhamkan bernapas; dan golongan pertama bertasbih kepada Allah waktu pagi dan petang.”',
    hadithEn:
      '“The inhabitants of Paradise are inspired to glorify and praise Allah just as you are inspired to breathe; and the foremost among them glorify Allah morning and evening.”',
    sourceId: 'HR. Imam Muslim (no. 2835) dari Jabir bin Abdullah · Shahih',
    sourceEn: 'Narrated by Imam Muslim (no. 2835) from Jabir bin Abdullah · Shahih',
  },
  {
    image: '/images/paradise_evening_rivers_1795408364341.jpg',
    altId: 'Suasana petang keemasan dan istana mutiara di tepian sungai surga',
    altEn: 'Tranquil golden evening light across rivers and pearl pavilions of Paradise',
    hadithId:
      '“Allah ‘Azza wa Jalla berfirman: Aku telah menyiapkan bagi hamba-hamba-Ku yang shalih sesuatu yang belum pernah dilihat mata, belum pernah didengar telinga, dan belum pernah terbetik dalam hati manusia.”',
    hadithEn:
      '“Allah the Almighty said: I have prepared for My righteous servants what no eye has seen, no ear has heard, and what has never crossed any human heart.”',
    sourceId: 'HR. Al-Bukhari (no. 3244) & Imam Muslim (no. 2824) dari Abu Hurairah · Shahih',
    sourceEn: 'Narrated by Al-Bukhari (no. 3244) & Imam Muslim (no. 2824) from Abu Hurairah · Shahih',
  },
  {
    image: '/images/paradise_kautsar_fountain_1795408364277.jpg',
    altId: 'Paviliun putih di tepi sungai dan telaga jernih Al-Kautsar di surga',
    altEn: 'Radiant riverside pavilion beside the clear waters of Al-Kautsar in Paradise',
    hadithId:
      '“Telagaku (Al-Kautsar) seluas perjalanan sebulan; airnya lebih putih daripada susu, aromanya lebih harum daripada minyak kesturi, dan bejananya bagaikan bintang-bintang di langit.”',
    hadithEn:
      '“My Pond (Al-Kawthar) is a month’s journey in size; its water is whiter than milk, its scent sweeter than musk, and its drinking vessels as numerous as the stars.”',
    sourceId: 'HR. Al-Bukhari (no. 6579) & Imam Muslim (no. 2292) dari Abdullah bin Amr · Shahih',
    sourceEn: 'Narrated by Al-Bukhari (no. 6579) & Imam Muslim (no. 2292) from Abdullah ibn Amr · Shahih',
  },
];

const SLIDE_DURATION_MS = 6500;

const DAKWAH_CHANNELS = [
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/results?search_query=kajian+sunnah+shahih',
    colorClass: 'text-red-600 dark:text-red-400',
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/search?q=kajian+sunnah',
    colorClass: 'text-[var(--color-text-primary)]',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/explore/tags/kajiansunnah/',
    colorClass: 'text-pink-600 dark:text-pink-400',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/search/top?q=kajian%20sunnah',
    colorClass: 'text-blue-600 dark:text-blue-400',
  },
];

export function HomePage({
  zikrs,
  hadiths,
  blogs,
  categories,
  bookmarks,
  onToggleBookmark,
  onNavigate,
}: HomePageProps) {
  const { lang, t, pick } = useLanguage();

  const [slideIndex, setSlideIndex] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const tickMs = 50;
    const step = (tickMs / SLIDE_DURATION_MS) * 100;
    const timer = window.setInterval(() => {
      setSlideProgress((prev) => {
        if (prev + step >= 100) {
          setSlideIndex((idx) => (idx + 1) % PARADISE_SLIDES.length);
          return 0;
        }
        return prev + step;
      });
    }, tickMs);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const handleSelectSlide = (nextIdx: number) => {
    setSlideIndex((nextIdx + PARADISE_SLIDES.length) % PARADISE_SLIDES.length);
    setSlideProgress(0);
  };

  const activeSlide = PARADISE_SLIDES[slideIndex];

  const pagiCount = zikrs.filter((z) => z.timeOfDay === 'pagi').length;
  const petangCount = zikrs.filter((z) => z.timeOfDay === 'petang').length;
  const setelahSholatCount = zikrs.filter((z) => z.timeOfDay === 'setelah-sholat').length;
  const umumCount = zikrs.filter((z) => z.timeOfDay === 'umum').length;
  const khususCount = zikrs.filter((z) => z.timeOfDay === 'khusus').length;

  const featuredHadiths = hadiths.slice(0, 2);
  const featuredBlogs = blogs.slice(0, 2);

  const categoryById = new Map(categories.map((c) => [c.id, c]));

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* Section 1: Hero Split + Paradise Slideshow */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        <div className="lg:col-span-6 flex flex-col justify-center py-2">
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-primary-600 dark:text-primary-400">
            {t.hero.kicker}
          </p>
          <h1
            className="mt-3 font-bold tracking-tight text-[var(--color-text-primary)] leading-[1.14]"
            style={{ fontSize: 'clamp(2.15rem, 3.85vw, 3.15rem)', textWrap: 'balance' }}
          >
            {t.hero.headline}
          </h1>
          <p className="mt-5 font-prose text-base sm:text-lg leading-relaxed text-[var(--color-text-secondary)] max-w-prose">
            {t.hero.subheadline}
          </p>

          {/* Primary CTAs: Zikir Pagi, Zikir Petang, and Tata Cara Sholat & Sunnah */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/zikir', 'pagi')}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl bg-primary-600 hover:bg-primary-700 text-white shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
            >
              <Sun className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{t.hero.primaryCta}</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/zikir', 'petang')}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl bg-accent-600 hover:bg-accent-700 text-white shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
            >
              <MoonStar className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{t.hero.eveningCta}</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/sunnah')}
              className="neu-outset-sm inline-flex items-center gap-2 px-4.5 py-3 text-sm font-medium text-[var(--color-text-primary)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
            >
              <BookOpenCheck className="w-4 h-4 text-primary-600 dark:text-primary-400 shrink-0" aria-hidden="true" />
              <span>{t.hero.secondaryCta}</span>
            </button>
          </div>

          {/* Dakwah Video Channels Strip */}
          <div className="mt-6 pt-5 border-t border-[var(--color-border)]/60 space-y-2.5">
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-secondary)]">
              <PlayCircle className="w-4 h-4 text-primary-600 dark:text-primary-400 shrink-0" aria-hidden="true" />
              <span>
                {lang === 'en'
                  ? 'Watch Sunnah Video Dakwah:'
                  : 'Simak Dakwah Versi Video:'}
              </span>
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              {DAKWAH_CHANNELS.map((channel) => (
                <a
                  key={channel.name}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neu-outset-sm inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[var(--color-text-primary)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors whitespace-nowrap shrink-0 min-h-[38px]"
                >
                  <PlayCircle className={`w-3.5 h-3.5 shrink-0 ${channel.colorClass}`} aria-hidden="true" />
                  <span>{channel.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Hero Card: Explicitly ZERO box-shadow, Interactive Slideshow + Loading Bar + Hadith */}
        <div
          className="lg:col-span-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="shadow-none rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 sm:p-4 h-full flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <div className="relative overflow-hidden rounded-xl h-72 sm:h-96 min-h-[300px]">
                <ResilientImage
                  src={activeSlide.image}
                  alt={lang === 'en' ? activeSlide.altEn : activeSlide.altId}
                  fallbackLabel={lang === 'en' ? 'Paradise' : 'Surga'}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />

                {/* Left / Right Slide Controls */}
                <button
                  type="button"
                  onClick={() => handleSelectSlide(slideIndex - 1)}
                  aria-label={lang === 'en' ? 'Previous slide' : 'Gambar sebelumnya'}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/45 hover:bg-black/65 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectSlide(slideIndex + 1)}
                  aria-label={lang === 'en' ? 'Next slide' : 'Gambar berikutnya'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/45 hover:bg-black/65 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Loading Bar toward Next Image + Bottom Slide Indicators */}
              <div className="space-y-2 px-1">
                <div
                  role="progressbar"
                  aria-valuenow={Math.round(slideProgress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={lang === 'en' ? 'Next slide timer' : 'Progres menuju gambar berikutnya'}
                  className="h-1.5 w-full rounded-full bg-[var(--color-border)]/50 overflow-hidden"
                >
                  <div
                    className="h-full bg-primary-600 transition-[width] duration-75"
                    style={{ width: `${slideProgress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div
                    className="flex items-center gap-1.5"
                    role="tablist"
                    aria-label={lang === 'en' ? 'Paradise slide indicators' : 'Indikator slide surga'}
                  >
                    {PARADISE_SLIDES.map((s, idx) => {
                      const active = idx === slideIndex;
                      return (
                        <button
                          key={s.image}
                          type="button"
                          role="tab"
                          aria-selected={active}
                          aria-label={`Slide ${idx + 1}`}
                          onClick={() => handleSelectSlide(idx)}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            active
                              ? 'w-7 bg-primary-600'
                              : 'w-2 bg-[var(--color-border)] hover:bg-[var(--color-text-secondary)]/60'
                          }`}
                        />
                      );
                    })}
                  </div>
                  <span className="text-[11px] font-mono tabular-nums text-[var(--color-text-secondary)]">
                    {slideIndex + 1} / {PARADISE_SLIDES.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--color-border)]/70 bg-[var(--color-surface-raised)]/60 p-4 sm:p-5 space-y-2">
              <p className="font-prose text-sm sm:text-[0.95rem] leading-relaxed text-[var(--color-text-primary)]">
                <ClickableText text={lang === 'en' ? activeSlide.hadithEn : activeSlide.hadithId} />
              </p>
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">
                <ClickableText text={lang === 'en' ? activeSlide.sourceEn : activeSlide.sourceId} />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Contemporary Ustaz Motivation Directly Below Slideshow & Hadith */}
      <UstazMotivationSection />

      {/* Section 3: Grouped Practical Worship Utilities — Jadwal Sholat + Kompas (Ka'bah, Makkah, Madinah) */}
      <div className="space-y-8">
        <LivePrayerWidget />
        <QiblaCompassSection />
      </div>

      {/* Section 4: Zikir Pagi, Petang (Paradise Morning & Evening Imagery + Hadiths), Setelah Sholat, Umum & Khusus */}
      <section aria-labelledby="section-zikir-harian">
        <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-[var(--color-border)]/70">
          <div>
            <h2
              id="section-zikir-harian"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text-primary)]"
            >
              {lang === 'en' ? 'Authentic Dhikr & Supplications' : 'Kumpulan Zikir & Doa Sunnah'}
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-[var(--color-text-secondary)]">
              {lang === 'en'
                ? 'Morning, evening, after-prayer, general unlimited dhikr, and special-occasion prayers with Latin transliteration.'
                : 'Lengkapi penjagaan harian dengan zikir terikat waktu, setelah sholat, bacaan Latin, hingga zikir mutlak tanpa batasan.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/zikir', 'pagi')}
            className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline whitespace-nowrap shrink-0 cursor-pointer"
          >
            {lang === 'en' ? 'Open Dhikr Page →' : 'Buka Halaman Zikir →'}
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <article className="neu-outset p-5 sm:p-6 flex flex-col justify-between gap-6">
            <div>
              <div className="overflow-hidden rounded-xl aspect-[4/3]">
                <ResilientImage
                  src="/images/paradise_morning_garden_1795408360255.jpg"
                  alt={
                    lang === 'en'
                      ? 'Luminous morning garden in Paradise beside crystal-clear rivers'
                      : 'Suasana pagi yang cerah dan tenang di taman surga di tepi sungai jernih'
                  }
                  fallbackLabel={lang === 'en' ? 'Paradise Morning' : 'Pagi Surga'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-5 flex items-center gap-2 text-xs font-medium text-[var(--color-text-secondary)]">
                <Sun className="w-4 h-4 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                <span>{lang === 'en' ? 'Fajr until Sunrise' : 'Waktu Subuh hingga Terbit Matahari'}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  {pagiCount} {lang === 'en' ? 'Items' : 'Bacaan'}
                </span>
              </div>
              <h3 className="mt-2 text-xl font-semibold text-[var(--color-text-primary)]">
                {lang === 'en' ? 'Morning Dhikr' : 'Zikir Waktu Pagi'}
              </h3>
              <p className="mt-2 font-prose text-sm sm:text-base leading-relaxed text-[var(--color-text-secondary)]">
                {lang === 'en'
                  ? 'Begin your day with Ayat al-Kursi, Sayyidul Istighfar, and prophetic supplications for blessing and protection.'
                  : 'Awali pagi seperti suasana penghuni surga yang senantiasa bertasbih dengan Ayat Kursi, Sayyidul Istighfar, dan doa penjagaan.'}
              </p>

              <div className="mt-4 neu-inset-sm p-3.5 space-y-1">
                <p className="font-prose text-xs sm:text-sm leading-relaxed text-[var(--color-text-primary)]">
                  <ClickableText
                    text={
                      lang === 'en'
                        ? '“And the foremost inhabitants of Paradise glorify Allah morning and evening (bukratan wa ‘ashiyya).” (Imam Muslim no. 2835) · “That I sit with people remembering Allah from the Fajr prayer until the sun rises is more beloved to me than freeing four slaves.” (Abu Dawud no. 3667 · Hasan)'
                        : '“Golongan pertama penghuni surga bertasbih kepada Allah waktu pagi dan petang.” (HR. Imam Muslim no. 2835) · “Sungguh aku duduk bersama kaum yang berzikir kepada Allah dari sholat Subuh hingga terbit matahari lebih aku cintai daripada memerdekakan empat anak Isma’il.” (HR. Abu Dawud no. 3667 · Hasan)'
                    }
                  />
                </p>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={() => onNavigate('/zikir', 'pagi')}
                className="neu-outset-sm inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
              >
                <span>{lang === 'en' ? 'Read Morning Dhikr' : 'Baca Zikir Pagi'}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </article>

          <article className="neu-outset p-5 sm:p-6 flex flex-col justify-between gap-6">
            <div>
              <div className="overflow-hidden rounded-xl aspect-[4/3]">
                <ResilientImage
                  src="/images/paradise_evening_rivers_1795408364341.jpg"
                  alt={
                    lang === 'en'
                      ? 'Tranquil twilight and evening glow across rivers of Paradise'
                      : 'Suasana petang keemasan yang teduh di tepi sungai dan taman surga'
                  }
                  fallbackLabel={lang === 'en' ? 'Paradise Evening' : 'Petang Surga'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-5 flex items-center gap-2 text-xs font-medium text-[var(--color-text-secondary)]">
                <MoonStar className="w-4 h-4 text-accent-600 dark:text-accent-400" aria-hidden="true" />
                <span>{lang === 'en' ? 'Asr until Sunset' : 'Waktu Ashar hingga Menjelang Malam'}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  {petangCount} {lang === 'en' ? 'Items' : 'Bacaan'}
                </span>
              </div>
              <h3 className="mt-2 text-xl font-semibold text-[var(--color-text-primary)]">
                {lang === 'en' ? 'Evening Dhikr' : 'Zikir Waktu Petang'}
              </h3>
              <p className="mt-2 font-prose text-sm sm:text-base leading-relaxed text-[var(--color-text-secondary)]">
                {lang === 'en'
                  ? 'Conclude daytime activities with repentance, tasbih, and seeking safety in this world and the hereafter.'
                  : 'Hiasi waktu senja sebelum malam tiba dengan tasbih, istighfar, serta doa keselamatan dunia dan akhirat.'}
              </p>

              <div className="mt-4 neu-inset-sm p-3.5 space-y-1">
                <p className="font-prose text-xs sm:text-sm leading-relaxed text-[var(--color-text-primary)]">
                  <ClickableText
                    text={
                      lang === 'en'
                        ? '“And that I sit with people remembering Allah from the Asr prayer until the sun sets is more beloved to me than freeing four slaves.” (Abu Dawud no. 3667 · Hasan) · “They glorify Allah morning and evening.” (Imam Muslim no. 2835)'
                        : '“Dan sungguh aku duduk bersama kaum yang berzikir kepada Allah sejak sholat Ashar hingga matahari terbenam lebih aku cintai daripada memerdekakan empat orang budak.” (HR. Abu Dawud no. 3667 · Hasan oleh Syaikh Al-Albani)'
                    }
                  />
                </p>
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={() => onNavigate('/zikir', 'petang')}
                className="neu-outset-sm inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px]"
              >
                <span>{lang === 'en' ? 'Read Evening Dhikr' : 'Baca Zikir Petang'}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </article>
        </div>

        {/* Expanded Zikir Categories Row */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <article className="neu-outset p-6 flex flex-col justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-[var(--color-text-secondary)] flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                <span>{lang === 'en' ? 'After Obligatory Prayer' : "Ba'da Sholat Fardhu"}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{setelahSholatCount}</span>
              </p>
              <h3 className="mt-2 text-lg font-semibold text-[var(--color-text-primary)]">
                {lang === 'en' ? 'After-Prayer Dhikr' : 'Zikir Setelah Sholat'}
              </h3>
              <p className="mt-1.5 text-sm text-[var(--color-text-secondary)]">
                {lang === 'en'
                  ? 'Istighfar, Tasbih, Tahmid, Takbir 33x, and Ayat al-Kursi after salam.'
                  : 'Istighfar, tasbih, tahmid, takbir 33x, dan Ayat Kursi setiap selesai sholat wajib.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/zikir', 'setelah-sholat')}
              className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline self-start cursor-pointer"
            >
              {lang === 'en' ? 'Open After-Prayer →' : 'Buka Zikir Sholat →'}
            </button>
          </article>

          <article className="neu-outset p-6 flex flex-col justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-[var(--color-text-secondary)] flex items-center gap-2">
                <InfinityIcon className="w-3.5 h-3.5 text-accent-600 dark:text-accent-400" aria-hidden="true" />
                <span>{lang === 'en' ? 'Anytime · Unlimited' : 'Tanpa Batasan Waktu'}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{umumCount}</span>
              </p>
              <h3 className="mt-2 text-lg font-semibold text-[var(--color-text-primary)]">
                {lang === 'en' ? 'General Dhikr' : 'Zikir Umum (Mutlak)'}
              </h3>
              <p className="mt-1.5 text-sm text-[var(--color-text-secondary)]">
                {lang === 'en'
                  ? 'Treasured words of remembrance, hawqalah, and salawat anytime without limit.'
                  : 'Kalimat thayyibah, hauqalah, dan shalawat yang dapat dibaca kapan saja tanpa batas.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/zikir', 'umum')}
              className="text-sm font-semibold text-accent-600 dark:text-accent-400 hover:underline self-start cursor-pointer"
            >
              {lang === 'en' ? 'Open General Dhikr →' : 'Buka Zikir Umum →'}
            </button>
          </article>

          <article className="neu-outset p-6 flex flex-col justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-[var(--color-text-secondary)] flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                <span>{lang === 'en' ? 'Daily Occasions' : 'Kondisi Harian'}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{khususCount}</span>
              </p>
              <h3 className="mt-2 text-lg font-semibold text-[var(--color-text-primary)]">
                {lang === 'en' ? 'Special Supplications' : 'Zikir & Doa Khusus'}
              </h3>
              <p className="mt-1.5 text-sm text-[var(--color-text-secondary)]">
                {lang === 'en'
                  ? 'Prayers before sleeping, waking up, leaving home, and relief from anxiety.'
                  : 'Doa sebelum tidur, bangun tidur, keluar rumah, dan penenang hati dari kegelisahan.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/zikir', 'khusus')}
              className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline self-start cursor-pointer"
            >
              {lang === 'en' ? 'Open Special Dhikr →' : 'Buka Zikir Khusus →'}
            </button>
          </article>
        </div>
      </section>

      {/* Section 5: Embedded Optional Dhikr Leaderboard & Api Streak (Above Kiat-Kiat) */}
      <LeaderboardSection />

      {/* Section 6: Keys to Paradise & Eternal Salvation (Kiat-Kiat Akhirat) */}
      <KiatSection />

      {/* Section 6: Featured Hadith Selection */}
      {featuredHadiths.length > 0 && (
        <section aria-labelledby="section-hadis-pilihan">
          <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-[var(--color-border)]/70">
            <div>
              <h2
                id="section-hadis-pilihan"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text-primary)]"
              >
                {t.hadis.heading}
              </h2>
              <p className="mt-1.5 text-sm sm:text-base text-[var(--color-text-secondary)]">
                {t.hadis.subheadline}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/hadis')}
              className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline whitespace-nowrap shrink-0 cursor-pointer"
            >
              {lang === 'en' ? 'View All Hadiths →' : 'Lihat Semua Hadis →'}
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredHadiths.map((hadith) => {
              const cat = categoryById.get(hadith.categoryId);
              return (
                <HadisCard
                  key={hadith.id}
                  hadith={hadith}
                  categoryName={cat?.name}
                  categoryNameEn={cat?.nameEn}
                  isBookmarked={bookmarks.includes(hadith.id)}
                  onToggleBookmark={onToggleBookmark}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Section 7: Featured Blog Articles */}
      {featuredBlogs.length > 0 && (
        <section aria-labelledby="section-blog-pilihan">
          <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-[var(--color-border)]/70">
            <div>
              <h2
                id="section-blog-pilihan"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text-primary)]"
              >
                {lang === 'en' ? 'Sunnah Articles & Insights' : 'Tulisan & Faedah Sunnah'}
              </h2>
              <p className="mt-1.5 text-sm sm:text-base text-[var(--color-text-secondary)]">
                {lang === 'en'
                  ? 'Selected articles on dhikr etiquette, hadith methodology, and daily worship.'
                  : 'Artikel pilihan seputar adab berzikir, pemahaman hadis, dan ibadah harian.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/blog')}
              className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline whitespace-nowrap shrink-0 cursor-pointer"
            >
              {lang === 'en' ? 'Open Blog →' : 'Buka Halaman Blog →'}
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredBlogs.map((post) => (
              <article key={post.id} className="neu-outset p-6 sm:p-7 flex flex-col justify-between gap-5">
                <div className="space-y-4">
                  {post.imageUrl && (
                    <div className="overflow-hidden rounded-xl aspect-video">
                      <ResilientImage
                        src={post.imageUrl}
                        alt={pick(post.title, post.titleEn)}
                        fallbackLabel={
                          translateCategoryName(
                            categoryById.get(post.categoryId)?.name,
                            lang,
                            categoryById.get(post.categoryId)?.nameEn
                          ) || (lang === 'en' ? 'Article' : 'Artikel')
                        }
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-medium text-[var(--color-text-secondary)] flex flex-wrap items-center gap-2">
                      <span>
                        {translateCategoryName(
                          categoryById.get(post.categoryId)?.name,
                          lang,
                          categoryById.get(post.categoryId)?.nameEn
                        ) || (lang === 'en' ? 'Article' : 'Artikel')}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{post.author}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">
                        {post.readingTimeMinutes} {lang === 'en' ? 'min read' : 'mnt baca'}
                      </span>
                    </p>
                    <h3 className="mt-2.5 text-xl font-semibold text-[var(--color-text-primary)] leading-snug">
                      {pick(post.title, post.titleEn)}
                    </h3>
                    <SafeBlogContent
                      content={pick(post.excerpt, post.excerptEn)}
                      variant="excerpt"
                      className="mt-2.5"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => onNavigate('/blog')}
                    className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline cursor-pointer"
                  >
                    {lang === 'en' ? 'Read Full Article →' : 'Baca Selengkapnya →'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
