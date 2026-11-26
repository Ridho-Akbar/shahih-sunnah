'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Award,
  ChevronDown,
  Compass,
  Globe,
  Info,
  Menu,
  Moon,
  ShieldCheck,
  Sun,
  Trophy,
  X,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useUser } from '../../context/UserContext';
import { BrandLogo } from '../ui/BrandLogo';
import { StreakIcon } from '../ui/StreakIcon';

export type AppRoute =
  | '/'
  | '/zikir'
  | '/hadis'
  | '/sunnah'
  | '/blog'
  | '/tentang'
  | '/admin';

export type HomeSectionId = 'kompas' | 'kiat' | 'peringkat';

interface NavbarProps {
  currentPath: AppRoute;
  onNavigate: (path: AppRoute, sectionId?: HomeSectionId) => void;
}

export function Navbar({ currentPath, onNavigate }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const { streakDays } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isDark = theme === 'dark';

  // Close desktop dropdown on outside click or Escape key
  useEffect(() => {
    if (!dropdownOpen) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dropdownOpen]);

  const primaryNav: Array<{ path: AppRoute; label: string }> = [
    { path: '/zikir', label: t.nav.zikir },
    { path: '/hadis', label: t.nav.hadis },
    { path: '/sunnah', label: t.nav.sunnah },
    { path: '/blog', label: t.nav.blog },
  ];

  const dropdownItems: Array<{
    path: AppRoute;
    sectionId?: HomeSectionId;
    label: string;
    icon: typeof Compass;
  }> = [
    { path: '/', sectionId: 'kompas', label: t.nav.kompas, icon: Compass },
    { path: '/', sectionId: 'kiat', label: t.nav.kiat, icon: Award },
    { path: '/', sectionId: 'peringkat', label: t.nav.peringkat, icon: Trophy },
    { path: '/tentang', label: t.nav.tentang, icon: Info },
    { path: '/admin', label: t.nav.admin, icon: ShieldCheck },
  ];

  const allMobileNav: Array<{ path: AppRoute; sectionId?: HomeSectionId; label: string }> = [
    { path: '/', label: t.nav.home },
    { path: '/zikir', label: t.nav.zikir },
    { path: '/hadis', label: t.nav.hadis },
    { path: '/sunnah', label: t.nav.sunnah },
    { path: '/blog', label: t.nav.blog },
    { path: '/', sectionId: 'kompas', label: t.nav.kompas },
    { path: '/', sectionId: 'kiat', label: t.nav.kiat },
    { path: '/', sectionId: 'peringkat', label: t.nav.peringkat },
    { path: '/tentang', label: t.nav.tentang },
    { path: '/admin', label: t.nav.admin },
  ];

  const isDropdownRouteActive = currentPath === '/tentang' || currentPath === '/admin';

  const handleGo = (path: AppRoute, sectionId?: HomeSectionId) => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    onNavigate(path, sectionId);
  };

  return (
    <header className="sticky top-0 z-30 bg-[var(--color-surface)]/95 backdrop-blur-sm border-b border-[var(--color-border)]/70">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6 h-16">
          {/* Zone 1: Brand Logo + Wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleGo('/');
            }}
            className="inline-flex items-center gap-2.5 text-lg sm:text-xl font-bold tracking-tight text-[var(--color-text-primary)] whitespace-nowrap shrink-0 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <BrandLogo className="w-8 h-8 shrink-0" />
            <span>{t.brand}</span>
          </a>

          {/* Zone 2: 4 Primary Nav Links + Dropdown (Kompas, Kiat, Peringkat, Tentang, Admin) */}
          <nav
            aria-label={lang === 'en' ? 'Main navigation' : 'Navigasi utama'}
            className="hidden md:flex items-center gap-6"
          >
            {primaryNav.map((item) => {
              const active = currentPath === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    handleGo(item.path);
                  }}
                  aria-current={active ? 'page' : undefined}
                  className={`text-sm font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
                    active
                      ? 'text-primary-600 dark:text-primary-400 border-primary-500'
                      : 'text-[var(--color-text-secondary)] border-transparent hover:text-[var(--color-text-primary)] hover:border-[var(--color-border)]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            {/* Dropdown next to Blog */}
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen((open) => !open)}
                aria-expanded={dropdownOpen}
                aria-haspopup="menu"
                className={`inline-flex items-center gap-1.5 text-sm font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors cursor-pointer ${
                  isDropdownRouteActive || dropdownOpen
                    ? 'text-primary-600 dark:text-primary-400 border-primary-500'
                    : 'text-[var(--color-text-secondary)] border-transparent hover:text-[var(--color-text-primary)] hover:border-[var(--color-border)]'
                }`}
              >
                <span>{lang === 'en' ? 'More' : 'Lainnya'}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-150 ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {dropdownOpen && (
                <div
                  role="menu"
                  aria-label={lang === 'en' ? 'Additional navigation' : 'Menu tambahan'}
                  className="neu-outset absolute right-0 mt-3 w-56 p-2 space-y-1 z-40"
                >
                  {dropdownItems.map((item) => {
                    const Icon = item.icon;
                    const active = !item.sectionId && currentPath === item.path;
                    const href = item.sectionId ? `/#${item.sectionId}` : item.path;
                    return (
                      <a
                        key={href}
                        role="menuitem"
                        href={href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleGo(item.path, item.sectionId);
                        }}
                        className={`flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm font-medium rounded-xl transition-colors whitespace-nowrap ${
                          active
                            ? 'neu-inset-sm text-primary-600 dark:text-primary-400 font-semibold'
                            : 'text-[var(--color-text-primary)] hover:bg-[var(--color-border)]/30'
                        }`}
                      >
                        <Icon
                          className="w-4 h-4 text-primary-600 dark:text-primary-400 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{item.label}</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Streak Flame Button beside Language Switcher (ID | EN) beside Theme Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleGo('/', 'peringkat')}
              title={
                lang === 'en'
                  ? `Daily worship streak: ${streakDays} day(s)`
                  : `Total Api Streak amalan harian: ${streakDays} hari`
              }
              aria-label={
                lang === 'en' ? `Api Streak ${streakDays} days` : `Api Streak ${streakDays} hari`
              }
              className="neu-outset-sm inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
            >
              <StreakIcon className="w-5 h-5 shrink-0" />
              <span className="font-mono tabular-nums">{streakDays}</span>
              <span className="hidden xl:inline text-[11px] font-semibold text-[var(--color-text-secondary)]">
                {lang === 'en' ? 'Streak' : 'Streak'}
              </span>
            </button>

            <div
              className="neu-inset-sm p-0.5 inline-flex items-center gap-0.5 min-h-[40px]"
              role="group"
              aria-label={lang === 'en' ? 'Language selector' : 'Pilihan bahasa'}
            >
              <Globe
                className="w-3.5 h-3.5 text-[var(--color-text-secondary)] ml-2 mr-1 hidden sm:block shrink-0"
                aria-hidden="true"
              />
              <button
                type="button"
                onClick={() => setLang('id')}
                aria-pressed={lang === 'id'}
                className={`px-2 sm:px-2.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  lang === 'id'
                    ? 'neu-outset-sm text-primary-600 dark:text-primary-400'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                className={`px-2 sm:px-2.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  lang === 'en'
                    ? 'neu-outset-sm text-primary-600 dark:text-primary-400'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? t.theme.toLight : t.theme.toDark}
              className="neu-outset-sm inline-flex items-center gap-2 px-2.5 sm:px-3.5 py-2 text-xs sm:text-sm font-medium text-[var(--color-text-primary)] hover:text-primary-600 dark:hover:text-primary-400 active:neu-inset-sm transition-all whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-primary-400 shrink-0" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4 text-accent-600 shrink-0" aria-hidden="true" />
              )}
              <span className="hidden lg:inline">{isDark ? t.theme.toLight : t.theme.toDark}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-expanded={mobileMenuOpen}
              aria-label={lang === 'en' ? 'Navigation menu' : 'Menu navigasi'}
              className="md:hidden neu-outset-sm p-2.5 text-[var(--color-text-primary)] cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-5 pt-2 border-t border-[var(--color-border)]/60 space-y-4">
            <nav
              aria-label={lang === 'en' ? 'Mobile menu' : 'Menu seluler'}
              className="grid grid-cols-2 gap-2"
            >
              {allMobileNav.map((item) => {
                const active = !item.sectionId && currentPath === item.path;
                const href = item.sectionId ? `/#${item.sectionId}` : item.path;
                return (
                  <a
                    key={href}
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleGo(item.path, item.sectionId);
                    }}
                    className={`px-3.5 py-2.5 text-sm font-medium rounded-xl transition-colors whitespace-nowrap truncate ${
                      active
                        ? 'neu-inset-sm text-primary-600 dark:text-primary-400 font-semibold'
                        : 'neu-outset-sm text-[var(--color-text-primary)]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
