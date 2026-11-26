'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translateCategoryName } from '../../lib/i18n';
import {
  ZIKIR_TIME_LABELS,
  createZikirSchema,
  type Category,
  type TimeOfDay,
  type Zikir,
} from '../../lib/validations/content';

export interface ZikirFormState {
  id: number | null;
  categoryId: number;
  title: string;
  titleEn: string;
  arabicText: string;
  latinText: string;
  translation: string;
  translationEn: string;
  reference: string;
  dalilSource: string;
  dalilStatus: string;
  dalilText: string;
  dalilTextEn: string;
  tafsir: string;
  tafsirEn: string;
  repeatCount: number;
  timeOfDay: TimeOfDay;
  isPublished: boolean;
}

export function createEmptyZikirForm(
  defaultCategoryId: number,
  defaultTimeOfDay: TimeOfDay = 'pagi'
): ZikirFormState {
  return {
    id: null,
    categoryId: defaultCategoryId,
    title: '',
    titleEn: '',
    arabicText: '',
    latinText: '',
    translation: '',
    translationEn: '',
    reference: '',
    dalilSource: '',
    dalilStatus: 'Shahih',
    dalilText: '',
    dalilTextEn: '',
    tafsir: '',
    tafsirEn: '',
    repeatCount: 1,
    timeOfDay: defaultTimeOfDay,
    isPublished: true,
  };
}

export function zikirToFormState(item: Zikir): ZikirFormState {
  return {
    id: item.id,
    categoryId: item.categoryId,
    title: item.title,
    titleEn: item.titleEn || '',
    arabicText: item.arabicText,
    latinText: item.latinText || '',
    translation: item.translation,
    translationEn: item.translationEn || '',
    reference: item.reference,
    dalilSource: item.dalilSource || item.reference || '',
    dalilStatus: item.dalilStatus || 'Shahih',
    dalilText: item.dalilText || '',
    dalilTextEn: item.dalilTextEn || '',
    tafsir: item.tafsir || '',
    tafsirEn: item.tafsirEn || '',
    repeatCount: item.repeatCount,
    timeOfDay: item.timeOfDay,
    isPublished: item.isPublished,
  };
}

interface ZikirEditorModalProps {
  open: boolean;
  initialZikir?: Zikir | null;
  defaultTimeOfDay?: TimeOfDay;
  categories: Category[];
  authFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  onClose: () => void;
  onSaved: (message: string) => Promise<void> | void;
}

