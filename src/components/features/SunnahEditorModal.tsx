'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import {
  createSunnahSchema,
  type SunnahGuideItem,
  type SunnahGuideType,
} from '../../lib/validations/content';

export interface SunnahFormState {
  id: number | null;
  guideType: SunnahGuideType;
  stepOrder: number;
  title: string;
  titleEn: string;
  arabicText: string;
  latinText: string;
  translation: string;
  translationEn: string;
  dalilSource: string;
  dalilStatus: string;
  dalilText: string;
  dalilTextEn: string;
  tafsir: string;
  tafsirEn: string;
  isPublished: boolean;
}

export function createEmptySunnahForm(
  defaultGuideType: SunnahGuideType = 'sholat',
  defaultStepOrder = 1
): SunnahFormState {
  return {
    id: null,
    guideType: defaultGuideType,
    stepOrder: defaultStepOrder,
    title: '',
    titleEn: '',
    arabicText: '',
    latinText: '',
    translation: '',
    translationEn: '',
    dalilSource: '',
    dalilStatus: 'Shahih',
    dalilText: '',
    dalilTextEn: '',
    tafsir: '',
    tafsirEn: '',
    isPublished: true,
  };
}

export function sunnahToFormState(item: SunnahGuideItem): SunnahFormState {
  return {
    id: item.id,
    guideType: item.guideType,
    stepOrder: item.stepOrder,
    title: item.title,
    titleEn: item.titleEn || '',
    arabicText: item.arabicText || '',
    latinText: item.latinText || '',
    translation: item.translation,
    translationEn: item.translationEn || '',
    dalilSource: item.dalilSource || '',
    dalilStatus: item.dalilStatus || 'Shahih',
    dalilText: item.dalilText || '',
    dalilTextEn: item.dalilTextEn || '',
    tafsir: item.tafsir || '',
    tafsirEn: item.tafsirEn || '',
    isPublished: item.isPublished,
  };
}

interface SunnahEditorModalProps {
  open: boolean;
  initialItem?: SunnahGuideItem | null;
  defaultGuideType?: SunnahGuideType;
  defaultStepOrder?: number;
  authFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  onClose: () => void;
  onSaved: (message: string) => Promise<void> | void;
}

