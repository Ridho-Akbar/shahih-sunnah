'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Bookmark, Check, Eye, EyeOff, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import type { Category, Hadith } from '../lib/validations/content';
import { translateCategoryName } from '../lib/i18n';
import { HadisCard } from '../components/features/HadisCard';
import { HadithEditorModal } from '../components/features/HadithEditorModal';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

interface HadisPageProps {
  hadiths: Hadith[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  bookmarks: number[];
  onToggleBookmark: (id: number) => void;
  onRetry: () => void;
  onDataChanged: () => Promise<void>;
}

export function HadisPage({
  hadiths,
  categories,
  loading,
  error,
  bookmarks,
  onToggleBookmark,
  onRetry,
  onDataChanged,
}: HadisPageProps) {
  const { lang, t } = useLanguage();
  const isEn = lang === 'en';
  const { isSignedIn, user } = useUser();
  const { isAuthenticated, authFetch } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState<'all' | 'saved' | number>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // In-page Admin CRUD state (only active when admin is logged in)
  const [adminHadiths, setAdminHadiths] = useState<Hadith[] | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingHadith, setEditingHadith] = useState<Hadith | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [crudMessage, setCrudMessage] = useState<string | null>(null);
  const [crudError, setCrudError] = useState<string | null>(null);

  const loadAdminHadiths = useCallback(async () => {
    if (!isAuthenticated) {
      setAdminHadiths(null);
      return;
    }
    try {
      const res = await authFetch('/api/admin/hadiths');
      if (!res.ok) return;
      const data = (await res.json()) as { hadiths: Hadith[] };
      setAdminHadiths(data.hadiths);
    } catch {
      // Fallback gracefully to public hadiths
    }
  }, [authFetch, isAuthenticated]);

  useEffect(() => {
    void loadAdminHadiths();
  }, [loadAdminHadiths]);

  const displayedSourceHadiths = isAuthenticated && adminHadiths ? adminHadiths : hadiths;

