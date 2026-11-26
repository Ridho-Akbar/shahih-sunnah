'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translateCategoryName } from '../../lib/i18n';
import {
  createHadithSchema,
  type Category,
  type Hadith,
} from '../../lib/validations/content';

export interface HadithFormState {
  id: number | null;
  categoryId: number;
  title: string;
  titleEn: string;
  arabicText: string;
  latinText: string;
  translation: string;
  translationEn: string;
  source: string;
  narrator: string;
  dalilStatus: string;
  dalilText: string;
  dalilTextEn: string;
  tafsir: string;
  tafsirEn: string;
  isPublished: boolean;
}

export function createEmptyHadithForm(defaultCategoryId: number): HadithFormState {
  return {
    id: null,
    categoryId: defaultCategoryId,
    title: '',
    titleEn: '',
    arabicText: '',
    latinText: '',
    translation: '',
    translationEn: '',
    source: '',
    narrator: '',
    dalilStatus: 'Shahih',
    dalilText: '',
    dalilTextEn: '',
    tafsir: '',
    tafsirEn: '',
    isPublished: true,
  };
}

export function hadithToFormState(item: Hadith): HadithFormState {
  return {
    id: item.id,
    categoryId: item.categoryId,
    title: item.title,
    titleEn: item.titleEn || '',
    arabicText: item.arabicText || '',
    latinText: item.latinText || '',
    translation: item.translation,
    translationEn: item.translationEn || '',
    source: item.source || '',
    narrator: item.narrator || '',
    dalilStatus: item.dalilStatus || 'Shahih',
    dalilText: item.dalilText || '',
    dalilTextEn: item.dalilTextEn || '',
    tafsir: item.tafsir || '',
    tafsirEn: item.tafsirEn || '',
    isPublished: item.isPublished,
  };
}

interface HadithEditorModalProps {
  open: boolean;
  initialHadith?: Hadith | null;
  categories: Category[];
  authFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  onClose: () => void;
  onSaved: (message: string) => Promise<void> | void;
}

