'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BookHeart,
  Check,
  Droplets,
  Eye,
  EyeOff,
  HeartHandshake,
  Info,
  Pencil,
  Plus,
  Scale,
  ShieldCheck,
  Sun,
  Trash2,
  Users,
} from 'lucide-react';
import type { SunnahGuideItem } from '../lib/validations/content';
import { translateDalilSource, translateDalilStatus } from '../lib/i18n';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ClickableText } from '../components/features/ClickableText';
import { LatinGuideButton } from '../components/features/LatinGuideButton';
import { SunnahEditorModal } from '../components/features/SunnahEditorModal';
import {
  AKIDAH_TOPICS,
  FARAID_DOCTRINE_TOPICS,
  FARAID_PRESET_CASES,
  MAHRAM_CHECKER_OPTIONS,
  MAHRAM_ENTRIES,
  TAUHID_TOPICS,
  WUDHU_STEPS,
  calculateFaraidDistribution,
  type FaraidInputState,
  type SunnahTopicEntry,
} from '../lib/sunnahTopicsData';

interface SunnahPageProps {
  sunnahGuides: SunnahGuideItem[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onDataChanged: () => Promise<void>;
}

type SunnahPageTab =
  | 'sholat'
  | 'kebiasaan'
  | 'wudhu'
  | 'mahram'
  | 'warisan'
  | 'akidah'
  | 'tauhid';

function formatRupiah(amount: number, lang: 'id' | 'en'): string {
  const rounded = Math.round(amount);
  return new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(rounded);
}

function translateFaraidFraction(fraction: string, lang: 'id' | 'en'): string {
  if (lang !== 'en') return fraction;
  return fraction
    .replace(/Mahjub \(0\)/g, 'Excluded (0)')
    .replace(/dibagi rata/gi, 'shared equally')
    .replace(/\bSisa\b/g, 'Remainder');
}

export function SunnahPage({
  sunnahGuides,
  loading,
  error,
  onRetry,
  onDataChanged,
}: SunnahPageProps) {
  const { lang, t, pick } = useLanguage();
  const isEn = lang === 'en';
  const { isAuthenticated, authFetch } = useAuth();

  const [activeTab, setActiveTab] = useState<SunnahPageTab>('sholat');
  const [showLatin, setShowLatin] = useState(true);
  const [expandedDalilIds, setExpandedDalilIds] = useState<Record<string, boolean>>({});

  // In-page Admin CRUD state (only active when admin is logged in)
  const [adminSunnahGuides, setAdminSunnahGuides] = useState<SunnahGuideItem[] | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SunnahGuideItem | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [crudMessage, setCrudMessage] = useState<string | null>(null);
  const [crudError, setCrudError] = useState<string | null>(null);

  const loadAdminSunnah = useCallback(async () => {
    if (!isAuthenticated) {
      setAdminSunnahGuides(null);
      return;
    }
    try {
      const res = await authFetch('/api/admin/sunnah');
      if (!res.ok) return;
      const data = (await res.json()) as { sunnahGuides: SunnahGuideItem[] };
      setAdminSunnahGuides(data.sunnahGuides);
    } catch {
      // Fallback gracefully to public guides
    }
  }, [authFetch, isAuthenticated]);

  useEffect(() => {
    void loadAdminSunnah();
  }, [loadAdminSunnah]);

  const displayedSourceGuides =
    isAuthenticated && adminSunnahGuides ? adminSunnahGuides : sunnahGuides;

  const showCrudToast = (msg: string) => {
    setCrudMessage(msg);
    window.setTimeout(() => {
      setCrudMessage((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  // Interactive Mahram Checker State
  const [selectedMahramId, setSelectedMahramId] = useState<string>(MAHRAM_CHECKER_OPTIONS[0].id);

  // Interactive Branching Faraid Simulator State
  const [activePresetId, setActivePresetId] = useState<string>(FARAID_PRESET_CASES[0].id);
  const [faraidInput, setFaraidInput] = useState<FaraidInputState>(
    FARAID_PRESET_CASES[0].input
  );

  const sholatSteps = useMemo(
    () =>
      displayedSourceGuides
        .filter((item) => item.guideType === 'sholat')
        .sort((a, b) => a.stepOrder - b.stepOrder),
    [displayedSourceGuides]
  );

  const kebiasaanItems = useMemo(
    () =>
      displayedSourceGuides
        .filter((item) => item.guideType === 'kebiasaan')
        .sort((a, b) => a.stepOrder - b.stepOrder),
    [displayedSourceGuides]
  );

  const toggleDalil = (key: string) => {
    setExpandedDalilIds((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleOpenCreate = () => {
    setCrudError(null);
    setEditingItem(null);
    setEditorOpen(true);
  };

  const handleOpenEdit = (item: SunnahGuideItem) => {
    setCrudError(null);
    setEditingItem(item);
    setEditorOpen(true);
  };

  const handleTogglePublish = async (item: SunnahGuideItem) => {
    setCrudError(null);
    try {
      const res = await authFetch(`/api/admin/sunnah/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !item.isPublished }),
      });
      if (!res.ok) {
        throw new Error(
          isEn ? 'Failed to update guide status.' : 'Gagal mengubah status panduan.'
        );
      }
      await loadAdminSunnah();
      await onDataChanged();
      showCrudToast(
        !item.isPublished
          ? isEn
            ? 'Guide published.'
            : 'Panduan dipublikasikan.'
          : isEn
          ? 'Guide saved as draft.'
          : 'Panduan dijadikan draf.'
      );
    } catch (err) {
      setCrudError(
        err instanceof Error
          ? err.message
          : isEn
          ? 'Failed to update guide status.'
          : 'Gagal mengubah status panduan.'
      );
    }
  };

  const handleDeleteGuide = async (id: number) => {
    setCrudError(null);
    try {
      const res = await authFetch(`/api/admin/sunnah/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error(isEn ? 'Failed to delete guide.' : 'Gagal menghapus panduan.');
      }
      setConfirmDeleteId(null);
      await loadAdminSunnah();
      await onDataChanged();
      showCrudToast(isEn ? 'Sunnah guide deleted.' : 'Panduan sunnah berhasil dihapus.');
    } catch (err) {
      setCrudError(
        err instanceof Error
          ? err.message
          : isEn
          ? 'Failed to delete guide.'
          : 'Gagal menghapus panduan.'
      );
    }
  };

  const selectedMahram = useMemo(
    () =>
      MAHRAM_CHECKER_OPTIONS.find((item) => item.id === selectedMahramId) ||
      MAHRAM_CHECKER_OPTIONS[0],
    [selectedMahramId]
  );

  const faraidResult = useMemo(
    () => calculateFaraidDistribution(faraidInput),
    [faraidInput]
  );

  const handleSelectPreset = (presetId: string) => {
    const found = FARAID_PRESET_CASES.find((c) => c.id === presetId);
    if (!found) return;
    setActivePresetId(presetId);
    setFaraidInput({ ...found.input });
  };

  const updateFaraidField = <K extends keyof FaraidInputState>(
    field: K,
    value: FaraidInputState[K]
  ) => {
    setActivePresetId('custom');
    setFaraidInput((prev) => ({ ...prev, [field]: value }));
  };

  const tabs: Array<{
    id: SunnahPageTab;
    label: string;
    count?: number;
    icon: typeof Sun;
  }> = [
    { id: 'sholat', label: t.sunnah.tabSholat, count: sholatSteps.length, icon: Sun },
    { id: 'wudhu', label: lang === 'en' ? 'Wudhu Guide' : 'Tata Cara Wudhu', count: WUDHU_STEPS.length, icon: Droplets },
    { id: 'kebiasaan', label: t.sunnah.tabKebiasaan, count: kebiasaanItems.length, icon: HeartHandshake },
    { id: 'mahram', label: lang === 'en' ? 'Mahram Lineage' : 'Jalur Mahram', count: MAHRAM_ENTRIES.length, icon: Users },
    { id: 'warisan', label: lang === 'en' ? 'Inheritance (Faraid)' : 'Pembagian Warisan', icon: Scale },
    { id: 'akidah', label: lang === 'en' ? 'Creed (Akidah)' : 'Akidah', count: AKIDAH_TOPICS.length, icon: BookHeart },
    { id: 'tauhid', label: lang === 'en' ? 'Tauhid' : 'Tauhid', count: TAUHID_TOPICS.length, icon: ShieldCheck },
  ];

  const renderTopicCards = (entries: SunnahTopicEntry[]) => (
    <div className="space-y-6">
      {entries.map((entry) => {
        const dalilKey = `topic-${entry.id}`;
        const isDalilOpen = Boolean(expandedDalilIds[dalilKey]);
        const displaySource = translateDalilSource(entry.dalilSource, lang);
        const displayDalilText = pick(entry.dalilText, entry.dalilTextEn);
        const displayTafsir = pick(entry.tafsir, entry.tafsirEn);
        return (
          <article key={entry.id} className="neu-outset p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[var(--color-border)]/60">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-[var(--color-text-secondary)] flex flex-wrap items-center gap-2">
                  <span className="font-mono tabular-nums font-semibold text-primary-600 dark:text-primary-400">
                    {lang === 'en' ? entry.categoryLabelEn : entry.categoryLabelId}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    <ClickableText text={displaySource} />
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-primary-600 dark:text-primary-400 font-semibold">
                    {translateDalilStatus(entry.dalilStatus, lang)}
                  </span>
                </p>
                <h2 className="mt-1.5 text-xl font-bold text-[var(--color-text-primary)] tracking-tight">
                  {lang === 'en' ? entry.titleEn : entry.titleId}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => toggleDalil(dalilKey)}
                aria-expanded={isDalilOpen}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] ${
                  isDalilOpen
                    ? 'neu-inset-sm text-accent-600 dark:text-accent-400 font-semibold'
                    : 'neu-outset-sm text-[var(--color-text-primary)] hover:text-accent-600 dark:hover:text-accent-400'
                }`}
              >
                <Info className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.zikir.dalilBtn}</span>
              </button>
            </div>

            {isDalilOpen && (
              <div className="neu-inset-sm p-4 sm:p-6 space-y-4">
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-accent-600 dark:text-accent-400">
                    {t.zikir.dalilHeading}
                  </p>
                  <p className="text-xs font-medium text-[var(--color-text-secondary)]">
                    <ClickableText text={displaySource} /> ·{' '}
                    <ClickableText text={translateDalilStatus(entry.dalilStatus, lang)} />
                  </p>
                  <p className="font-prose text-sm sm:text-[0.95rem] leading-relaxed text-[var(--color-text-primary)] pt-1">
                    <ClickableText text={displayDalilText} />
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--color-border)]/60 space-y-1.5">
                  <p className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                    {t.zikir.tafsirHeading}
                  </p>
                  <p className="font-prose text-sm sm:text-[0.95rem] leading-relaxed text-[var(--color-text-secondary)]">
                    <ClickableText text={displayTafsir} />
                  </p>
                </div>
              </div>
            )}

            {entry.arabicText && (
              <div className="neu-inset p-5 sm:p-6">
                <p
                  lang="ar"
                  dir="rtl"
                  className="font-arabic text-right text-2xl sm:text-[1.85rem] leading-[2.25] text-[var(--color-text-primary)]"
                >
                  {entry.arabicText}
                </p>
              </div>
            )}

            {showLatin && entry.latinText && (
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                    {t.zikir.latinLabel}
                  </p>
                  <LatinGuideButton />
                </div>
                <p className="mt-1 text-sm sm:text-base italic leading-relaxed text-[var(--color-text-secondary)] max-w-prose">
                  {entry.latinText}
                </p>
              </div>
            )}

            <p className="font-prose text-base sm:text-[1.0625rem] leading-relaxed text-[var(--color-text-primary)] max-w-prose">
              <ClickableText text={lang === 'en' ? entry.explanationEn : entry.explanationId} />
            </p>
          </article>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header & Tabs */}
      <div className="neu-outset p-6 sm:p-8 space-y-5">
        <div>
          <p className="text-xs font-semibold tracking-wide text-primary-600 dark:text-primary-400">
            {t.sunnah.kicker}
          </p>
          <h1 className="mt-1.5 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
            {t.sunnah.heading}
          </h1>
          <p className="mt-2 font-prose text-base text-[var(--color-text-secondary)] max-w-prose">
            {t.sunnah.subheadline}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label={t.sunnah.heading}
            className="neu-inset-sm p-1.5 inline-flex flex-wrap gap-1.5"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const selected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer min-h-[42px] ${
                    selected
                      ? 'neu-outset-sm text-primary-600 dark:text-primary-400'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{tab.label}</span>
                  {typeof tab.count === 'number' && (
                    <span className="text-xs opacity-75 tabular-nums">({tab.count})</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isAuthenticated && (activeTab === 'sholat' || activeTab === 'kebiasaan') && (
              <button
                type="button"
                onClick={handleOpenCreate}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>
                  {activeTab === 'sholat'
                    ? isEn
                      ? 'Add Prayer Step'
                      : 'Tambah Langkah Sholat'
                    : isEn
                    ? 'Add Sunnah Habit'
                    : 'Tambah Kebiasaan Sunnah'}
                </span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowLatin((v) => !v)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer min-h-[40px] ${
                showLatin
                  ? 'neu-inset-sm text-primary-600 dark:text-primary-400'
                  : 'neu-outset-sm text-[var(--color-text-secondary)]'
              }`}
            >
              {showLatin ? t.zikir.hideLatin : t.zikir.showLatin}
            </button>
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

      {/* Tab 1 & 3: Server-backed Sholat & Kebiasaan Sunnah (NO checklist / tandai diamalkan) */}
      {(activeTab === 'sholat' || activeTab === 'kebiasaan') && (
        <>
          {loading ? (
            <div className="space-y-5" aria-busy="true">
              {[1, 2, 3].map((idx) => (
                <div key={idx} className="neu-outset p-7 animate-pulse space-y-4">
                  <div className="h-5 w-1/3 rounded bg-[var(--color-border)]/50" />
                  <div className="h-20 w-full rounded-xl bg-[var(--color-border)]/40" />
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
          ) : (
            <div className="space-y-6">
              {(activeTab === 'sholat' ? sholatSteps : kebiasaanItems).map((item) => {
                const displayTitle = pick(item.title, item.titleEn);
                const displayTranslation = pick(item.translation, item.translationEn);
                const displayDalilText = pick(item.dalilText, item.dalilTextEn);
                const displayTafsir = pick(item.tafsir, item.tafsirEn);
                const displaySource = translateDalilSource(item.dalilSource, lang);
                const dalilKey = `guide-${item.id}`;
                const isDalilOpen = Boolean(expandedDalilIds[dalilKey]);

                return (
                  <article key={item.id} className="neu-outset p-6 sm:p-8 space-y-5">
                    <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[var(--color-border)]/60">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-[var(--color-text-secondary)] flex flex-wrap items-center gap-2">
                          <span className="font-mono tabular-nums font-semibold text-primary-600 dark:text-primary-400">
                            {lang === 'en' ? `Step ${item.stepOrder}` : `Langkah ${item.stepOrder}`}
                          </span>
                          {displaySource && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>
                                <ClickableText text={displaySource} />
                              </span>
                            </>
                          )}
                          {item.dalilStatus && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-primary-600 dark:text-primary-400 font-semibold">
                                {translateDalilStatus(item.dalilStatus, lang)}
                              </span>
                            </>
                          )}
                        </p>
                        <h2 className="mt-1.5 text-xl font-bold text-[var(--color-text-primary)] tracking-tight">
                          {displayTitle}
                        </h2>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleDalil(dalilKey)}
                        aria-expanded={isDalilOpen}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] ${
                          isDalilOpen
                            ? 'neu-inset-sm text-accent-600 dark:text-accent-400 font-semibold'
                            : 'neu-outset-sm text-[var(--color-text-primary)] hover:text-accent-600 dark:hover:text-accent-400'
                        }`}
                      >
                        <Info className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{t.zikir.dalilBtn}</span>
                      </button>
                    </div>

                    {isDalilOpen && (
                      <div className="neu-inset-sm p-4 sm:p-6 space-y-4">
                        <div className="space-y-1.5">
                          <p className="text-xs font-semibold text-accent-600 dark:text-accent-400">
                            {t.zikir.dalilHeading}
                          </p>
                          <p className="text-xs font-medium text-[var(--color-text-secondary)]">
                            <ClickableText text={displaySource} />{' '}
                            {item.dalilStatus ? (
                              <>
                                {'· '}
                                <ClickableText text={translateDalilStatus(item.dalilStatus, lang)} />
                              </>
                            ) : (
                              ''
                            )}
                          </p>
                          {displayDalilText && (
                            <p className="font-prose text-sm sm:text-[0.95rem] leading-relaxed text-[var(--color-text-primary)] pt-1">
                              <ClickableText text={displayDalilText} />
                            </p>
                          )}
                        </div>

                        {displayTafsir && (
                          <div className="pt-3 border-t border-[var(--color-border)]/60 space-y-1.5">
                            <p className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                              {t.zikir.tafsirHeading}
                            </p>
                            <p className="font-prose text-sm sm:text-[0.95rem] leading-relaxed text-[var(--color-text-secondary)]">
                              <ClickableText text={displayTafsir} />
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {item.arabicText && (
                      <div className="neu-inset p-5 sm:p-6">
                        <p
                          lang="ar"
                          dir="rtl"
                          className="font-arabic text-right text-2xl sm:text-[1.85rem] leading-[2.25] text-[var(--color-text-primary)]"
                        >
                          {item.arabicText}
                        </p>
                      </div>
                    )}

                    {showLatin && item.latinText && (
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                            {t.zikir.latinLabel}
                          </p>
                          <LatinGuideButton />
                        </div>
                        <p className="mt-1 text-sm sm:text-base italic leading-relaxed text-[var(--color-text-secondary)] max-w-prose">
                          {item.latinText}
                        </p>
                      </div>
                    )}

                    <p className="font-prose text-base sm:text-[1.0625rem] leading-relaxed text-[var(--color-text-primary)] max-w-prose">
                      <ClickableText text={displayTranslation} />
                    </p>

                    {isAuthenticated && (
                      <div className="pt-4 border-t border-[var(--color-border)]/60 flex flex-wrap items-center justify-between gap-2">
                        <span
                          className={`text-xs font-semibold ${
                            item.isPublished
                              ? 'text-primary-600 dark:text-primary-400'
                              : 'text-amber-700 dark:text-amber-400'
                          }`}
                        >
                          {item.isPublished
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
                            onClick={() => void handleTogglePublish(item)}
                            aria-label={
                              item.isPublished
                                ? isEn
                                  ? 'Set Draft'
                                  : 'Jadikan Draf'
                                : isEn
                                ? 'Publish'
                                : 'Publikasikan'
                            }
                            className="neu-outset-sm inline-flex items-center gap-1 px-2.5 py-2 text-xs font-medium text-[var(--color-text-primary)] cursor-pointer min-h-[36px]"
                          >
                            {item.isPublished ? (
                              <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                            ) : (
                              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleOpenEdit(item)}
                            className="neu-outset-sm inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-[var(--color-text-primary)] cursor-pointer min-h-[36px]"
                          >
                            <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>{isEn ? 'Edit' : 'Sunting'}</span>
                          </button>

                          {confirmDeleteId === item.id ? (
                            <div className="inline-flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => void handleDeleteGuide(item.id)}
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
                              onClick={() => setConfirmDeleteId(item.id)}
                              aria-label={isEn ? 'Delete guide' : 'Hapus panduan'}
                              className="neu-outset-sm inline-flex items-center gap-1 px-2.5 py-2 text-xs font-medium text-red-600 dark:text-red-400 cursor-pointer min-h-[36px]"
                            >
                              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Tab 2: Tata Cara Wudhu */}
      {activeTab === 'wudhu' && renderTopicCards(WUDHU_STEPS)}

      {/* Tab 4: Jalur Mahram + Interactive Mahram Checker */}
      {activeTab === 'mahram' && (
        <div className="space-y-8">
          <section className="neu-outset p-6 sm:p-8 space-y-5">
            <div className="pb-4 border-b border-[var(--color-border)]/60">
              <p className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                {lang === 'en' ? 'Interactive Mahram Status Checker' : 'Simulasi Cek Status Jalur Mahram'}
              </p>
              <h2 className="mt-1 text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">
                {lang === 'en'
                  ? 'Check If a Relative or In-Law Is Your Mahram'
                  : 'Periksa Status Mahram Kerabat & Keluarga'}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5 space-y-2">
                <label
                  htmlFor="mahram-relation-select"
                  className="block text-xs font-semibold text-[var(--color-text-primary)]"
                >
                  {lang === 'en' ? 'Select Relationship' : 'Pilih Hubungan Kekeluargaan'}
                </label>
                <select
                  id="mahram-relation-select"
                  value={selectedMahramId}
                  onChange={(e) => setSelectedMahramId(e.target.value)}
                  className="neu-inset-sm w-full px-3.5 py-3 text-sm font-medium text-[var(--color-text-primary)] focus:outline-none min-h-[44px]"
                >
                  {MAHRAM_CHECKER_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {lang === 'en' ? opt.labelEn : opt.labelId}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {lang === 'en'
                    ? 'Applies symmetrically between opposite-sex relatives (men to women and women to men).'
                    : 'Ketentuan berlaku timbal balik antara lawan jenis sesuai garis nasab, radha’ah, maupun mushaharah.'}
                </p>
              </div>

              <div className="lg:col-span-7 neu-inset-sm p-5 sm:p-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`text-sm font-bold ${
                      selectedMahram.statusType === 'muabbad'
                        ? 'text-primary-600 dark:text-primary-400'
                        : selectedMahram.statusType === 'muaqqat'
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    ● {lang === 'en' ? selectedMahram.statusLabelEn : selectedMahram.statusLabelId}
                  </span>
                  <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                    {lang === 'en' ? selectedMahram.categoryEn : selectedMahram.categoryId}
                  </span>
                </div>

                <p className="font-prose text-sm sm:text-base leading-relaxed text-[var(--color-text-primary)]">
                  <ClickableText text={lang === 'en' ? selectedMahram.rulingEn : selectedMahram.rulingId} />
                </p>

                <p className="text-xs font-semibold text-accent-600 dark:text-accent-400">
                  {lang === 'en' ? 'Evidence: ' : 'Dalil: '}
                  <ClickableText text={translateDalilSource(selectedMahram.dalil, lang)} />
                </p>
              </div>
            </div>
          </section>

          {renderTopicCards(MAHRAM_ENTRIES)}
        </div>
      )}

      {/* Tab 5: Pembagian Warisan (Faraid) dengan Percabangan Kasus */}
      {activeTab === 'warisan' && (
        <div className="space-y-8">
          <section className="neu-outset p-6 sm:p-8 space-y-6">
            <div className="pb-4 border-b border-[var(--color-border)]/60">
              <p className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                {lang === 'en'
                  ? 'Interactive Faraid Inheritance Branching Simulator'
                  : 'Kalkulator & Simulasi Percabangan Kasus Waris (Ilmu Faraid)'}
              </p>
              <h2 className="mt-1 text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">
                {lang === 'en'
                  ? 'Explore Branching Quranic Shares, Hijab, ’Aul & Radd'
                  : 'Simulasi Percabangan Kasus Ahli Waris, Hijab, ’Aul & Radd'}
              </h2>
              <p className="mt-1.5 text-sm text-[var(--color-text-secondary)] max-w-prose">
                {lang === 'en'
                  ? 'Pick a classic jurisprudence branching scenario below or customize each heir to see automatic Hijab exclusions and exact portions.'
                  : 'Pilih skenario percabangan kasus di bawah ini atau ubah komposisi ahli waris untuk melihat penghitungan Ashabul Furudh, ’Ashabah, Hijab (penghalang), ’Aul, dan Radd secara otomatis.'}
              </p>
            </div>

            {/* Branching Preset Cases */}
            <div className="space-y-2.5">
              <p className="text-xs font-semibold text-[var(--color-text-secondary)]">
                {lang === 'en' ? 'Branching Case Scenarios:' : 'Pilih Skenario Percabangan Kasus:'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {FARAID_PRESET_CASES.map((preset) => {
                  const active = activePresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset.id)}
                      className={`p-3.5 text-left rounded-xl transition-all cursor-pointer ${
                        active
                          ? 'neu-inset-sm ring-1 ring-primary-500/50'
                          : 'neu-outset-sm hover:text-primary-600 dark:hover:text-primary-400'
                      }`}
                    >
                      <p className="text-xs font-bold text-primary-600 dark:text-primary-400">
                        {lang === 'en' ? preset.titleEn : preset.titleId}
                      </p>
                      <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                        {lang === 'en' ? preset.subtitleEn : preset.subtitleId}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Controls + Live Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Parameter Controls */}
              <div className="lg:col-span-5 neu-inset-sm p-5 space-y-4">
                <div>
                  <label
                    htmlFor="faraid-estate"
                    className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5"
                  >
                    {lang === 'en'
                      ? 'Net Inheritance Estate (IDR after debt & wasiat)'
                      : 'Harta Bersih Pewaris (Rp, setelah utang & wasiat)'}
                  </label>
                  <input
                    id="faraid-estate"
                    type="number"
                    min={0}
                    step={1000000}
                    value={faraidInput.estate}
                    onChange={(e) =>
                      updateFaraidField('estate', Math.max(0, Number(e.target.value) || 0))
                    }
                    className="neu-outset-sm w-full px-3.5 py-2.5 text-sm font-mono tabular-nums text-[var(--color-text-primary)] focus:outline-none min-h-[42px]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="faraid-spouse"
                    className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5"
                  >
                    {lang === 'en' ? 'Surviving Spouse' : 'Pasangan yang Ditinggalkan'}
                  </label>
                  <select
                    id="faraid-spouse"
                    value={faraidInput.spouse}
                    onChange={(e) =>
                      updateFaraidField(
                        'spouse',
                        e.target.value as FaraidInputState['spouse']
                      )
                    }
                    className="neu-outset-sm w-full px-3.5 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none min-h-[42px]"
                  >
                    <option value="none">
                      {lang === 'en' ? 'None (No spouse)' : 'Tidak Ada Suami/Istri'}
                    </option>
                    <option value="wife">
                      {lang === 'en' ? 'Wife (1/4 or 1/8)' : 'Istri (1/4 atau 1/8)'}
                    </option>
                    <option value="husband">
                      {lang === 'en' ? 'Husband (1/2 or 1/4)' : 'Suami (1/2 atau 1/4)'}
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <label className="neu-outset-sm p-2.5 flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={faraidInput.hasFather}
                      onChange={(e) => updateFaraidField('hasFather', e.target.checked)}
                      className="w-4 h-4 accent-primary-600"
                    />
                    <span>{lang === 'en' ? 'Father' : 'Ayah'}</span>
                  </label>
                  <label className="neu-outset-sm p-2.5 flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={faraidInput.hasMother}
                      onChange={(e) => updateFaraidField('hasMother', e.target.checked)}
                      className="w-4 h-4 accent-primary-600"
                    />
                    <span>{lang === 'en' ? 'Mother' : 'Ibu'}</span>
                  </label>
                  <label className="neu-outset-sm p-2.5 flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={faraidInput.hasGrandfather}
                      onChange={(e) => updateFaraidField('hasGrandfather', e.target.checked)}
                      className="w-4 h-4 accent-primary-600"
                    />
                    <span>{lang === 'en' ? 'Grandpa' : 'Kakek'}</span>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="f-sons" className="block text-xs font-semibold mb-1">
                      {lang === 'en' ? 'Sons (Anak Lk)' : 'Anak Laki-laki'}
                    </label>
                    <input
                      id="f-sons"
                      type="number"
                      min={0}
                      max={20}
                      value={faraidInput.sons}
                      onChange={(e) =>
                        updateFaraidField('sons', Math.max(0, Number(e.target.value) || 0))
                      }
                      className="neu-outset-sm w-full px-3 py-2 text-sm font-mono tabular-nums focus:outline-none min-h-[40px]"
                    />
                  </div>
                  <div>
                    <label htmlFor="f-daughters" className="block text-xs font-semibold mb-1">
                      {lang === 'en' ? 'Daughters (Anak Pr)' : 'Anak Perempuan'}
                    </label>
                    <input
                      id="f-daughters"
                      type="number"
                      min={0}
                      max={20}
                      value={faraidInput.daughters}
                      onChange={(e) =>
                        updateFaraidField(
                          'daughters',
                          Math.max(0, Number(e.target.value) || 0)
                        )
                      }
                      className="neu-outset-sm w-full px-3 py-2 text-sm font-mono tabular-nums focus:outline-none min-h-[40px]"
                    />
                  </div>
                  <div>
                    <label htmlFor="f-fbro" className="block text-xs font-semibold mb-1">
                      {lang === 'en' ? 'Full Brothers' : 'Sdr Kandung Lk'}
                    </label>
                    <input
                      id="f-fbro"
                      type="number"
                      min={0}
                      max={20}
                      value={faraidInput.fullBrothers}
                      onChange={(e) =>
                        updateFaraidField(
                          'fullBrothers',
                          Math.max(0, Number(e.target.value) || 0)
                        )
                      }
                      className="neu-outset-sm w-full px-3 py-2 text-sm font-mono tabular-nums focus:outline-none min-h-[40px]"
                    />
                  </div>
                  <div>
                    <label htmlFor="f-fsis" className="block text-xs font-semibold mb-1">
                      {lang === 'en' ? 'Full Sisters' : 'Sdr Kandung Pr'}
                    </label>
                    <input
                      id="f-fsis"
                      type="number"
                      min={0}
                      max={20}
                      value={faraidInput.fullSisters}
                      onChange={(e) =>
                        updateFaraidField(
                          'fullSisters',
                          Math.max(0, Number(e.target.value) || 0)
                        )
                      }
                      className="neu-outset-sm w-full px-3 py-2 text-sm font-mono tabular-nums focus:outline-none min-h-[40px]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="f-msib" className="block text-xs font-semibold mb-1">
                    {lang === 'en' ? 'Maternal Siblings (Seibu)' : 'Saudara Seibu (Lk/Pr)'}
                  </label>
                  <input
                    id="f-msib"
                    type="number"
                    min={0}
                    max={20}
                    value={faraidInput.maternalSiblings}
                    onChange={(e) =>
                      updateFaraidField(
                        'maternalSiblings',
                        Math.max(0, Number(e.target.value) || 0)
                      )
                    }
                    className="neu-outset-sm w-full px-3 py-2 text-sm font-mono tabular-nums focus:outline-none min-h-[40px]"
                  />
                </div>
              </div>

              {/* Calculation Output Table */}
              <div className="lg:col-span-7 space-y-4">
                <div className="neu-inset-sm p-4 space-y-1">
                  <p
                    className={`text-xs font-bold ${
                      faraidResult.adjustmentMode === 'aul'
                        ? 'text-amber-600 dark:text-amber-400'
                        : faraidResult.adjustmentMode === 'radd'
                        ? 'text-accent-600 dark:text-accent-400'
                        : 'text-primary-600 dark:text-primary-400'
                    }`}
                  >
                    ●{' '}
                    {faraidResult.adjustmentMode === 'aul'
                      ? lang === 'en'
                        ? 'Case Type: ’Aul (Adjusted Denominator)'
                        : 'Status Kasus: ’Aul (Penyesuaian Proporsional)'
                      : faraidResult.adjustmentMode === 'radd'
                      ? lang === 'en'
                        ? 'Case Type: Radd (Surplus Returned)'
                        : 'Status Kasus: Radd (Pengembalian Sisa)'
                      : lang === 'en'
                      ? 'Case Type: Standard Distribution'
                      : 'Status Kasus: Pembagian Normal (’Adilah)'}
                  </p>
                  <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
                    {lang === 'en' ? faraidResult.noteEn : faraidResult.noteId}
                  </p>
                </div>

                {faraidResult.rows.length === 0 ? (
                  <div className="neu-inset-sm p-6 text-center text-sm text-[var(--color-text-secondary)]">
                    {lang === 'en'
                      ? 'Enable at least one heir on the left to compute shares.'
                      : 'Aktifkan minimal satu ahli waris di sebelah kiri untuk melihat rincian bagian.'}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {faraidResult.rows.map((row) => (
                      <div
                        key={row.heirId}
                        className={`p-4 rounded-xl space-y-2 ${
                          row.isBlocked
                            ? 'neu-inset-sm opacity-75'
                            : 'neu-outset-sm'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-primary)]">
                              {lang === 'en' ? row.labelEn : row.labelId}
                            </h3>
                            <p className="text-xs font-medium text-primary-600 dark:text-primary-400 font-mono tabular-nums">
                              {translateFaraidFraction(row.fractionLabel, lang)} · {row.percentage.toFixed(2)}%
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-sm sm:text-base font-bold font-mono tabular-nums text-[var(--color-text-primary)]">
                              {formatRupiah(row.amount, lang)}
                            </p>
                            {row.count > 1 && !row.isBlocked && (
                              <p className="text-[11px] font-mono tabular-nums text-[var(--color-text-secondary)]">
                                {formatRupiah(row.perPersonAmount, lang)} / {lang === 'en' ? 'person' : 'orang'}
                              </p>
                            )}
                          </div>
                        </div>

                        <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
                          {lang === 'en' ? row.ruleEn : row.ruleId}{' '}
                          <span className="font-semibold text-accent-600 dark:text-accent-400">
                            (<ClickableText text={translateDalilSource(row.dalil, lang)} />)
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {renderTopicCards(FARAID_DOCTRINE_TOPICS)}
        </div>
      )}

      {/* Tab 6: Akidah Ahlus Sunnah */}
      {activeTab === 'akidah' && renderTopicCards(AKIDAH_TOPICS)}

      {/* Tab 7: Tauhid */}
      {activeTab === 'tauhid' && renderTopicCards(TAUHID_TOPICS)}

      <SunnahEditorModal
        open={editorOpen}
        initialItem={editingItem}
        defaultGuideType={activeTab === 'kebiasaan' ? 'kebiasaan' : 'sholat'}
        defaultStepOrder={
          (activeTab === 'kebiasaan' ? kebiasaanItems.length : sholatSteps.length) + 1
        }
        authFetch={authFetch}
        onClose={() => setEditorOpen(false)}
        onSaved={async (msg) => {
          await loadAdminSunnah();
          await onDataChanged();
          showCrudToast(msg);
        }}
      />
    </div>
  );
}