export function SunnahEditorModal({
  open,
  initialItem,
  defaultGuideType = 'sholat',
  defaultStepOrder = 1,
  authFetch,
  onClose,
  onSaved,
}: SunnahEditorModalProps) {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const [form, setForm] = useState<SunnahFormState>(() =>
    initialItem
      ? sunnahToFormState(initialItem)
      : createEmptySunnahForm(defaultGuideType, defaultStepOrder)
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setError(null);
    setForm(
      initialItem
        ? sunnahToFormState(initialItem)
        : createEmptySunnahForm(defaultGuideType, defaultStepOrder)
    );
  }, [open, initialItem, defaultGuideType, defaultStepOrder]);

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

    const parsed = createSunnahSchema.safeParse({
      guideType: form.guideType,
      stepOrder: form.stepOrder,
      title: form.title,
      titleEn: form.titleEn,
      arabicText: form.arabicText,
      latinText: form.latinText,
      translation: form.translation,
      translationEn: form.translationEn,
      dalilSource: form.dalilSource,
      dalilStatus: form.dalilStatus,
      dalilText: form.dalilText,
      dalilTextEn: form.dalilTextEn,
      tafsir: form.tafsir,
      tafsirEn: form.tafsirEn,
      isPublished: form.isPublished,
    });

    if (!parsed.success) {
      setError(
        parsed.error.issues[0]?.message ||
          (isEn ? 'Please review the Sunnah guide inputs.' : 'Periksa kembali input panduan sunnah.')
      );
      return;
    }

    setSubmitting(true);
    try {
      const isEdit = form.id !== null;
      const url = isEdit ? `/api/admin/sunnah/${form.id}` : '/api/admin/sunnah';
      const method = isEdit ? 'PATCH' : 'POST';
      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(
          data.error ||
            (isEn ? 'Failed to save Sunnah guide.' : 'Gagal menyimpan panduan sunnah.')
        );
      }

      const msg = isEdit
        ? isEn
          ? 'Sunnah guide updated.'
          : 'Panduan sunnah diperbarui.'
        : isEn
        ? 'New Sunnah guide added.'
        : 'Panduan sunnah baru ditambahkan.';
      await onSaved(msg);
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : isEn
          ? 'Failed to save Sunnah guide.'
          : 'Gagal menyimpan panduan sunnah.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sunnah-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="shadow-none rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] w-full max-w-2xl p-6 sm:p-8 my-8 space-y-5 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[var(--color-border)]/60">
          <h2 id="sunnah-modal-title" className="text-xl font-bold text-[var(--color-text-primary)]">
            {form.id
              ? isEn
                ? 'Edit Sunnah Guide'
                : 'Sunting Panduan Sunnah'
              : isEn
              ? 'Add Sunnah Guide'
              : 'Tambah Panduan Sunnah'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={isEn ? 'Close dialog' : 'Tutup dialog'}
            className="neu-outset-sm p-2 cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="s-type" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Guide Type *' : 'Jenis Panduan *'}
              </label>
              <select
                id="s-type"
                value={form.guideType}
                onChange={(e) =>
                  setForm((f) => ({ ...f, guideType: e.target.value as SunnahGuideType }))
                }
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
              >
                <option value="sholat">{isEn ? 'Prayer Guide' : 'Tata Cara Sholat'}</option>
                <option value="kebiasaan">{isEn ? 'Sunnah Habits' : 'Kebiasaan Sunnah'}</option>
              </select>
            </div>
            <div>
              <label htmlFor="s-order" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Step Order *' : 'Urutan Langkah *'}
              </label>
              <input
                id="s-order"
                type="number"
                min={1}
                max={200}
                required
                value={form.stepOrder}
                onChange={(e) =>
                  setForm((f) => ({ ...f, stepOrder: Math.max(1, Number(e.target.value) || 1) }))
                }
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="s-title" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Step Title (ID) *' : 'Judul Langkah (ID) *'}
              </label>
              <input
                id="s-title"
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
              />
            </div>
            <div>
              <label htmlFor="s-title-en" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'English Title (Optional)' : 'Judul Inggris (Opsional)'}
              </label>
              <input
                id="s-title-en"
                type="text"
                value={form.titleEn}
                onChange={(e) => setForm((f) => ({ ...f, titleEn: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="s-arabic" className="block text-xs font-semibold mb-1.5">
              {isEn ? 'Arabic Text (Optional)' : 'Bacaan Arab (Opsional)'}
            </label>
            <textarea
              id="s-arabic"
              rows={2}
              dir="rtl"
              value={form.arabicText}
              onChange={(e) => setForm((f) => ({ ...f, arabicText: e.target.value }))}
              className="neu-inset-sm w-full px-3.5 py-2.5 font-arabic text-xl focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="s-latin" className="block text-xs font-semibold mb-1.5">
              {isEn ? 'Latin Transliteration (Optional)' : 'Bacaan Latin (Opsional)'}
            </label>
            <textarea
              id="s-latin"
              rows={2}
              value={form.latinText}
              onChange={(e) => setForm((f) => ({ ...f, latinText: e.target.value }))}
              className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="s-translation" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Explanation / Translation (ID) *' : 'Penjelasan / Terjemahan (ID) *'}
              </label>
              <textarea
                id="s-translation"
                rows={3}
                required
                value={form.translation}
                onChange={(e) => setForm((f) => ({ ...f, translation: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="s-translation-en" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'English Explanation (Optional)' : 'Penjelasan Inggris (Opsional)'}
              </label>
              <textarea
                id="s-translation-en"
                rows={3}
                value={form.translationEn}
                onChange={(e) => setForm((f) => ({ ...f, translationEn: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="s-dalil-source" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Hadith / Quran Reference' : 'Rujukan Hadis / Al-Quran'}
              </label>
              <input
                id="s-dalil-source"
                type="text"
                value={form.dalilSource}
                onChange={(e) => setForm((f) => ({ ...f, dalilSource: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
              />
            </div>
            <div>
              <label htmlFor="s-dalil-status" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Narration Grade' : 'Status Riwayat'}
              </label>
              <input
                id="s-dalil-status"
                type="text"
                value={form.dalilStatus}
                onChange={(e) => setForm((f) => ({ ...f, dalilStatus: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="s-dalil-text" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Full Evidence Text (ID)' : 'Teks Dalil Lengkap (ID)'}
              </label>
              <textarea
                id="s-dalil-text"
                rows={3}
                value={form.dalilText}
                onChange={(e) => setForm((f) => ({ ...f, dalilText: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="s-dalil-text-en" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'English Evidence Text (Optional)' : 'Teks Dalil Inggris (Opsional)'}
              </label>
              <textarea
                id="s-dalil-text-en"
                rows={3}
                value={form.dalilTextEn}
                onChange={(e) => setForm((f) => ({ ...f, dalilTextEn: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="s-tafsir" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Tafsir & Fiqh Commentary (ID)' : 'Tafsir & Penjelasan Fiqih (ID)'}
              </label>
              <textarea
                id="s-tafsir"
                rows={2}
                value={form.tafsir}
                onChange={(e) => setForm((f) => ({ ...f, tafsir: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="s-tafsir-en" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'English Fiqh Commentary (Optional)' : 'Tafsir Fiqih Inggris (Opsional)'}
              </label>
              <textarea
                id="s-tafsir-en"
                rows={2}
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
                ? 'Publish immediately to the Sunnah page'
                : 'Langsung publikasikan ke halaman Sunnah'}
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
                ? 'Save Guide'
                : 'Simpan Panduan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