export function HadithEditorModal({
  open,
  initialHadith,
  categories,
  authFetch,
  onClose,
  onSaved,
}: HadithEditorModalProps) {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const [form, setForm] = useState<HadithFormState>(() =>
    initialHadith
      ? hadithToFormState(initialHadith)
      : createEmptyHadithForm(categories[0]?.id ?? 1)
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setError(null);
    setForm(
      initialHadith
        ? hadithToFormState(initialHadith)
        : createEmptyHadithForm(categories[0]?.id ?? 1)
    );
  }, [open, initialHadith, categories]);

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

    const parsed = createHadithSchema.safeParse({
      categoryId: form.categoryId,
      title: form.title,
      titleEn: form.titleEn,
      arabicText: form.arabicText,
      latinText: form.latinText,
      translation: form.translation,
      translationEn: form.translationEn,
      source: form.source,
      narrator: form.narrator,
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
          (isEn ? 'Please review the hadith inputs.' : 'Periksa kembali input hadis.')
      );
      return;
    }

    setSubmitting(true);
    try {
      const isEdit = form.id !== null;
      const url = isEdit ? `/api/admin/hadiths/${form.id}` : '/api/admin/hadiths';
      const method = isEdit ? 'PATCH' : 'POST';
      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(
          data.error || (isEn ? 'Failed to save hadith.' : 'Gagal menyimpan hadis.')
        );
      }

      const msg = isEdit
        ? isEn
          ? 'Hadith updated successfully.'
          : 'Hadis berhasil diperbarui.'
        : isEn
        ? 'New hadith added successfully.'
        : 'Hadis baru berhasil ditambahkan.';
      await onSaved(msg);
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : isEn
          ? 'Failed to save hadith.'
          : 'Gagal menyimpan hadis.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="hadith-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="shadow-none rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] w-full max-w-2xl p-6 sm:p-8 my-8 space-y-5 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[var(--color-border)]/60">
          <h2 id="hadith-modal-title" className="text-xl font-bold text-[var(--color-text-primary)]">
            {form.id
              ? isEn
                ? 'Edit Hadith'
                : 'Sunting Hadis'
              : isEn
              ? 'Add New Hadith'
              : 'Tambah Hadis Baru'}
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
              <label htmlFor="h-title" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Hadith Title (ID) *' : 'Judul Hadis (ID) *'}
              </label>
              <input
                id="h-title"
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
              />
            </div>
            <div>
              <label htmlFor="h-title-en" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'English Title (Optional)' : 'Judul Inggris (Opsional)'}
              </label>
              <input
                id="h-title-en"
                type="text"
                value={form.titleEn}
                onChange={(e) => setForm((f) => ({ ...f, titleEn: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="h-category" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Category *' : 'Kategori *'}
              </label>
              <select
                id="h-category"
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
              <label htmlFor="h-status" className="block text-xs font-semibold mb-1.5">
                {isEn
                  ? "Authenticity Grade (Sahih / Hasan / Muttafaqun 'Alayh) *"
                  : "Status Kesahihan (Shahih / Hasan / Muttafaqun 'Alaih) *"}
              </label>
              <input
                id="h-status"
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

          <div>
            <label htmlFor="h-arabic" className="block text-xs font-semibold mb-1.5">
              {isEn ? 'Arabic Text (Matan)' : 'Matan Arab'}
            </label>
            <textarea
              id="h-arabic"
              rows={3}
              dir="rtl"
              value={form.arabicText}
              onChange={(e) => setForm((f) => ({ ...f, arabicText: e.target.value }))}
              className="neu-inset-sm w-full px-3.5 py-2.5 font-arabic text-xl focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="h-latin" className="block text-xs font-semibold mb-1.5">
              {isEn ? 'Latin Transliteration' : 'Bacaan Latin'}
            </label>
            <textarea
              id="h-latin"
              rows={2}
              value={form.latinText}
              onChange={(e) => setForm((f) => ({ ...f, latinText: e.target.value }))}
              className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="h-translation" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Translation (ID) *' : 'Terjemahan (ID) *'}
              </label>
              <textarea
                id="h-translation"
                rows={3}
                required
                value={form.translation}
                onChange={(e) => setForm((f) => ({ ...f, translation: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="h-translation-en" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'English Translation (Optional)' : 'Terjemahan Inggris (Opsional)'}
              </label>
              <textarea
                id="h-translation-en"
                rows={3}
                value={form.translationEn}
                onChange={(e) => setForm((f) => ({ ...f, translationEn: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="h-source" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Source Book / Takhrij' : 'Sumber Kitab / Takhrij'}
              </label>
              <input
                id="h-source"
                type="text"
                value={form.source}
                onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}
                placeholder={
                  isEn
                    ? 'e.g., HR. Al-Bukhari no. 1 & Imam Muslim no. 1907'
                    : 'Contoh: HR. Al-Bukhari no. 1 & Imam Muslim no. 1907'
                }
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
              />
            </div>
            <div>
              <label htmlFor="h-narrator" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Companion / Narrator' : 'Sahabat / Perawi'}
              </label>
              <input
                id="h-narrator"
                type="text"
                value={form.narrator}
                onChange={(e) => setForm((f) => ({ ...f, narrator: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="h-dalil-text" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Primary Evidence & Takhrij (ID)' : 'Keterangan Dalil Asal & Takhrij (ID)'}
              </label>
              <textarea
                id="h-dalil-text"
                rows={3}
                value={form.dalilText}
                onChange={(e) => setForm((f) => ({ ...f, dalilText: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="h-dalil-text-en" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'English Evidence & Takhrij (Optional)' : 'Dalil Asal Inggris (Opsional)'}
              </label>
              <textarea
                id="h-dalil-text-en"
                rows={3}
                value={form.dalilTextEn}
                onChange={(e) => setForm((f) => ({ ...f, dalilTextEn: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="h-tafsir" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Tafsir & Scholarly Commentary (ID)' : 'Tafsir & Penjelasan Ulama (ID)'}
              </label>
              <textarea
                id="h-tafsir"
                rows={3}
                value={form.tafsir}
                onChange={(e) => setForm((f) => ({ ...f, tafsir: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="h-tafsir-en" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'English Tafsir & Commentary (Optional)' : 'Tafsir Inggris (Opsional)'}
              </label>
              <textarea
                id="h-tafsir-en"
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
                ? 'Publish immediately to the Hadith page'
                : 'Langsung publikasikan ke halaman Hadis'}
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
                ? 'Save Hadith'
                : 'Simpan Hadis'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