  const showCrudToast = (msg: string) => {
    setCrudMessage(msg);
    window.setTimeout(() => {
      setCrudMessage((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  const categoryById = useMemo(
    () => new Map(categories.map((cat) => [cat.id, cat])),
    [categories]
  );

  const relevantCategories = useMemo(() => {
    const activeCatIds = new Set(displayedSourceHadiths.map((h) => h.categoryId));
    return categories.filter((c) => activeCatIds.has(c.id));
  }, [categories, displayedSourceHadiths]);

  const filteredHadiths = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return displayedSourceHadiths.filter((item) => {
      if (selectedCategory === 'saved' && !bookmarks.includes(item.id)) {
        return false;
      }
      if (typeof selectedCategory === 'number' && item.categoryId !== selectedCategory) {
        return false;
      }
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        (item.titleEn || '').toLowerCase().includes(q) ||
        item.translation.toLowerCase().includes(q) ||
        (item.translationEn || '').toLowerCase().includes(q) ||
        item.latinText.toLowerCase().includes(q) ||
        item.narrator.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q) ||
        item.dalilStatus.toLowerCase().includes(q)
      );
    });
  }, [displayedSourceHadiths, selectedCategory, bookmarks, searchQuery]);

  const handleOpenCreate = () => {
    setCrudError(null);
    setEditingHadith(null);
    setEditorOpen(true);
  };

  const handleOpenEdit = (item: Hadith) => {
    setCrudError(null);
    setEditingHadith(item);
    setEditorOpen(true);
  };

  const handleTogglePublish = async (item: Hadith) => {
    setCrudError(null);
    try {
      const res = await authFetch(`/api/admin/hadiths/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !item.isPublished }),
      });
      if (!res.ok) {
        throw new Error(isEn ? 'Failed to update status.' : 'Gagal mengubah status hadis.');
      }
      await loadAdminHadiths();
      await onDataChanged();
      showCrudToast(
        !item.isPublished
          ? isEn
            ? 'Hadith published.'
            : 'Hadis dipublikasikan.'
          : isEn
          ? 'Hadith saved as draft.'
          : 'Hadis dijadikan draf.'
      );
    } catch (err) {
      setCrudError(
        err instanceof Error
          ? err.message
          : isEn
          ? 'Failed to update status.'
          : 'Gagal mengubah status hadis.'
      );
    }
  };

  const handleDeleteHadith = async (id: number) => {
    setCrudError(null);
    try {
      const res = await authFetch(`/api/admin/hadiths/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error(isEn ? 'Failed to delete hadith.' : 'Gagal menghapus hadis.');
      }
      setConfirmDeleteId(null);
      await loadAdminHadiths();
      await onDataChanged();
      showCrudToast(isEn ? 'Hadith deleted.' : 'Hadis berhasil dihapus.');
    } catch (err) {
      setCrudError(
        err instanceof Error
          ? err.message
          : isEn
          ? 'Failed to delete hadith.'
          : 'Gagal menghapus hadis.'
      );
    }
  };

  return (
    <div className="space-y-8">
      <div className="neu-outset p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-wide text-primary-600 dark:text-primary-400">
              {t.hadis.kicker}
            </p>
            <h1 className="mt-1.5 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
              {t.hadis.heading}
            </h1>
            <p className="mt-2 font-prose text-base text-[var(--color-text-secondary)] max-w-prose">
              {t.hadis.subheadline}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-72">
              <Search
                className="w-4 h-4 text-[var(--color-text-secondary)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isEn
                    ? 'Search title, narrator, or grading...'
                    : 'Cari judul, bacaan latin, perawi, atau status...'
                }
                aria-label={isEn ? 'Search hadith' : 'Cari hadis'}
                className="neu-inset-sm w-full pl-10 pr-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]/70 focus:outline-none min-h-[42px]"
              />
            </div>

            {isAuthenticated && (
              <button
                type="button"
                onClick={handleOpenCreate}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[42px]"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>{isEn ? 'Add Hadith' : 'Tambah Hadis'}</span>
              </button>
            )}
          </div>
        </div>

        {crudMessage && (
          <div
            role="status"
            className="mt-5 neu-inset-sm px-4 py-3 text-sm font-medium text-primary-700 dark:text-primary-300 flex items-center gap-2"
          >
            <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{crudMessage}</span>
          </div>
        )}
        {crudError && (
          <div
            role="alert"
            className="mt-5 neu-inset-sm px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400"
          >
            {crudError}
          </div>
        )}

        {/* Interactive Filter Tabs */}
        <div className="mt-6 pt-6 border-t border-[var(--color-border)]/60 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] ${
              selectedCategory === 'all'
                ? 'neu-inset-sm text-primary-600 dark:text-primary-400 font-semibold'
                : 'neu-outset-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            {t.hadis.all} ({displayedSourceHadiths.length})
          </button>

          {relevantCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] ${
                selectedCategory === cat.id
                  ? 'neu-inset-sm text-primary-600 dark:text-primary-400 font-semibold'
                  : 'neu-outset-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {translateCategoryName(cat.name, lang, cat.nameEn)}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setSelectedCategory('saved')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] ${
              selectedCategory === 'saved'
                ? 'neu-inset-sm text-accent-600 dark:text-accent-400 font-semibold'
                : 'neu-outset-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
            <span>
              {t.hadis.saved} ({bookmarks.length})
            </span>
          </button>
        </div>

        {selectedCategory === 'saved' && (
          <div className="mt-4 neu-inset-sm px-4 py-2.5 text-xs text-[var(--color-text-secondary)]">
            {isSignedIn && user ? (
              <span>
                {isEn
                  ? `Signed in as ${user.username}: your saved hadiths are synced to your account.`
                  : `Masuk sebagai ${user.username}: hadis tersimpan disinkronkan ke akun Anda.`}
              </span>
            ) : (
              <span>
                {isEn
                  ? 'Guest Mode: Hadiths you save are stored locally in this browser (localStorage) without signing in.'
                  : 'Mode Tamu (Guest): Hadis yang Anda simpan tersimpan otomatis di browser ini (localStorage) tanpa perlu login.'}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" aria-busy="true">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="neu-outset p-8 animate-pulse space-y-4">
              <div className="h-4 w-1/3 rounded bg-[var(--color-border)]/50" />
              <div className="h-6 w-2/3 rounded bg-[var(--color-border)]/50" />
              <div className="h-24 w-full rounded-xl bg-[var(--color-border)]/40" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="neu-outset p-8 text-center space-y-4">
          <p className="text-base font-medium text-[var(--color-text-primary)]">{error}</p>
          <button
            type="button"
            onClick={onRetry}
            className="neu-outset-sm px-5 py-2.5 text-sm font-semibold text-primary-600 dark:text-primary-400 cursor-pointer"
          >
            {isEn ? 'Reload' : 'Muat Ulang'}
          </button>
        </div>
      ) : filteredHadiths.length === 0 ? (
        <div className="neu-outset p-10 text-center space-y-3">
          <p className="text-base font-semibold text-[var(--color-text-primary)]">
            {selectedCategory === 'saved'
              ? isEn
                ? 'No saved hadiths yet'
                : 'Belum ada hadis yang disimpan'
              : isEn
              ? 'No matching hadiths found'
              : 'Tidak ada hadis yang sesuai dengan filter'}
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {selectedCategory === 'saved'
              ? isEn
                ? 'Press Save on any hadith card to bookmark it.'
                : 'Tekan tombol Simpan pada kartu hadis untuk menandai bacaan favorit Anda.'
              : isEn
              ? 'Try another category or search query.'
              : 'Coba ubah kategori atau kata kunci pencarian Anda.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="neu-outset-sm mt-2 px-4 py-2 text-xs font-semibold text-primary-600 dark:text-primary-400 cursor-pointer"
          >
            {isEn ? 'Show All Hadiths' : 'Tampilkan Semua Hadis'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredHadiths.map((hadith) => {
            const cat = categoryById.get(hadith.categoryId);
            return (
              <HadisCard
                key={hadith.id}
                hadith={hadith}
                categoryName={cat?.name}
                categoryNameEn={cat?.nameEn}
                isBookmarked={bookmarks.includes(hadith.id)}
                onToggleBookmark={onToggleBookmark}
                adminActions={
                  isAuthenticated ? (
                    <>
                      <span
                        className={`text-xs font-semibold ${
                          hadith.isPublished
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-amber-700 dark:text-amber-400'
                        }`}
                      >
                        {hadith.isPublished
                          ? isEn
                            ? 'Published'
                            : 'Terbit'
                          : isEn
                          ? 'Draft'
                          : 'Draf'}
                      </span>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => void handleTogglePublish(hadith)}
                          aria-label={
                            hadith.isPublished
                              ? isEn
                                ? 'Set Draft'
                                : 'Jadikan Draf'
                              : isEn
                              ? 'Publish'
                              : 'Publikasikan'
                          }
                          className="neu-outset-sm inline-flex items-center gap-1 px-2.5 py-2 text-xs font-medium text-[var(--color-text-primary)] cursor-pointer min-h-[36px]"
                        >
                          {hadith.isPublished ? (
                            <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenEdit(hadith)}
                          className="neu-outset-sm inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-[var(--color-text-primary)] cursor-pointer min-h-[36px]"
                        >
                          <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{isEn ? 'Edit' : 'Sunting'}</span>
                        </button>

                        {confirmDeleteId === hadith.id ? (
                          <div className="inline-flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => void handleDeleteHadith(hadith.id)}
                              className="px-3 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold cursor-pointer min-h-[36px]"
                            >
                              {isEn ? 'Confirm' : 'Hapus'}
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(null)}
                              className="neu-outset-sm px-2.5 py-2 text-xs cursor-pointer min-h-[36px]"
                            >
                              {isEn ? 'Cancel' : 'Batal'}
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(hadith.id)}
                            aria-label={isEn ? 'Delete hadith' : 'Hapus hadis'}
                            className="neu-outset-sm inline-flex items-center gap-1 px-2.5 py-2 text-xs font-medium text-red-600 dark:text-red-400 cursor-pointer min-h-[36px]"
                          >
                            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        )}
                      </div>
                    </>
                  ) : undefined
                }
              />
            );
          })}
        </div>
      )}

      <HadithEditorModal
        open={editorOpen}
        initialHadith={editingHadith}
        categories={categories}
        authFetch={authFetch}
        onClose={() => setEditorOpen(false)}
        onSaved={async (msg) => {
          await loadAdminHadiths();
          await onDataChanged();
          showCrudToast(msg);
        }}
      />
    </div>
  );
}

