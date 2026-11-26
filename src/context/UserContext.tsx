'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { createClient } from '../lib/supabase-client';
const supabase = createClient();
import type { PublicLeaderboardUser } from '../lib/validations/content';

const GUEST_STREAK_KEY = 'shahih-sunnah-guest-streak';

interface StoredStreak {
  days: number;
  lastDate: string;
}

function getLocalDateKey(offsetDays = 0): string {
  const d = new Date(Date.now() + offsetDays * 86400000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
}

function loadGuestStreak(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = window.localStorage.getItem(GUEST_STREAK_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw) as Partial<StoredStreak>;
    if (typeof parsed.days !== 'number' || typeof parsed.lastDate !== 'string') return 0;
    const today = getLocalDateKey(0);
    const yesterday = getLocalDateKey(-1);
    if (parsed.lastDate === today || parsed.lastDate === yesterday) {
      return parsed.days;
    }
    return 0;
  } catch {
    return 0;
  }
}

function saveBumpGuestStreak(): number {
  const today = getLocalDateKey(0);
  const yesterday = getLocalDateKey(-1);
  let nextDays = 1;
  try {
    const raw = window.localStorage.getItem(GUEST_STREAK_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<StoredStreak>;
      if (parsed.lastDate === today) {
        nextDays = Math.max(1, parsed.days ?? 1);
      } else if (parsed.lastDate === yesterday) {
        nextDays = (parsed.days ?? 0) + 1;
      }
    }
    window.localStorage.setItem(
      GUEST_STREAK_KEY,
      JSON.stringify({ days: nextDays, lastDate: today } satisfies StoredStreak)
    );
  } catch {
    // Ignore storage error
  }
  return nextDays;
}

interface UserContextValue {
  user: PublicLeaderboardUser | null;
  isSignedIn: boolean;
  streakDays: number;
  savedHadithIds: number[];
  register: (input: { username: string; email?: string; password: string }) => Promise<void>;
  login: (input: { username: string; password: string }) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  recordActivity: (type: 'zikir' | 'sunnah') => Promise<PublicLeaderboardUser | null>;
  toggleUserBookmark: (hadithId: number) => Promise<number[] | null>;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  // Token held strictly in React memory (never localStorage/sessionStorage)
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<PublicLeaderboardUser | null>(null);
  const [savedHadithIds, setSavedHadithIds] = useState<number[]>([]);
  const [guestStreak, setGuestStreak] = useState<number>(0);

  useEffect(() => {
    setGuestStreak(loadGuestStreak());
  }, []);

  const register = useCallback(
    async (input: { username: string; email?: string; password: string }) => {
      const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      const data = (await res.json()) as {
        user?: PublicLeaderboardUser;
        token?: string;
        savedHadithIds?: number[];
        error?: string;
      };
      if (!res.ok || !data.token || !data.user) {
        throw new Error(data.error || 'Gagal mendaftar.');
      }
      setToken(data.token);
      setUser(data.user);
      setSavedHadithIds(Array.isArray(data.savedHadithIds) ? data.savedHadithIds : []);
    },
    []
  );

  const login = useCallback(async (input: { username: string; password: string }) => {
    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    const data = (await res.json()) as {
      user?: PublicLeaderboardUser;
      token?: string;
      savedHadithIds?: number[];
      error?: string;
    };
    if (!res.ok || !data.token || !data.user) {
      throw new Error(data.error || 'Username atau kata sandi salah.');
    }
    setToken(data.token);
    setUser(data.user);
    setSavedHadithIds(Array.isArray(data.savedHadithIds) ? data.savedHadithIds : []);
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) throw error;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setSavedHadithIds([]);
    void supabase.auth.signOut().catch(() => {});
  }, []);

  const recordActivity = useCallback(
    async (type: 'zikir' | 'sunnah'): Promise<PublicLeaderboardUser | null> => {
      const updatedLocalStreak = saveBumpGuestStreak();
      setGuestStreak(updatedLocalStreak);

      if (!token) return null;
      try {
        const res = await fetch('/api/leaderboard/activity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ type }),
        });
        if (res.status === 401) {
          setToken(null);
          setUser(null);
          setSavedHadithIds([]);
          return null;
        }
        if (!res.ok) return null;
        const data = (await res.json()) as { user: PublicLeaderboardUser };
        setUser(data.user);
        return data.user;
      } catch {
        return null;
      }
    },
    [token]
  );

  const toggleUserBookmark = useCallback(
    async (hadithId: number): Promise<number[] | null> => {
      if (!token) return null;
      try {
        const res = await fetch('/api/users/bookmarks/toggle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ hadithId }),
        });
        if (res.status === 401) {
          setToken(null);
          setUser(null);
          setSavedHadithIds([]);
          return null;
        }
        if (!res.ok) return null;
        const data = (await res.json()) as { savedHadithIds?: number[] };
        if (Array.isArray(data.savedHadithIds)) {
          setSavedHadithIds(data.savedHadithIds);
          return data.savedHadithIds;
        }
        return null;
      } catch {
        return null;
      }
    },
    [token]
  );

  const streakDays = user ? user.streakDays : guestStreak;

  return (
    <UserContext.Provider
      value={{
        user,
        isSignedIn: Boolean(token && user),
        streakDays,
        savedHadithIds,
        register,
        login,
        loginWithGoogle,
        logout,
        recordActivity,
        toggleUserBookmark,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser must be used inside UserProvider');
  }
  return ctx;
}
