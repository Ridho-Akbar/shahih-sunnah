'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Check,
  Compass,
  Eye,
  EyeOff,
  Infinity as InfinityIcon,
  MoonStar,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Sun,
  Trash2,
} from 'lucide-react';
import { ZIKIR_TIME_LABELS, type Category, type TimeOfDay, type Zikir } from '../lib/validations/content';
import { ZikirCard, type ArabicSize } from '../components/features/ZikirCard';
import { ZikirEditorModal } from '../components/features/ZikirEditorModal';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { trackZikirComplete } from '../lib/api';

interface ZikirPageProps {
  zikrs: Zikir[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  activeTab: TimeOfDay;
  onChangeTab: (tab: TimeOfDay) => void;
  onRetry: () => void;
  onDataChanged: () => Promise<void>;
}

const ZIKIR_TABS: Array<{
  id: TimeOfDay;
  descriptionId: string;
  descriptionEn: string;
}> = [
  {
    id: 'pagi',
    descriptionId: 'Dibaca setelah sholat Subuh hingga terbit matahari atau menjelang siang.',
    descriptionEn: 'Recited after Fajr prayer until sunrise or mid-morning.',
  },
  {
    id: 'petang',
    descriptionId: 'Dibaca setelah sholat Ashar hingga terbenam matahari atau awal malam.',
    descriptionEn: 'Recited after Asr prayer until sunset or early night.',
  },
  {
    id: 'setelah-sholat',
    descriptionId: 'Rangkaian zikir sunnah yang dibaca setelah mengucapkan salam pada sholat fardhu.',
    descriptionEn: 'Sunnah remembrance recited immediately after finishing obligatory prayers.',
  },
  {
    id: 'umum',
    descriptionId:
      'Zikir mutlak yang tidak terikat waktu tertentu dan dapat diamalkan tanpa batasan jumlah.',
    descriptionEn: 'Unrestricted remembrance that can be recited anytime without count limits.',
  },
  {
    id: 'khusus',
    descriptionId:
      'Zikir dan doa pilihan untuk keadaan khusus seperti sebelum tidur, keluar rumah, dan ketenangan hati.',
    descriptionEn: 'Selected supplications for specific moments such as sleep, leaving home, and serenity.',
  },
];

export function ZikirPage({
  zikrs,
  categories,
  loading,
  error,
  activeTab,
  onChangeTab,
  onRetry,
  onDataChanged,
}: ZikirPageProps) {
  const { lang, t, pick } = useLanguage();
  const isEn = lang === 'en';
  const { recordActivity } = useUser();
  const { isAuthenticated, authFetch } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [arabicSize, setArabicSize] = useState<ArabicSize>('lg');
  const [showLatin, setShowLatin] = useState(true);
  const [countsById, setCountsById] = useState<Record<number, number>>({});
  const [activeZikirId, setActiveZikirId] = useState<number | null>(null);
  const completedAwardedRef = useRef<Set<number>>(new Set());

  // In-page Admin CRUD state (only active when admin is logged in)
  const [adminZikrs, setAdminZikrs] = useState<Zikir[] | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingZikir, setEditingZikir] = useState<Zikir | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [crudMessage, setCrudMessage] = useState<string | null>(null);
  const [crudError, setCrudError] = useState<string | null>(null);

  const loadAdminZikrs = useCallback(async () => {
    if (!isAuthenticated) {
      setAdminZikrs(null);
      return;
    }
    try {
      const res = await authFetch('/api/admin/zikrs');
      if (!res.ok) return;
      const data = (await res.json()) as { zikrs: Zikir[] };
      setAdminZikrs(data.zikrs);
    } catch {
      // Fallback gracefully to public zikrs
    }
  }, [authFetch, isAuthenticated]);

  useEffect(() => {
    void loadAdminZikrs();
  }, [loadAdminZikrs]);

  const displayedSourceZikrs = isAuthenticated && adminZikrs ? adminZikrs : zikrs;

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

  const countByTab = useMemo(() => {
    const counts: Record<TimeOfDay, number> = {
      pagi: 0,
      petang: 0,
      'setelah-sholat': 0,
      umum: 0,
      khusus: 0,
    };
    for (const item of displayedSourceZikrs) {
      counts[item.timeOfDay] = (counts[item.timeOfDay] ?? 0) + 1;
    }
    return counts;
  }, [displayedSourceZikrs]);

