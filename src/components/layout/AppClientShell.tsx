'use client';

import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { AppContentProvider, useAppContent } from '../../context/AppContentContext';
import { AuthProvider } from '../../context/AuthContext';
import { LanguageProvider, useLanguage } from '../../context/LanguageContext';
import { ScholarProvider } from '../../context/ScholarContext';
import { ThemeProvider } from '../../context/ThemeContext';
import { UserProvider } from '../../context/UserContext';
import { BrandLogo } from '../ui/BrandLogo';
import { OpeningLoader } from '../ui/OpeningLoader';
import { Navbar, type AppRoute, type HomeSectionId } from './Navbar';
import type { TimeOfDay } from '../../lib/validations/content';

function resolvePath(pathname: string | null): AppRoute {
  if (pathname === '/zikir') return '/zikir';
  if (pathname === '/hadis') return '/hadis';
  if (pathname === '/sunnah') return '/sunnah';
  if (pathname === '/blog') return '/blog';
  if (pathname === '/tentang') return '/tentang';
  if (pathname === '/admin' || pathname === '/admin/hadis') return '/admin';
  return '/';
}

function ShellInner({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { lang, t } = useLanguage();
  const { figures, loading, setZikirTab } = useAppContent();
  const [showOpeningLoader, setShowOpeningLoader] = useState(true);

  const currentPath = resolvePath(pathname);

  const handleOpeningFinished = useCallback(() => {
    setShowOpeningLoader(false);
  }, []);

  useEffect(() => {
    if (pathname === '/kompas') {
      window.setTimeout(() => {
        document.getElementById('kompas')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } else if (pathname === '/kiat') {
      window.setTimeout(() => {
        document.getElementById('kiat')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } else if (pathname === '/peringkat') {
      window.setTimeout(() => {
        document.getElementById('peringkat')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  }, [pathname]);

  const handleNavigate = (
    path: AppRoute,
    preferredZikirTime?: TimeOfDay,
    homeSectionId?: HomeSectionId
  ) => {
    if (preferredZikirTime) {
      setZikirTab(preferredZikirTime);
    }
    const targetUrl = homeSectionId ? `/#${homeSectionId}` : path;
    if (pathname !== (homeSectionId ? '/' : path)) {
      router.push(targetUrl);
    }

    if (homeSectionId) {
      window.setTimeout(() => {
        document
          .getElementById(homeSectionId)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const primaryFooterLinks: Array<{ path: AppRoute; label: string }> = [
    { path: '/zikir', label: t.nav.zikir },
    { path: '/hadis', label: t.nav.hadis },
    { path: '/sunnah', label: t.nav.sunnah },
    { path: '/blog', label: t.nav.blog },
  ];

  const utilityFooterLinks: Array<{
    path: AppRoute;
    sectionId?: HomeSectionId;
    label: string;
  }> = [
    { path: '/', sectionId: 'kompas', label: t.nav.kompas },
    { path: '/', sectionId: 'kiat', label: t.nav.kiat },
    { path: '/', sectionId: 'peringkat', label: t.nav.peringkat },
    { path: '/tentang', label: t.nav.tentang },
    { path: '/admin', label: t.nav.admin },
  ];

  return (
    <ScholarProvider figures={figures}>
      {showOpeningLoader && (
        <OpeningLoader ready={!loading} onFinished={handleOpeningFinished} />
      )}
      <div className="min-h-screen flex flex-col">
        <Navbar
          currentPath={currentPath}
          onNavigate={(path, sectionId) => handleNavigate(path, undefined, sectionId)}
        />

        <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-14 sm:pt-8">
          {children}
        </main>

        {/* Improved Structured Editorial Footer */}
        <footer className="border-t border-[var(--color-border)]/70 bg-[var(--color-surface)]/50 mt-14">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
              <div className="md:col-span-5 space-y-3">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigate('/');
                  }}
                  className="inline-flex items-center gap-2.5 text-lg font-bold text-[var(--color-text-primary)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <BrandLogo className="w-7 h-7 shrink-0" />
                  <span>{t.brand}</span>
                </a>
                <p className="font-prose text-sm leading-relaxed text-[var(--color-text-secondary)] max-w-sm">
                  {lang === 'en'
                    ? 'A quiet digital worship guide grounded directly in the Al-Quran and authentic Hadith according to the understanding of the righteous predecessors.'
                    : 'Panduan ibadah harian yang berlandaskan Al-Quran dan Hadis Shahih sesuai pemahaman Salafush Shalih, lengkap dengan dalil asal, bacaan Latin, dan biografi perawi.'}
                </p>
                <p className="text-xs font-mono text-[var(--color-text-secondary)]">
                  Shahih Sunnah · v1.2.0
                </p>
              </div>

              <div className="md:col-span-3 space-y-3">
                <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {lang === 'en' ? 'Worship & Knowledge' : 'Ibadah & Kajian'}
                </h2>
                <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                  {primaryFooterLinks.map((link) => (
                    <li key={link.path}>
                      <a
                        href={link.path}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigate(link.path);
                        }}
                        className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-4 space-y-3">
                <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {lang === 'en' ? 'Tools & Information' : 'Perangkat & Informasi'}
                </h2>
                <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                  {utilityFooterLinks.map((link) => {
                    const href = link.sectionId ? `/#${link.sectionId}` : link.path;
                    return (
                      <li key={href}>
                        <a
                          href={href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigate(link.path, undefined, link.sectionId);
                          }}
                          className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--color-border)]/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-[var(--color-text-secondary)]">
              <p>
                © {new Date().getFullYear()} Shahih Sunnah ·{' '}
                {lang === 'en' ? 'Quran & Authentic Hadith' : 'Al-Quran & Hadis Shahih'}
              </p>
              <p className="flex items-center gap-1.5">
                <span>{lang === 'en' ? 'Developer:' : 'Pengembang:'}</span>
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
          </div>
        </footer>
      </div>
    </ScholarProvider>
  );
}

export function AppClientShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <UserProvider>
            <AppContentProvider>
              <ShellInner>{children}</ShellInner>
            </AppContentProvider>
          </UserProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