export function ZikirEditorModal({
  open,
  initialZikir,
  defaultTimeOfDay = 'pagi',
  categories,
  authFetch,
  onClose,
  onSaved,
}: ZikirEditorModalProps) {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const [form, setForm] = useState<ZikirFormState>(() =>
    initialZikir
      ? zikirToFormState(initialZikir)
      : createEmptyZikirForm(categories[0]?.id ?? 1, defaultTimeOfDay)
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setError(null);
    setForm(
      initialZikir
        ? zikirToFormState(initialZikir)
        : createEmptyZikirForm(categories[0]?.id ?? 1, defaultTimeOfDay)
    );
  }, [open, initialZikir, defaultTimeOfDay, categories]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsed = createZikirSchema.safeParse({
      categoryId: form.categoryId,
      title: form.title,
      titleEn: form.titleEn,
      arabicText: form.arabicText,
      latinText: form.latinText,
      translation: form.translation,
      translationEn: form.translationEn,
      reference: form.reference || form.dalilSource,
      dalilSource: form.dalilSource || form.reference,
      dalilStatus: form.dalilStatus,
      dalilText: form.dalilText,
      dalilTextEn: form.dalilTextEn,
      tafsir: form.tafsir,
      tafsirEn: form.tafsirEn,
      repeatCount: form.repeatCount,
      timeOfDay: form.timeOfDay,
      isPublished: form.isPublished,
    });

    if (!parsed.success) {
      setError(
        parsed.error.issues[0]?.message ||
          (isEn ? 'Please review the dhikr inputs.' : 'Periksa kembali input zikir.')
      );
      return;
    }

    setSubmitting(true);
    try {
      const isEdit = form.id !== null;
      const url = isEdit ? `/api/admin/zikrs/${form.id}` : '/api/admin/zikrs';
      const method = isEdit ? 'PATCH' : 'POST';
      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(
          data.error || (isEn ? 'Failed to save dhikr.' : 'Gagal menyimpan zikir.')
        );
      }

      const msg = isEdit
        ? isEn
          ? 'Dhikr updated successfully.'
          : 'Zikir berhasil diperbarui.'
        : isEn
        ? 'New dhikr added successfully.'
        : 'Zikir baru berhasil ditambahkan.';
      await onSaved(msg);
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : isEn
          ? 'Failed to save dhikr.'
          : 'Gagal menyimpan zikir.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="zikir-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="shadow-none rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] w-full max-w-2xl p-6 sm:p-8 my-8 space-y-5 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[var(--color-border)]/60">
          <h2 id="zikir-modal-title" className="text-xl font-bold text-[var(--color-text-primary)]">
            {form.id
              ? isEn
                ? 'Edit Dhikr'
                : 'Sunting Zikir'
              : isEn
              ? 'Add New Dhikr'
              : 'Tambah Zikir Baru'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={isEn ? 'Close dialog' : 'Tutup dialog'}
            className="neu-outset-sm p-2 text-[var(--color-text-secondary)] cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="z-title" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Dhikr Title (ID) *' : 'Judul Zikir (ID) *'}
              </label>
              <input
                id="z-title"
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
              />
            </div>
            <div>
              <label htmlFor="z-title-en" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'English Title (Optional)' : 'Judul Inggris (Opsional)'}
              </label>
              <input
                id="z-title-en"
                type="text"
                value={form.titleEn}
                onChange={(e) => setForm((f) => ({ ...f, titleEn: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="z-category" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Category *' : 'Kategori *'}
              </label>
              <select
                id="z-category"
                value={form.categoryId}
                onChange={(e) => setForm((f) => ({ ...f, categoryId: Number(e.target.value) }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {translateCategoryName(cat.name, lang, cat.nameEn)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="z-time" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Category / Time *' : 'Jenis / Waktu *'}
              </label>
              <select
                id="z-time"
                value={form.timeOfDay}
                onChange={(e) => setForm((f) => ({ ...f, timeOfDay: e.target.value as TimeOfDay }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
              >
                <option value="pagi">{ZIKIR_TIME_LABELS.pagi[lang]}</option>
                <option value="petang">{ZIKIR_TIME_LABELS.petang[lang]}</option>
                <option value="setelah-sholat">{ZIKIR_TIME_LABELS['setelah-sholat'][lang]}</option>
                <option value="umum">
                  {isEn ? 'General Dhikr (Anytime)' : 'Zikir Umum (Tanpa Waktu)'}
                </option>
                <option value="khusus">{ZIKIR_TIME_LABELS.khusus[lang]}</option>
              </select>
            </div>

            <div>
              <label htmlFor="z-repeat" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Repetition (0 = Unlimited) *' : 'Pengulangan (0 = Tak Terbatas) *'}
              </label>
              <input
                id="z-repeat"
                type="number"
                min={0}
                max={1000}
                required
                value={form.repeatCount}
                onChange={(e) =>
                  setForm((f) => ({ ...f, repeatCount: Math.max(0, Number(e.target.value) || 0) }))
                }
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="z-arabic" className="block text-xs font-semibold mb-1.5">
              {isEn ? 'Arabic Text *' : 'Teks Arab *'}
            </label>
            <textarea
              id="z-arabic"
              rows={3}
              required
              dir="rtl"
              value={form.arabicText}
              onChange={(e) => setForm((f) => ({ ...f, arabicText: e.target.value }))}
              className="neu-inset-sm w-full px-3.5 py-2.5 font-arabic text-xl focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="z-latin" className="block text-xs font-semibold mb-1.5">
              {isEn ? 'Latin Transliteration' : 'Bacaan Latin'}
            </label>
            <textarea
              id="z-latin"
              rows={2}
              value={form.latinText}
              onChange={(e) => setForm((f) => ({ ...f, latinText: e.target.value }))}
              className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="z-translation" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Translation (ID) *' : 'Terjemahan (ID) *'}
              </label>
              <textarea
                id="z-translation"
                rows={3}
                required
                value={form.translation}
                onChange={(e) => setForm((f) => ({ ...f, translation: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="z-translation-en" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'English Translation (Optional)' : 'Terjemahan Inggris (Opsional)'}
              </label>
              <textarea
                id="z-translation-en"
                rows={3}
                value={form.translationEn}
                onChange={(e) => setForm((f) => ({ ...f, translationEn: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="z-dalil-source" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Primary Hadith / Quran Reference' : 'Rujukan Hadis / Al-Quran Asal'}
              </label>
              <input
                id="z-dalil-source"
                type="text"
                value={form.dalilSource}
                onChange={(e) =>
                  setForm((f) => ({ ...f, dalilSource: e.target.value, reference: e.target.value }))
                }
                placeholder={
                  isEn ? 'e.g., HR. Al-Bukhari no. 6306' : 'Contoh: HR. Al-Bukhari no. 6306'
                }
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
              />
            </div>
            <div>
              <label htmlFor="z-dalil-status" className="block text-xs font-semibold mb-1.5">
                {isEn
                  ? 'Narration Status (Sahih / Authenticated / Quran)'
                  : 'Status Riwayat (Shahih / Dishahihkan / Quran)'}
              </label>
              <input
                id="z-dalil-status"
                type="text"
                value={form.dalilStatus}
                onChange={(e) => setForm((f) => ({ ...f, dalilStatus: e.target.value }))}
                placeholder={
                  isEn ? "e.g., Sahih · Muttafaqun 'Alayh" : "Contoh: Shahih · Muttafaqun 'Alaih"
                }
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="z-dalil-text" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Full Evidence Text (ID)' : 'Teks Dalil Lengkap (ID)'}
              </label>
              <textarea
                id="z-dalil-text"
                rows={3}
                value={form.dalilText}
                onChange={(e) => setForm((f) => ({ ...f, dalilText: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="z-dalil-text-en" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'English Evidence Text (Optional)' : 'Teks Dalil Inggris (Opsional)'}
              </label>
              <textarea
                id="z-dalil-text-en"
                rows={3}
                value={form.dalilTextEn}
                onChange={(e) => setForm((f) => ({ ...f, dalilTextEn: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="z-tafsir" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Tafsir & Scholarly Commentary (ID)' : 'Tafsir & Penjelasan Ulama (ID)'}
              </label>
              <textarea
                id="z-tafsir"
                rows={3}
                value={form.tafsir}
                onChange={(e) => setForm((f) => ({ ...f, tafsir: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="z-tafsir-en" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'English Tafsir & Commentary (Optional)' : 'Tafsir Inggris (Opsional)'}
              </label>
              <textarea
                id="z-tafsir-en"
                rows={3}
                value={form.tafsirEn}
                onChange={(e) => setForm((f) => ({ ...f, tafsirEn: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
              />
            </div>
          </div>

          <label className="inline-flex items-center gap-2.5 text-sm font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))}
              className="w-4 h-4 accent-primary-600"
            />
            <span>
              {isEn
                ? 'Publish immediately to the Dhikr page'
                : 'Langsung publikasikan ke halaman Zikir'}
            </span>
          </label>

          {error && (
            <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <div className="pt-4 border-t border-[var(--color-border)]/60 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="neu-outset-sm px-5 py-2.5 text-sm font-medium cursor-pointer min-h-[42px]"
            >
              {isEn ? 'Cancel' : 'Batal'}
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white text-sm font-semibold cursor-pointer min-h-[42px]"
            >
              {submitting
                ? isEn
                  ? 'Saving...'
                  : 'Menyimpan...'
                : isEn
                ? 'Save Dhikr'
                : 'Simpan Zikir'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
