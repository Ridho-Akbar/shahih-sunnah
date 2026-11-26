'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { Award, LogOut, ShieldAlert, Trophy, UserCheck } from 'lucide-react';
import { fetchLeaderboard } from '../../lib/api';
import type { PublicLeaderboardUser } from '../../lib/validations/content';
import { useLanguage } from '../../context/LanguageContext';
import { useUser } from '../../context/UserContext';
import { StreakIcon } from '../ui/StreakIcon';

export function LeaderboardSection() {
  const { lang, t } = useLanguage();
  const { user, isSignedIn, streakDays, register, login, loginWithGoogle, logout } = useUser();

  const [leaderboard, setLeaderboard] = useState<PublicLeaderboardUser[]>([]);
  const [loadingBoard, setLoadingBoard] = useState(true);
  const [authTab, setAuthTab] = useState<'register' | 'login'>('register');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadBoard = async () => {
    setLoadingBoard(true);
    try {
      const list = await fetchLeaderboard();
      setLeaderboard(list);
    } catch {
      // Non-fatal
    } finally {
      setLoadingBoard(false);
    }
  };

  useEffect(() => {
    void loadBoard();
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setSubmitting(true);
    try {
      if (authTab === 'register') {
        await register({ username, email, password });
      } else {
        await login({ username, password });
      }
      setUsername('');
      setEmail('');
      setPassword('');
      await loadBoard();
    } catch (err) {
      setAuthError(
        err instanceof Error
          ? err.message
          : lang === 'en'
          ? 'Failed to process account.'
          : 'Gagal memproses akun.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="peringkat" aria-labelledby="heading-peringkat" className="scroll-mt-24 space-y-6">
      <div className="pb-6 border-b border-[var(--color-border)]/70">
        <p className="text-xs font-semibold tracking-wide text-primary-600 dark:text-primary-400">
          {t.peringkat.kicker}
        </p>
        <h2
          id="heading-peringkat"
          className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text-primary)]"
        >
          {t.peringkat.heading}
        </h2>
        <p className="mt-1.5 text-sm sm:text-base text-[var(--color-text-secondary)] max-w-prose">
          {t.peringkat.subheadline}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Optional Account Registration / Login / Active User Card */}
        <div className="lg:col-span-5 neu-outset p-6 sm:p-7 space-y-5">
          {isSignedIn && user ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-[var(--color-border)]/60">
                <div className="flex items-center gap-3">
                  <div className="neu-inset-sm p-3 text-primary-600 dark:text-primary-400">
                    <UserCheck className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      {lang === 'en' ? 'Signed in as' : 'Masuk sebagai'}
                    </p>
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                      {user.username}
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="neu-outset-sm inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[var(--color-text-secondary)] hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{lang === 'en' ? 'Sign Out' : 'Keluar'}</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="neu-inset-sm p-3 text-center">
                  <p className="text-[11px] text-[var(--color-text-secondary)]">
                    {lang === 'en' ? 'Points' : 'Poin'}
                  </p>
                  <p className="mt-1 text-xl font-bold font-mono tabular-nums text-primary-600 dark:text-primary-400">
                    {user.points}
                  </p>
                </div>
                <div className="neu-inset-sm p-3 text-center">
                  <p className="text-[11px] text-[var(--color-text-secondary)]">
                    {lang === 'en' ? 'Dhikr' : 'Zikir'}
                  </p>
                  <p className="mt-1 text-xl font-bold font-mono tabular-nums text-[var(--color-text-primary)]">
                    {user.zikirCompleted}
                  </p>
                </div>
                <div className="neu-inset-sm p-3 text-center">
                  <p className="text-[11px] text-[var(--color-text-secondary)]">
                    {lang === 'en' ? 'Streak' : 'Api Streak'}
                  </p>
                  <div className="mt-1 flex items-center justify-center gap-1">
                    <StreakIcon className="w-4 h-4 shrink-0" />
                    <span className="text-xl font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400">
                      {user.streakDays ?? 0}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
                {lang === 'en'
                  ? 'Every completed dhikr awards +10 points, and daily dhikr consistency keeps your Streak Flame burning.'
                  : 'Setiap zikir yang selesai memberi +10 poin, dan istiqamah berzikir harian menjaga Total Api Streak Anda terus menyala.'}
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="neu-inset-sm p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <StreakIcon className="w-6 h-6 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-[var(--color-text-primary)]">
                      {lang === 'en' ? 'Your Local Flame Streak' : 'Total Api Streak Anda'}
                    </p>
                    <p className="text-[11px] text-[var(--color-text-secondary)]">
                      {lang === 'en'
                        ? 'Practice dhikr today to keep it lit'
                        : 'Amalkan zikir hari ini agar api semangat terus menyala'}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-base font-bold tabular-nums text-amber-600 dark:text-amber-400 shrink-0">
                  {streakDays} {lang === 'en' ? 'd' : 'hr'}
                </span>
              </div>

              <div className="neu-inset-sm p-1 grid grid-cols-2 gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setAuthTab('register');
                    setAuthError(null);
                  }}
                  className={`py-2 text-xs sm:text-sm font-semibold rounded-md cursor-pointer ${
                    authTab === 'register'
                      ? 'neu-outset-sm text-primary-600 dark:text-primary-400'
                      : 'text-[var(--color-text-secondary)]'
                  }`}
                >
                  {t.peringkat.joinTitle}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthTab('login');
                    setAuthError(null);
                  }}
                  className={`py-2 text-xs sm:text-sm font-semibold rounded-md cursor-pointer ${
                    authTab === 'login'
                      ? 'neu-outset-sm text-primary-600 dark:text-primary-400'
                      : 'text-[var(--color-text-secondary)]'
                  }`}
                >
                  {t.peringkat.loginTitle}
                </button>
              </div>

              <div className="neu-inset-sm p-3.5 flex items-start gap-2.5 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                <ShieldAlert
                  className="w-4 h-4 text-accent-600 dark:text-accent-400 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <p>{t.peringkat.randomEmailNotice}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="home-rank-username"
                    className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5"
                  >
                    {t.peringkat.username} *
                  </label>
                  <input
                    id="home-rank-username"
                    type="text"
                    required
                    minLength={3}
                    maxLength={24}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={lang === 'en' ? 'e.g., abdullah_99' : 'Contoh: abdullah_99'}
                    className="neu-inset-sm w-full px-3.5 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none min-h-[42px]"
                  />
                </div>

                {authTab === 'register' && (
                  <div>
                    <label
                      htmlFor="home-rank-email"
                      className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5"
                    >
                      {t.peringkat.emailOptional}
                    </label>
                    <input
                      id="home-rank-email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={
                        lang === 'en'
                          ? 'random123@example.com (optional)'
                          : 'acak123@example.com (boleh dikosongkan)'
                      }
                      className="neu-inset-sm w-full px-3.5 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none min-h-[42px]"
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="home-rank-password"
                    className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5"
                  >
                    {t.peringkat.password} *
                  </label>
                  <input
                    id="home-rank-password"
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={lang === 'en' ? 'Minimum 6 characters' : 'Minimal 6 karakter'}
                    className="neu-inset-sm w-full px-3.5 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none min-h-[42px]"
                  />
                </div>

                {authError && (
                  <p role="alert" className="text-xs font-medium text-red-600 dark:text-red-400">
                    {authError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-5 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white text-sm font-semibold cursor-pointer min-h-[44px]"
                >
                  {submitting
                    ? lang === 'en'
                      ? 'Processing...'
                      : 'Memproses...'
                    : authTab === 'register'
                    ? t.peringkat.joinTitle
                    : t.peringkat.loginTitle}
                </button>

                <div className="pt-2 border-t border-[var(--color-border)]/60">
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => {
                      setAuthError(null);
                      setSubmitting(true);
                      void loginWithGoogle()
                        .then(() => loadBoard())
                        .catch((err) => {
                          setAuthError(
                            err instanceof Error
                              ? err.message
                              : lang === 'en'
                              ? 'Google sign-in failed.'
                              : 'Gagal masuk dengan Google.'
                          );
                        })
                        .finally(() => setSubmitting(false));
                    }}
                    className="neu-outset-sm w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-[var(--color-text-primary)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer min-h-[42px]"
                  >
                    {lang === 'en' ? 'Continue with Google' : 'Lanjutkan dengan Google'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Right: Public Leaderboard Table with Total Api Streak field */}
        <div className="lg:col-span-7 neu-outset p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-[var(--color-border)]/60">
            <div className="flex items-center gap-2.5">
              <Trophy className="w-5 h-5 text-accent-600 dark:text-accent-400" aria-hidden="true" />
              <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                {lang === 'en' ? 'Consistency Standings' : 'Daftar Peringkat Amalan'}
              </h3>
            </div>
            <span className="text-xs font-medium text-[var(--color-text-secondary)] tabular-nums">
              {leaderboard.length} {lang === 'en' ? 'participants' : 'peserta'}
            </span>
          </div>

          {loadingBoard ? (
            <div className="space-y-3 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 rounded-xl bg-[var(--color-border)]/40" />
              ))}
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="neu-inset-sm p-8 text-center space-y-2">
              <Award
                className="w-8 h-8 mx-auto text-[var(--color-text-secondary)]"
                aria-hidden="true"
              />
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                {lang === 'en' ? 'No participants yet' : 'Belum ada peserta peringkat'}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)]">
                {lang === 'en'
                  ? 'Be the first to join using the optional form beside.'
                  : 'Jadilah yang pertama bergabung menggunakan formulir di samping.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {leaderboard.map((entry, idx) => {
                const isSelf = user?.id === entry.id;
                const entryStreak = entry.streakDays ?? 0;
                return (
                  <div
                    key={entry.id}
                    className={`p-4 rounded-xl flex items-center justify-between gap-4 ${
                      isSelf ? 'neu-inset-sm ring-1 ring-primary-500/50' : 'neu-outset-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold tabular-nums shrink-0 ${
                          idx === 0
                            ? 'bg-accent-600 text-white'
                            : idx === 1
                            ? 'bg-primary-600 text-white'
                            : 'neu-inset-sm text-[var(--color-text-secondary)]'
                        }`}
                      >
                        #{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[var(--color-text-primary)] truncate">
                          {entry.username} {isSelf ? (lang === 'en' ? '(You)' : '(Anda)') : ''}
                        </p>
                        <p className="text-xs text-[var(--color-text-secondary)] tabular-nums flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <span>
                            {entry.zikirCompleted} {lang === 'en' ? 'dhikr' : 'zikir'}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400">
                            <StreakIcon className="w-3.5 h-3.5 shrink-0" />
                            <span>
                              {entryStreak} {lang === 'en' ? 'day streak' : 'hari api streak'}
                            </span>
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-base font-bold font-mono tabular-nums text-primary-600 dark:text-primary-400">
                        {entry.points}
                      </p>
                      <p className="text-[11px] text-[var(--color-text-secondary)]">
                        {lang === 'en' ? 'pts' : 'poin'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
