import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import { AppClientShell } from '../components/layout/AppClientShell';
import '../index.css';

export const metadata: Metadata = {
  title: 'Shahih Sunnah — Zikir Pagi & Petang, Hadis Shahih, dan Panduan Sunnah',
  description:
    'Kumpulan zikir pagi, petang, setelah sholat, hadis shahih lengkap dengan dalil asal dan tafsir ulama, tata cara sholat, kompas kiblat, serta mode gelap.',
  icons: {
    icon: '/logo.svg',
  },
  openGraph: {
    title: 'Shahih Sunnah — Zikir, Hadis Shahih & Panduan Sunnah',
    description:
      'Bacaan Al-Quran dan Hadis Shahih sesuai pemahaman salafush shalih: zikir harian, dalil lengkap, tafsir, kompas kiblat, dan tata cara sholat.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=JetBrains+Mono:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('shahih-sunnah-theme');var d=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(!s&&d)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        <AppClientShell>{children}</AppClientShell>
      </body>
    </html>
  );
}
