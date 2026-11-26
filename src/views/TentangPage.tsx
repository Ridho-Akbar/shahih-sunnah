'use client';

import { useState } from 'react';
import { BookOpen, Check, Code2, Copy, ExternalLink, Heart, Share2, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BrandLogo } from '../components/ui/BrandLogo';
import { ClickableText } from '../components/features/ClickableText';

const APP_VERSION = '1.2.0';

const DONATION_PLATFORMS = [
  {
    name: 'Trakteer',
    url: 'https://trakteer.id',
    noteId: 'Dukungan mudah via Trakteer tanpa menampilkan no. HP/email pribadi.',
    noteEn: 'Easy creator support via Trakteer without exposing personal phone or email.',
  },
  {
    name: 'Ko-fi',
    url: 'https://ko-fi.com',
    noteId: 'Platform donasi global yang tidak menampilkan kontak pribadi.',
    noteEn: 'Global tip jar platform without exposing personal phone or email.',
  },
  {
    name: 'Buy Me a Coffee',
    url: 'https://buymeacoffee.com',
    noteId: 'Dukungan langsung sekali klik tanpa perlu nomor telepon.',
    noteEn: 'One-click support platform without requiring phone numbers.',
  },
  {
    name: 'GitHub Sponsors',
    url: 'https://github.com/sponsors',
    noteId: 'Sponsor pengembangan perangkat lunak terbuka tanpa no. HP/email.',
    noteEn: 'Open-source sponsorship platform with zero personal contact exposure.',
  },
];

