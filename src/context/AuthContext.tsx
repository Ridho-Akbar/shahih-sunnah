'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { createClient } from '../lib/supabase-client';
const supabase = createClient();

type AuthMode = 'env' | 'claimed' | 'unclaimed';

interface AuthContextValue {
  token: string | null;
  isAuthenticated: boolean;
  authMode: AuthMode;
  statusLoading: boolean;
  refreshStatus: () => Promise<void>;
  login: (passcode: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  claim: (passcode: string) => Promise<void>;
  logout: () => void;
  authFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Store Bearer token strictly in React memory (never localStorage/sessionStorage)
  const [token, setToken] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('unclaimed');
  const [statusLoading, setStatusLoading] = useState<boolean>(true);

  const refreshStatus = useCallback(async () => {
    setStatusLoading(true);
    try {
      const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await fetch('/api/admin/status', { headers });
      if (res.ok) {
        const data = (await res.json()) as {
          mode: AuthMode;
          authenticated: boolean;
        };
        setAuthMode(data.mode);
        if (token && !data.authenticated) {
          setToken(null);
        }
      }
    } finally {
      setStatusLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void refreshStatus();
  }, [refreshStatus]);

  const login = useCallback(async (passcode: string) => {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode }),
    });
    const data = (await res.json()) as { token?: string; error?: string };
    if (!res.ok || !data.token) {
      throw new Error(data.error || 'Gagal masuk sebagai admin.');
    }
    setToken(data.token);
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) throw error;
  }, []);

  const claim = useCallback(async (passcode: string) => {
    const res = await fetch('/api/admin/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode }),
    });
    const data = (await res.json()) as { token?: string; error?: string };
    if (!res.ok || !data.token) {
      throw new Error(data.error || 'Gagal mengatur kata sandi admin.');
    }
    setAuthMode('claimed');
    setToken(data.token);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    void supabase.auth.signOut().catch(() => {});
  }, []);

  const authFetch = useCallback(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      const headers = new Headers(init?.headers);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      const res = await fetch(input, { ...init, headers });
      if (res.status === 401) {
        setToken(null);
      }
      return res;
    },
    [token]
  );

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: Boolean(token),
        authMode,
        statusLoading,
        refreshStatus,
        login,
        loginWithGoogle,
        claim,
        logout,
        authFetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