  const activeMeta = ZIKIR_TABS.find((tab) => tab.id === activeTab) || ZIKIR_TABS[0];

  const tabZikrs = useMemo(
    () => displayedSourceZikrs.filter((item) => item.timeOfDay === activeTab),
    [displayedSourceZikrs, activeTab]
  );

  const filteredZikrs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return tabZikrs.filter((item) => {
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        (item.titleEn || '').toLowerCase().includes(q) ||
        item.translation.toLowerCase().includes(q) ||
        (item.translationEn || '').toLowerCase().includes(q) ||
        item.latinText.toLowerCase().includes(q) ||
        item.reference.toLowerCase().includes(q) ||
        item.dalilSource.toLowerCase().includes(q) ||
        item.dalilText.toLowerCase().includes(q)
      );
    });
  }, [tabZikrs, searchQuery]);

  // Keep activeZikirId synchronized with the active visible list
  useEffect(() => {
    if (filteredZikrs.length === 0) {
      setActiveZikirId(null);
      return;
    }
    const stillVisible = filteredZikrs.some((item) => item.id === activeZikirId);
    if (!stillVisible) {
      setActiveZikirId(filteredZikrs[0].id);
    }
  }, [filteredZikrs, activeZikirId]);

  const activeZikirIndex = useMemo(() => {
    if (filteredZikrs.length === 0) return -1;
    const idx = filteredZikrs.findIndex((item) => item.id === activeZikirId);
    return idx >= 0 ? idx : 0;
  }, [filteredZikrs, activeZikirId]);

  const activeZikir = activeZikirIndex >= 0 ? filteredZikrs[activeZikirIndex] : null;
  const hasNextZikir = activeZikirIndex >= 0 && activeZikirIndex < filteredZikrs.length - 1;

  // Compute progress across all finite zikrs in the active tab
  const { completedTabCount, progressTabTotal, progressPct } = useMemo(() => {
    const measurable = tabZikrs.filter((item) => item.repeatCount > 0);
    const total = measurable.length > 0 ? measurable.length : tabZikrs.length;
    if (total === 0) {
      return { completedTabCount: 0, progressTabTotal: 0, progressPct: 0 };
    }
    const done = (measurable.length > 0 ? measurable : tabZikrs).filter((item) => {
      const c = countsById[item.id] ?? 0;
      return item.repeatCount > 0 ? c >= item.repeatCount : c > 0;
    }).length;
    return {
      completedTabCount: done,
      progressTabTotal: total,
      progressPct: Math.round((done / total) * 100),
    };
  }, [tabZikrs, countsById]);

  const handleIncrement = (item: Zikir) => {
    const current = countsById[item.id] ?? 0;
    const isUnlimited = item.repeatCount === 0;
    if (!isUnlimited && current >= item.repeatCount) {
      return;
    }
    const nextCount = current + 1;
    setCountsById((prev) => ({ ...prev, [item.id]: nextCount }));

    const justFinished = (!isUnlimited && nextCount === item.repeatCount) || (isUnlimited && nextCount === 1);
    if (justFinished && !completedAwardedRef.current.has(item.id)) {
      completedAwardedRef.current.add(item.id);
      void trackZikirComplete();
      void recordActivity('zikir');
    }
  };

  const handleReset = (id: number) => {
    completedAwardedRef.current.delete(id);
    setCountsById((prev) => ({ ...prev, [id]: 0 }));
  };

  const handlePrevZikir = () => {
    if (filteredZikrs.length === 0) return;
    const prevIdx = activeZikirIndex - 1 >= 0 ? activeZikirIndex - 1 : filteredZikrs.length - 1;
    const target = filteredZikrs[prevIdx];
    setActiveZikirId(target.id);
    const el = document.getElementById(`zikir-card-${target.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleNextZikir = () => {
    if (filteredZikrs.length === 0) return;
    const nextIdx = activeZikirIndex + 1 < filteredZikrs.length ? activeZikirIndex + 1 : 0;
    const target = filteredZikrs[nextIdx];
    setActiveZikirId(target.id);
    const el = document.getElementById(`zikir-card-${target.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleOpenCreate = () => {
    setCrudError(null);
    setEditingZikir(null);
    setEditorOpen(true);
  };

  const handleOpenEdit = (item: Zikir) => {
    setCrudError(null);
    setEditingZikir(item);
    setEditorOpen(true);
  };

  const handleTogglePublish = async (item: Zikir) => {
    setCrudError(null);
    try {
      const res = await authFetch(`/api/admin/zikrs/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !item.isPublished }),
      });
      if (!res.ok) {
        throw new Error(isEn ? 'Failed to update dhikr status.' : 'Gagal mengubah status zikir.');
      }
      await loadAdminZikrs();
      await onDataChanged();
      showCrudToast(
        !item.isPublished
          ? isEn
            ? 'Dhikr published.'
            : 'Zikir dipublikasikan.'
          : isEn
          ? 'Dhikr saved as draft.'
          : 'Zikir dijadikan draf.'
      );
    } catch (err) {
      setCrudError(
        err instanceof Error
          ? err.message
          : isEn
          ? 'Failed to update dhikr status.'
          : 'Gagal mengubah status zikir.'
      );
    }
  };

  const handleDeleteZikir = async (id: number) => {
    setCrudError(null);
    try {
      const res = await authFetch(`/api/admin/zikrs/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error(isEn ? 'Failed to delete dhikr.' : 'Gagal menghapus zikir.');
      }
      setConfirmDeleteId(null);
      await loadAdminZikrs();
      await onDataChanged();
      showCrudToast(isEn ? 'Dhikr deleted.' : 'Zikir berhasil dihapus.');
    } catch (err) {
      setCrudError(
        err instanceof Error
          ? err.message
          : isEn
          ? 'Failed to delete dhikr.'
          : 'Gagal menghapus zikir.'
      );
    }
  };

  const renderTabIcon = (id: TimeOfDay) => {
    switch (id) {
      case 'pagi':
        return <Sun className="w-4 h-4 shrink-0" aria-hidden="true" />;
      case 'petang':
        return <MoonStar className="w-4 h-4 shrink-0" aria-hidden="true" />;
      case 'setelah-sholat':
        return <Compass className="w-4 h-4 shrink-0" aria-hidden="true" />;
      case 'umum':
        return <InfinityIcon className="w-4 h-4 shrink-0" aria-hidden="true" />;
      case 'khusus':
        return <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />;
    }
  };

  const activeCount = activeZikir ? countsById[activeZikir.id] ?? 0 : 0;
  const activeUnlimited = activeZikir ? activeZikir.repeatCount === 0 : false;
  const activeCompleted = activeZikir
    ? !activeUnlimited && activeCount >= activeZikir.repeatCount
    : false;

  return (
    <div className="space-y-8 pb-24">
      {/* Page Header, Tabs & Progress Bar */}
      <div className="neu-outset p-6 sm:p-8 space-y-6">
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold tracking-wide text-primary-600 dark:text-primary-400">
              {t.zikir.kicker}
            </p>
            <h1 className="mt-1.5 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
              {t.zikir.heading}
            </h1>
            <p className="mt-2 font-prose text-base text-[var(--color-text-secondary)] max-w-prose">
              {lang === 'en' ? activeMeta.descriptionEn : activeMeta.descriptionId}{' '}
              {lang === 'en'
                ? 'Press Dalil & Tafsir on each item for primary evidence and grading notes.'
                : 'Tekan tombol Dalil & Tafsir pada setiap amalan untuk melihat rujukan asal, status sanad, dan penjelasan ulama.'}
            </p>
          </div>

          {/* Segmented Tab Switcher covering all 5 Zikir categories */}
          <div
            role="tablist"
            aria-label={lang === 'en' ? 'Dhikr categories' : 'Kategori waktu dan jenis zikir'}
            className="neu-inset-sm p-1.5 flex flex-wrap items-center gap-1.5"
          >
            {ZIKIR_TABS.map((tab) => {
              const selected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => onChangeTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer min-h-[42px] ${
                    selected
                      ? 'neu-outset-sm text-primary-600 dark:text-primary-400'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  {renderTabIcon(tab.id)}
                  <span>{ZIKIR_TIME_LABELS[tab.id][lang]}</span>
                  <span className="text-xs opacity-75 tabular-nums">({countByTab[tab.id]})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reading Progress Bar for Active Category (especially Pagi & Petang) */}
        {progressTabTotal > 0 && (
          <div className="neu-inset-sm p-4 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
              <span className="text-[var(--color-text-secondary)]">
                {t.zikir.progressLabel} · {ZIKIR_TIME_LABELS[activeTab][lang]}
              </span>
              <span className="font-mono tabular-nums text-primary-600 dark:text-primary-400">
                {completedTabCount} / {progressTabTotal} {t.zikir.completed} ({progressPct}%)
              </span>
            </div>
            <div
              role="progressbar"
              aria-valuenow={progressPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={t.zikir.progressLabel}
              className="h-2.5 w-full rounded-full bg-[var(--color-border)]/45 overflow-hidden"
            >
              <div
                className="h-full rounded-full bg-primary-600 transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Reading Comfort Toolbar */}
        <div className="pt-2 border-t border-[var(--color-border)]/60 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search
              className="w-4 h-4 text-[var(--color-text-secondary)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'en'
                  ? 'Search dhikr, Latin text, or evidence...'
                  : 'Cari judul zikir, bacaan latin, terjemahan, atau dalil...'
              }
              aria-label={lang === 'en' ? 'Search dhikr' : 'Cari zikir'}
              className="neu-inset-sm w-full pl-10 pr-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]/70 focus:outline-none min-h-[42px]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleOpenCreate}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>{isEn ? 'Add Dhikr' : 'Tambah Zikir'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowLatin((v) => !v)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer min-h-[40px] ${
                showLatin
                  ? 'neu-inset-sm text-primary-600 dark:text-primary-400'
                  : 'neu-outset-sm text-[var(--color-text-secondary)]'
              }`}
            >
              {showLatin ? t.zikir.hideLatin : t.zikir.showLatin}
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[var(--color-text-secondary)] whitespace-nowrap">
                {lang === 'en' ? 'Arabic:' : 'Ukuran Arab:'}
              </span>
              <div className="neu-inset-sm p-1 inline-flex items-center gap-1">
                {(
                  [
                    { id: 'md', labelId: 'Sedang', labelEn: 'Med' },
                    { id: 'lg', labelId: 'Besar', labelEn: 'Lg' },
                    { id: 'xl', labelId: 'Ekstra', labelEn: 'XL' },
                  ] as const
                ).map((size) => (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setArabicSize(size.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      arabicSize === size.id
                        ? 'neu-outset-sm text-primary-600 dark:text-primary-400'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    {lang === 'en' ? size.labelEn : size.labelId}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {crudMessage && (
          <div
            role="status"
            className="neu-inset-sm px-4 py-3 text-sm font-medium text-primary-700 dark:text-primary-300 flex items-center gap-2"
          >
            <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{crudMessage}</span>
          </div>
        )}
        {crudError && (
          <div
            role="alert"
            className="neu-inset-sm px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400"
          >
            {crudError}
          </div>
        )}
      </div>

      {/* Content Area */}
      {loading ? (
        <div
          className="space-y-6"
          aria-busy="true"
          aria-label={lang === 'en' ? 'Loading dhikr entries' : 'Memuat bacaan zikir'}
        >
          {[1, 2, 3].map((item) => (
            <div key={item} className="neu-outset p-8 animate-pulse space-y-4">
              <div className="h-5 w-1/3 rounded bg-[var(--color-border)]/50" />
              <div className="h-24 w-full rounded-xl bg-[var(--color-border)]/40" />
              <div className="h-4 w-3/4 rounded bg-[var(--color-border)]/40" />
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
            {lang === 'en' ? 'Reload' : 'Muat Ulang'}
          </button>
        </div>
      ) : filteredZikrs.length === 0 ? (
        <div className="neu-outset p-10 text-center space-y-3">
          <p className="text-base font-semibold text-[var(--color-text-primary)]">
            {lang === 'en' ? 'No matching dhikr found' : 'Tidak ada bacaan zikir yang sesuai'}
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {lang === 'en'
              ? 'Adjust your search keywords or switch dhikr category.'
              : 'Ubah kata kunci pencarian atau pilih kategori zikir lainnya.'}
          </p>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="neu-outset-sm mt-2 px-4 py-2 text-xs font-semibold text-primary-600 dark:text-primary-400 cursor-pointer"
            >
              {lang === 'en' ? 'Clear Search' : 'Reset Pencarian'}
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredZikrs.map((zikir, index) => {
            const cat = categoryById.get(zikir.categoryId);
            return (
              <ZikirCard
                key={zikir.id}
                zikir={zikir}
                categoryName={cat?.name}
                categoryNameEn={cat?.nameEn}
                arabicSize={arabicSize}
                showLatin={showLatin}
                index={index}
                count={countsById[zikir.id] ?? 0}
                isActive={activeZikir?.id === zikir.id}
                onSelect={() => setActiveZikirId(zikir.id)}
                onIncrement={() => handleIncrement(zikir)}
                onReset={() => handleReset(zikir.id)}
                adminActions={
                  isAuthenticated ? (
                    <>
                      <span
                        className={`text-xs font-semibold ${
                          zikir.isPublished
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-amber-700 dark:text-amber-400'
                        }`}
                      >
                        {zikir.isPublished
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
                          onClick={() => void handleTogglePublish(zikir)}
                          aria-label={
                            zikir.isPublished
                              ? isEn
                                ? 'Set Draft'
                                : 'Jadikan Draf'
                              : isEn
                              ? 'Publish'
                              : 'Publikasikan'
                          }
                          className="neu-outset-sm inline-flex items-center gap-1 px-2.5 py-2 text-xs font-medium text-[var(--color-text-primary)] cursor-pointer min-h-[36px]"
                        >
                          {zikir.isPublished ? (
                            <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                          ) : (
                            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenEdit(zikir)}
                          className="neu-outset-sm inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-[var(--color-text-primary)] cursor-pointer min-h-[36px]"
                        >
                          <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{isEn ? 'Edit' : 'Sunting'}</span>
                        </button>

                        {confirmDeleteId === zikir.id ? (
                          <div className="inline-flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => void handleDeleteZikir(zikir.id)}
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
                            onClick={() => setConfirmDeleteId(zikir.id)}
                            aria-label={isEn ? 'Delete dhikr' : 'Hapus zikir'}
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

      {/* Ergonomic Floating Bottom Action Dock: +1 Count Trigger right next to Next Dhikr button */}
      {activeZikir && !loading && !error && (
        <div
          aria-label={lang === 'en' ? 'Dhikr quick action controls' : 'Kontrol cepat zikir'}
          className="fixed bottom-4 inset-x-0 z-20 px-4 pointer-events-none"
        >
          <div className="max-w-[760px] mx-auto neu-outset bg-[var(--color-surface)]/95 backdrop-blur-md px-3.5 py-2.5 flex items-center justify-between gap-2.5 pointer-events-auto border border-[var(--color-border)]/70">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium text-[var(--color-text-secondary)] truncate">
                #{activeZikirIndex + 1} · {pick(activeZikir.title, activeZikir.titleEn)}
              </p>
              <p className="text-xs sm:text-sm font-bold font-mono tabular-nums text-[var(--color-text-primary)]">
                {activeUnlimited
                  ? `${activeCount} (${t.zikir.unlimited})`
                  : `${activeCount} / ${activeZikir.repeatCount}`}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleIncrement(activeZikir)}
                disabled={activeCompleted}
                className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer min-h-[42px] ${
                  activeCompleted
                    ? 'neu-inset-sm text-primary-600 dark:text-primary-400 cursor-default'
                    : 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm'
                }`}
              >
                {activeCompleted ? (
                  <>
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span>{t.zikir.completed}</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" aria-hidden="true" />
                    <span>{t.zikir.countTrigger}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrevZikir}
                aria-label={lang === 'en' ? 'Previous dhikr' : 'Zikir sebelumnya'}
                title={lang === 'en' ? 'Previous dhikr' : 'Zikir sebelumnya'}
                className="neu-outset-sm inline-flex items-center justify-center px-3 py-2 text-xs sm:text-sm font-semibold text-[var(--color-text-secondary)] hover:text-primary-600 dark:hover:text-primary-400 whitespace-nowrap cursor-pointer min-h-[42px]"
              >
                <ArrowUp className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={handleNextZikir}
                aria-label={lang === 'en' ? 'Next dhikr' : 'Zikir berikutnya'}
                className="neu-outset-sm inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 text-xs sm:text-sm font-semibold text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 whitespace-nowrap cursor-pointer min-h-[42px]"
              >
                <span className="hidden sm:inline">{t.zikir.nextZikir}</span>
                <span className="sm:hidden">{lang === 'en' ? 'Next' : 'Lanjut'}</span>
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}

      <ZikirEditorModal
        open={editorOpen}
        initialZikir={editingZikir}
        defaultTimeOfDay={activeTab}
        categories={categories}
        authFetch={authFetch}
        onClose={() => setEditorOpen(false)}
        onSaved={async (msg) => {
          await loadAdminZikrs();
          await onDataChanged();
          showCrudToast(msg);
        }}
      />
    </div>
  );
}