export function TentangPage() {
  const { lang, t } = useLanguage();
  const [copiedLink, setCopiedLink] = useState(false);
  const [shareNote, setShareNote] = useState<string | null>(null);

  const handleShare = async () => {
    const shareUrl = window.location.origin;
    const shareData = {
      title: 'Shahih Sunnah',
      text:
        lang === 'en'
          ? 'Shahih Sunnah — Authentic Dhikr, Hadith, Sunnah Prayer Guide, and Qibla Compass.'
          : 'Shahih Sunnah — Kumpulan Zikir, Hadis Shahih, Tata Cara Sholat, dan Kompas Kiblat.',
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareNote(lang === 'en' ? 'Thank you for sharing!' : 'Jazakumullahu khairan telah berbagi!');
        return;
      } catch {
        // User cancelled or unsupported; fallback to copy
      }
    }

    await handleCopyLink();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setCopiedLink(true);
      setShareNote(lang === 'en' ? 'Website link copied.' : 'Tautan website berhasil disalin.');
      window.setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      setShareNote(window.location.origin);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header & Version */}
      <div className="neu-outset p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <BrandLogo className="w-14 h-14 shrink-0" />
          <div>
            <p className="text-xs font-semibold tracking-wide text-primary-600 dark:text-primary-400">
              {t.tentang.kicker}
            </p>
            <h1 className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
              {t.tentang.heading}
            </h1>
            <p className="mt-2 font-prose text-sm sm:text-base text-[var(--color-text-secondary)] max-w-prose">
              {lang === 'en'
                ? 'A digital worship companion built strictly upon the Quran and authentic Hadith according to the understanding of the righteous predecessors (Salafush Shalih).'
                : 'Pendamping ibadah harian yang disusun di atas landasan Al-Quran dan Hadis Shahih sesuai pemahaman Salafush Shalih, dengan antarmuka tenang, bersih, dan ramah di semua perangkat.'}
            </p>
          </div>
        </div>

        <div className="neu-inset-sm px-4 py-3 text-center shrink-0">
          <p className="text-[11px] font-medium text-[var(--color-text-secondary)]">
            {t.tentang.versionLabel}
          </p>
          <p className="mt-0.5 font-mono text-lg font-bold tabular-nums text-primary-600 dark:text-primary-400">
            v{APP_VERSION}
          </p>
        </div>
      </div>

      {/* Share Website */}
      <section className="neu-outset p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2.5">
          <Share2 className="w-5 h-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
            {t.tentang.shareTitle}
          </h2>
        </div>
        <p className="font-prose text-sm sm:text-base text-[var(--color-text-secondary)]">
          <ClickableText
            text={
              lang === 'en'
                ? 'Whoever guides someone to goodness will have a reward like the one who did it (Imam Muslim no. 1893). Share Shahih Sunnah with family and friends.'
                : '“Barang siapa menunjukkan kepada kebaikan, maka ia memperoleh pahala semisal pahala pelakunya” (HR. Imam Muslim no. 1893). Bagikan manfaat aplikasi ini kepada keluarga dan kerabat.'
            }
          />
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => void handleShare()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold cursor-pointer min-h-[42px]"
          >
            <Share2 className="w-4 h-4" aria-hidden="true" />
            <span>{t.tentang.shareBtn}</span>
          </button>

          <button
            type="button"
            onClick={() => void handleCopyLink()}
            className="neu-outset-sm inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[var(--color-text-primary)] cursor-pointer min-h-[42px]"
          >
            {copiedLink ? (
              <Check className="w-4 h-4 text-primary-500" aria-hidden="true" />
            ) : (
              <Copy className="w-4 h-4" aria-hidden="true" />
            )}
            <span>{copiedLink ? t.zikir.copied : t.tentang.copyLinkBtn}</span>
          </button>
        </div>
        {shareNote && (
          <p className="text-xs font-medium text-primary-600 dark:text-primary-400">{shareNote}</p>
        )}
      </section>

      {/* Sources & Acknowledgments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="neu-outset p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-accent-600 dark:text-accent-400" aria-hidden="true" />
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
              {lang === 'en' ? 'Scholarly Sources' : 'Sumber Rujukan Ilmiah'}
            </h2>
          </div>
          <ul className="space-y-2.5 text-sm leading-relaxed text-[var(--color-text-secondary)] list-disc pl-5">
            <li>
              <ClickableText
                text={
                  lang === 'en'
                    ? 'The Noble Quran alongside Tafsir Al-Qur’an Al-‘Azim (Ibnu Katsir) & Taisir Al-Karim Ar-Rahman.'
                    : 'Al-Quran Al-Karim beserta Tafsir Al-Qur’anul ‘Azhim (Ibnu Katsir) & Taisir Al-Karim Ar-Rahman.'
                }
              />
            </li>
            <li>
              <ClickableText
                text={
                  lang === 'en'
                    ? 'Al-Kutub Al-Sittah: Sahih Al-Bukhari, Imam Muslim, Sunan Abi Dawud, Jami’ At-Tirmidzi, Sunan An-Nasa’i, and Sunan Ibn Majah.'
                    : 'Kutubus Sittah: Shahih Al-Bukhari, Imam Muslim, Sunan Abi Dawud, Jami’ At-Tirmidzi, Sunan An-Nasa’i, dan Sunan Ibnu Majah.'
                }
              />
            </li>
            <li>
              <ClickableText
                text={
                  lang === 'en'
                    ? 'Al-Minhaj Sharh Sahih Muslim (Imam An-Nawawi) & Fath Al-Bari (Ibnu Hajar Al-Asqalani).'
                    : 'Syarah Shahih Muslim (Imam An-Nawawi) & Fathul Bari (Ibnu Hajar Al-Asqalani).'
                }
              />
            </li>
            <li>
              <ClickableText
                text={
                  lang === 'en'
                    ? 'Hisn Al-Muslim (Shaykh Sa‘id ibn ‘Ali Al-Qahtani) & Sifat Salat An-Nabi ﷺ (Al-Albani).'
                    : 'Hishnul Muslim (Syaikh Sa’id bin ‘Ali Al-Qahthani) & Sifat Sholat Nabi ﷺ (Syaikh Al-Albani).'
                }
              />
            </li>
            <li>
              {lang === 'en'
                ? 'Prayer time calculation follows standard Kemenag RI twilight angles (Fajr 20°, Isha 18°, +2 min caution margin).'
                : 'Hisab waktu sholat menggunakan parameter sudut Kementerian Agama RI (Subuh 20°, Isya 18°, Ihtiyat +2 menit).'}
            </li>
          </ul>
        </section>

        <section className="neu-outset p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
              {lang === 'en' ? 'Acknowledgments' : 'Ucapan Terima Kasih'}
            </h2>
          </div>
          <p className="font-prose text-sm sm:text-base leading-relaxed text-[var(--color-text-secondary)]">
            {lang === 'en'
              ? 'All praise is due to Allah subhanahu wa ta’ala. We express deep gratitude to the scholars of Ahlus Sunnah who preserved the Prophetic narrations, the translators, open-source Arabic font designers (Amiri), and every reader who contributes feedback and prayers.'
              : 'Segala puji bagi Allah subhanahu wa ta’ala. Terima kasih sebesar-besarnya kepada para ulama muhadditsin yang menjaga kemurnian sanad hadis, para penerjemah kitab klasik, perancang tipografi Arab Amiri, serta seluruh pembaca yang mendoakan keberlangsungan dakwah yang sejuk dan ilmiah ini.'}
          </p>

          <div className="neu-inset-sm p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary-600 dark:text-primary-400">
              <Code2 className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{lang === 'en' ? 'Developer Information' : 'Pengembang Website'}</span>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {lang === 'en'
                ? 'Designed and built by:'
                : 'Dirancang dan dikembangkan oleh:'}{' '}
              <a
                href="https://ridho-akbar.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-primary-600 dark:text-primary-400 hover:underline"
              >
                <span>ridho-akbar.my.id</span>
                <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </a>
            </p>
          </div>
        </section>
      </div>

      {/* Privacy Policy & Developer Support */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="neu-outset p-6 sm:p-7 space-y-3">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
              {lang === 'en' ? 'Privacy Policy' : 'Kebijakan Privasi'}
            </h2>
          </div>
          <p className="font-prose text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {lang === 'en'
              ? 'Shahih Sunnah displays zero advertisements and uses zero third-party tracking cookies. GPS coordinates for prayer times and Qibla compass are processed locally inside your browser and are never sent to our servers. Optional leaderboard accounts only store your chosen username, hashed password, and practice scores.'
              : 'Shahih Sunnah bebas dari iklan dan pelacak pihak ketiga. Koordinat GPS untuk jadwal sholat dan kompas kiblat dihitung langsung di peramban Anda dan tidak pernah dikirim ke server. Akun papan peringkat bersifat opsional, boleh memakai email acak, dan kata sandi dienkripsi dengan scrypt.'}
          </p>
        </section>

        <section className="neu-outset p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-accent-600 dark:text-accent-400" aria-hidden="true" />
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
              {lang === 'en' ? 'Support the Developer' : 'Dukungan Pengembang'}
            </h2>
          </div>
          <p className="font-prose text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {lang === 'en'
              ? 'Support ongoing server maintenance and scholarly verification via privacy-friendly donation platforms below without sharing any phone number or personal email:'
              : 'Anda dapat mendukung pemeliharaan server dan pengembangan konten melalui platform donasi berikut yang aman tanpa mencantumkan nomor HP ataupun email pribadi:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DONATION_PLATFORMS.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="neu-outset-sm p-3.5 rounded-xl flex items-start justify-between gap-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <div className="space-y-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                    {platform.name}
                  </p>
                  <p className="text-xs leading-snug text-[var(--color-text-secondary)]">
                    {lang === 'en' ? platform.noteEn : platform.noteId}
                  </p>
                </div>
                <ExternalLink
                  className="w-4 h-4 text-primary-600 dark:text-primary-400 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>

          <p className="text-xs text-[var(--color-text-secondary)]">
            {lang === 'en' ? 'Developer Portal:' : 'Situs Pengembang:'}{' '}
            <a
              href="https://ridho-akbar.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary-600 dark:text-primary-400 hover:underline"
            >
              ridho-akbar.my.id
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
