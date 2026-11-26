'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { UI_COPY, type Language } from '../lib/i18n';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (typeof UI_COPY)[Language];
  pick: (idText?: string | null, enText?: string | null) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'shahih-sunnah-lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('id');
  const hydratedRef = useRef(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'id') {
        setLangState(saved);
      }
    } catch {
      // Ignore storage access errors
    } finally {
      hydratedRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) return;
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage write errors
    }
  }, [lang]);

  const setLang = (next: Language) => setLangState(next);
  const toggleLang = () => setLangState((prev) => (prev === 'id' ? 'en' : 'id'));

  const pick = (idText?: string | null, enText?: string | null): string => {
    if (lang === 'en' && enText && enText.trim().length > 0) {
      return enText;
    }
    return idText ?? '';
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t: UI_COPY[lang], pick }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return ctx;
}
