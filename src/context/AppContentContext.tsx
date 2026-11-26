'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { getPublicContentAction } from '../app/actions';
import { trackSiteVisit } from '../lib/api';
import { useUser } from './UserContext';
import type {
  BlogPost,
  Category,
  Hadith,
  ScholarFigure,
  SunnahGuideItem,
  TimeOfDay,
  Zikir,
} from '../lib/validations/content';

const GUEST_BOOKMARK_STORAGE_KEY = 'shahih-sunnah-guest-hadith-bookmarks';
const LEGACY_BOOKMARK_STORAGE_KEY = 'shahih-sunnah-hadith-bookmarks';
const VISIT_TRACKED_KEY = 'shahih-sunnah-visit-tracked';

function loadGuestBookmarks(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw =
      window.localStorage.getItem(GUEST_BOOKMARK_STORAGE_KEY) ??
      window.localStorage.getItem(LEGACY_BOOKMARK_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    const ids = Array.isArray(parsed)
      ? parsed.filter((id): id is number => typeof id === 'number' && Number.isInteger(id))
      : [];
    if (!window.localStorage.getItem(GUEST_BOOKMARK_STORAGE_KEY) && ids.length > 0) {
      window.localStorage.setItem(GUEST_BOOKMARK_STORAGE_KEY, JSON.stringify(ids));
    }
    return ids;
  } catch {
    return [];
  }
}

interface AppContentContextValue {
  categories: Category[];
  zikrs: Zikir[];
  hadiths: Hadith[];
  sunnahGuides: SunnahGuideItem[];
  blogs: BlogPost[];
  figures: ScholarFigure[];
  loading: boolean;
  error: string | null;
  bookmarks: number[];
  zikirTab: TimeOfDay;
  setZikirTab: (tab: TimeOfDay) => void;
  toggleBookmark: (id: number) => void;
  loadPublicContent: () => Promise<void>;
}

const AppContentContext = createContext<AppContentContextValue | null>(null);

export function AppContentProvider({ children }: { children: ReactNode }) {
  const { isSignedIn, savedHadithIds, toggleUserBookmark } = useUser();

  const [categories, setCategories] = useState<Category[]>([]);
  const [zikrs, setZikrs] = useState<Zikir[]>([]);
  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [sunnahGuides, setSunnahGuides] = useState<SunnahGuideItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [figures, setFigures] = useState<ScholarFigure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [guestBookmarks, setGuestBookmarks] = useState<number[]>([]);
  const [zikirTab, setZikirTab] = useState<TimeOfDay>('pagi');

  useEffect(() => {
    setGuestBookmarks(loadGuestBookmarks());
    const hour = new Date().getHours();
    setZikirTab(hour >= 15 || hour < 3 ? 'petang' : 'pagi');
  }, []);

  const loadPublicContent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPublicContentAction();
      setCategories(data.categories);
      setZikrs(data.zikrs);
      setHadiths(data.hadiths);
      setSunnahGuides(data.sunnahGuides);
      setBlogs(data.blogs);
      setFigures(data.figures);
    } catch (err) {
      setError(err instanceof Error ? err.message : '__LOAD_FAILED__');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPublicContent();
  }, [loadPublicContent]);

  useEffect(() => {
    try {
      if (!window.sessionStorage.getItem(VISIT_TRACKED_KEY)) {
        window.sessionStorage.setItem(VISIT_TRACKED_KEY, '1');
        void trackSiteVisit();
      }
    } catch {
      void trackSiteVisit();
    }
  }, []);

  const toggleBookmark = useCallback(
    (id: number) => {
      if (isSignedIn) {
        void toggleUserBookmark(id);
        return;
      }

      setGuestBookmarks((prev) => {
        const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
        try {
          window.localStorage.setItem(GUEST_BOOKMARK_STORAGE_KEY, JSON.stringify(next));
        } catch {
          // Ignore storage error
        }
        return next;
      });
    },
    [isSignedIn, toggleUserBookmark]
  );

  const bookmarks = isSignedIn ? savedHadithIds : guestBookmarks;

  return (
    <AppContentContext.Provider
      value={{
        categories,
        zikrs,
        hadiths,
        sunnahGuides,
        blogs,
        figures,
        loading,
        error,
        bookmarks,
        zikirTab,
        setZikirTab,
        toggleBookmark,
        loadPublicContent,
      }}
    >
      {children}
    </AppContentContext.Provider>
  );
}

export function useAppContent() {
  const ctx = useContext(AppContentContext);
  if (!ctx) {
    throw new Error('useAppContent must be used inside AppContentProvider');
  }
  return ctx;
}
