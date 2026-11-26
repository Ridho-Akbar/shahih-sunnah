'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { Code2, Eye, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translateCategoryName } from '../../lib/i18n';
import {
  createBlogSchema,
  type BlogPost,
  type Category,
} from '../../lib/validations/content';
import { SafeBlogContent } from './SafeBlogContent';

export interface BlogFormState {
  id: number | null;
  categoryId: number;
  title: string;
  titleEn: string;
  slug: string;
  imageUrl: string;
  excerpt: string;
  excerptEn: string;
  content: string;
  contentEn: string;
  author: string;
  readingTimeMinutes: number;
  isPublished: boolean;
}

export function createEmptyBlogForm(defaultCategoryId: number): BlogFormState {
  return {
    id: null,
    categoryId: defaultCategoryId,
    title: '',
    titleEn: '',
    slug: '',
    imageUrl: '',
    excerpt: '',
    excerptEn: '',
    content: '',
    contentEn: '',
    author: 'Tim Redaksi Shahih Sunnah',
    readingTimeMinutes: 4,
    isPublished: true,
  };
}

export function blogPostToFormState(post: BlogPost): BlogFormState {
  return {
    id: post.id,
    categoryId: post.categoryId,
    title: post.title,
    titleEn: post.titleEn || '',
    slug: post.slug,
    imageUrl: post.imageUrl || '',
    excerpt: post.excerpt,
    excerptEn: post.excerptEn || '',
    content: post.content,
    contentEn: post.contentEn || '',
    author: post.author,
    readingTimeMinutes: post.readingTimeMinutes,
    isPublished: post.isPublished,
  };
}

interface BlogEditorModalProps {
  open: boolean;
  initialPost?: BlogPost | null;
  categories: Category[];
  authFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  onClose: () => void;
  onSaved: (message: string) => Promise<void> | void;
}

export function BlogEditorModal({
  open,
  initialPost,
  categories,
  authFetch,
  onClose,
  onSaved,
}: BlogEditorModalProps) {
  const { lang } = useLanguage();
  const isEn = lang === 'en';

  const [form, setForm] = useState<BlogFormState>(() =>
    initialPost
      ? blogPostToFormState(initialPost)
      : createEmptyBlogForm(categories[0]?.id ?? 1)
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewExcerpt, setPreviewExcerpt] = useState(false);
  const [previewContent, setPreviewContent] = useState(false);

  useEffect(() => {
    if (!open) return;
    setError(null);
    setPreviewExcerpt(false);
    setPreviewContent(false);
    setForm(
      initialPost
        ? blogPostToFormState(initialPost)
        : createEmptyBlogForm(categories[0]?.id ?? 1)
    );
  }, [open, initialPost, categories]);

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

  const insertSectionSnippet = (
    field: 'excerpt' | 'excerptEn' | 'content' | 'contentEn'
  ) => {
    setForm((prev) => {
      const current = prev[field].trim();
      if (!current) {
        const snippet =
          field === 'excerpt' || field === 'excerptEn'
            ? isEn && field === 'excerptEn'
              ? '<section class="space-y-2">\n  <p>Write a concise article description inside <strong>section</strong> here.</p>\n</section>'
              : '<section class="space-y-2">\n  <p>Tulis deskripsi atau ringkasan artikel di dalam bungkus <strong>section</strong> ini.</p>\n</section>'
            : isEn && field === 'contentEn'
            ? '<section class="space-y-3">\n  <h2>Main Discussion</h2>\n  <p>Write the article body with HTML markup inside <strong>section</strong>.</p>\n  <ul>\n    <li>Authentic evidence point 1</li>\n    <li>Authentic evidence point 2</li>\n  </ul>\n</section>'
            : '<section class="space-y-3">\n  <h2>Pembahasan Utama</h2>\n  <p>Tulis isi artikel dengan tag HTML di dalam bungkus <strong>section</strong>.</p>\n  <ul>\n    <li>Poin faedah dalil pertama</li>\n    <li>Poin faedah dalil kedua</li>\n  </ul>\n</section>';
        return { ...prev, [field]: snippet };
      }
      if (/^<section\b/i.test(current)) {
        return prev;
      }
      return {
        ...prev,
        [field]: `<section class="space-y-2">\n  <p>${current}</p>\n</section>`,
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const slug =
      form.slug.trim() ||
      form.title
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    const parsed = createBlogSchema.safeParse({
      categoryId: form.categoryId,
      title: form.title,
      titleEn: form.titleEn,
      slug,
      imageUrl: form.imageUrl,
      excerpt: form.excerpt,
      excerptEn: form.excerptEn,
      content: form.content,
      contentEn: form.contentEn,
      author: form.author,
      readingTimeMinutes: form.readingTimeMinutes,
      isPublished: form.isPublished,
    });

    if (!parsed.success) {
      setError(
        parsed.error.issues[0]?.message ||
          (isEn ? 'Please review the article inputs.' : 'Periksa kembali input artikel.')
      );
      return;
    }

    setSubmitting(true);
    try {
      const isEdit = form.id !== null;
      const url = isEdit ? `/api/admin/blogs/${form.id}` : '/api/admin/blogs';
      const method = isEdit ? 'PATCH' : 'POST';
      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(
          data.error || (isEn ? 'Failed to save article.' : 'Gagal menyimpan artikel.')
        );
      }

      const msg = isEdit
        ? isEn
          ? 'Article updated successfully.'
          : 'Artikel berhasil diperbarui.'
        : isEn
        ? 'New article published successfully.'
        : 'Artikel baru berhasil ditambahkan.';
      await onSaved(msg);
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : isEn
          ? 'Failed to save article.'
          : 'Gagal menyimpan artikel.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="blog-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="shadow-none rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] w-full max-w-3xl p-6 sm:p-8 my-8 space-y-5 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[var(--color-border)]/60">
          <h2 id="blog-modal-title" className="text-xl font-bold text-[var(--color-text-primary)]">
            {form.id
              ? isEn
                ? 'Edit Blog Article'
                : 'Sunting Artikel Blog'
              : isEn
              ? 'Write New Blog Article'
              : 'Tulis Artikel Blog Baru'}
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

        <div className="neu-inset-sm p-3.5 text-xs text-[var(--color-text-secondary)] leading-relaxed">
          <strong className="text-[var(--color-text-primary)]">
            {isEn ? 'HTML <section> Support:' : 'Dukungan HTML <section>:'}
          </strong>{' '}
          {isEn
            ? 'Both Description and Article Content support plain text or HTML code wrapped starting with <section>...</section> (e.g., <h2>, <h3>, <p>, <ul>, <li>, <blockquote>, <strong>, <a>). Unsafe scripts/attributes are automatically filtered.'
            : 'Kolom Deskripsi (Ringkasan) dan Isi Artikel mendukung teks biasa maupun kode HTML dengan bungkus awal <section>...</section> (misalnya <h2>, <h3>, <p>, <ul>, <li>, <blockquote>, <strong>, <a>). Skrip dan atribut berbahaya disaring otomatis.'}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="b-title" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Article Title (ID) *' : 'Judul Artikel (ID) *'}
              </label>
              <input
                id="b-title"
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
              />
            </div>
            <div>
              <label htmlFor="b-title-en" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'English Title (Optional)' : 'English Title (Opsional)'}
              </label>
              <input
                id="b-title-en"
                type="text"
                value={form.titleEn}
                onChange={(e) => setForm((f) => ({ ...f, titleEn: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="b-category" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Category *' : 'Kategori *'}
              </label>
              <select
                id="b-category"
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
              <label htmlFor="b-author" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Author *' : 'Penulis *'}
              </label>
              <input
                id="b-author"
                type="text"
                required
                value={form.author}
                onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
              />
            </div>

            <div>
              <label htmlFor="b-time" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Reading Time (min)' : 'Estimasi Baca (mnt)'}
              </label>
              <input
                id="b-time"
                type="number"
                min={1}
                max={60}
                required
                value={form.readingTimeMinutes}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    readingTimeMinutes: Math.max(1, Number(e.target.value) || 1),
                  }))
                }
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="b-slug" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'URL Slug (optional)' : 'Slug URL (opsional)'}
              </label>
              <input
                id="b-slug"
                type="text"
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                placeholder={isEn ? 'auto-from-title' : 'otomatis-dari-judul'}
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
              />
            </div>

            <div>
              <label htmlFor="b-image-url" className="block text-xs font-semibold mb-1.5">
                {isEn ? 'Image URL (Thumbnail & Detail Hero)' : 'URL Gambar (Thumbnail & Hero Detail)'}
              </label>
              <input
                id="b-image-url"
                type="text"
                value={form.imageUrl}
                onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
                placeholder={
                  isEn ? 'https://... or /images/...' : 'https://... atau /images/...'
                }
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm focus:outline-none min-h-[42px]"
              />
            </div>
          </div>

          {/* Description / Excerpt (ID) with <section> HTML helper & live preview */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label htmlFor="b-excerpt" className="block text-xs font-semibold">
                {isEn
                  ? 'Description / Excerpt (ID · Supports <section> HTML) *'
                  : 'Deskripsi / Ringkasan (ID · Mendukung HTML <section>) *'}
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => insertSectionSnippet('excerpt')}
                  className="neu-outset-sm inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-primary-600 dark:text-primary-400 cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{isEn ? 'Wrap <section>' : 'Sisipkan <section>'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewExcerpt((v) => !v)}
                  className="neu-outset-sm inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[var(--color-text-secondary)] cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>
                    {previewExcerpt
                      ? isEn
                        ? 'Code'
                        : 'Kode'
                      : isEn
                      ? 'Preview'
                      : 'Pratinjau'}
                  </span>
                </button>
              </div>
            </div>

            {previewExcerpt ? (
              <div className="neu-inset-sm p-4 min-h-[86px]">
                {form.excerpt.trim() ? (
                  <SafeBlogContent content={form.excerpt} variant="excerpt" />
                ) : (
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {isEn ? 'Nothing to preview yet.' : 'Belum ada deskripsi untuk dipratinjau.'}
                  </p>
                )}
              </div>
            ) : (
              <textarea
                id="b-excerpt"
                rows={3}
                required
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                placeholder="<section class='space-y-2'><p>Tulis deskripsi atau sisipkan kode HTML dengan bungkus awal &lt;section&gt;...</p></section>"
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm font-mono focus:outline-none"
              />
            )}
          </div>

          {/* English Excerpt */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label htmlFor="b-excerpt-en" className="block text-xs font-semibold">
                {isEn
                  ? 'English Description / Excerpt (Optional · Supports <section> HTML)'
                  : 'Deskripsi Inggris (Opsional · Mendukung HTML <section>)'}
              </label>
              <button
                type="button"
                onClick={() => insertSectionSnippet('excerptEn')}
                className="neu-outset-sm inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-primary-600 dark:text-primary-400 cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{isEn ? 'Wrap <section>' : 'Sisipkan <section>'}</span>
              </button>
            </div>
            <textarea
              id="b-excerpt-en"
              rows={2}
              value={form.excerptEn}
              onChange={(e) => setForm((f) => ({ ...f, excerptEn: e.target.value }))}
              className="neu-inset-sm w-full px-3.5 py-2.5 text-sm font-mono focus:outline-none"
            />
          </div>

          {/* Full Article Content (ID) with <section> HTML helper & live preview */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label htmlFor="b-content" className="block text-xs font-semibold">
                {isEn
                  ? 'Article Content (ID · Supports <section> HTML) *'
                  : 'Isi Artikel Lengkap (ID · Mendukung HTML <section>) *'}
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => insertSectionSnippet('content')}
                  className="neu-outset-sm inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-primary-600 dark:text-primary-400 cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{isEn ? 'Insert <section>' : 'Sisipkan <section>'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewContent((v) => !v)}
                  className="neu-outset-sm inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[var(--color-text-secondary)] cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>
                    {previewContent
                      ? isEn
                        ? 'Code'
                        : 'Kode'
                      : isEn
                      ? 'Preview'
                      : 'Pratinjau'}
                  </span>
                </button>
              </div>
            </div>

            {previewContent ? (
              <div className="neu-inset-sm p-4 min-h-[140px] max-h-72 overflow-y-auto">
                {form.content.trim() ? (
                  <SafeBlogContent content={form.content} variant="article" />
                ) : (
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {isEn ? 'Nothing to preview yet.' : 'Belum ada isi artikel untuk dipratinjau.'}
                  </p>
                )}
              </div>
            ) : (
              <textarea
                id="b-content"
                rows={6}
                required
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                placeholder="<section class='space-y-3'><h2>Subjudul</h2><p>Isi pembahasan artikel...</p></section>"
                className="neu-inset-sm w-full px-3.5 py-2.5 text-sm font-mono focus:outline-none"
              />
            )}
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label htmlFor="b-content-en" className="block text-xs font-semibold">
                {isEn
                  ? 'English Content (Optional · Supports <section> HTML)'
                  : 'Isi Artikel Inggris (Opsional · Mendukung HTML <section>)'}
              </label>
              <button
                type="button"
                onClick={() => insertSectionSnippet('contentEn')}
                className="neu-outset-sm inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-primary-600 dark:text-primary-400 cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{isEn ? 'Insert <section>' : 'Sisipkan <section>'}</span>
              </button>
            </div>
            <textarea
              id="b-content-en"
              rows={3}
              value={form.contentEn}
              onChange={(e) => setForm((f) => ({ ...f, contentEn: e.target.value }))}
              className="neu-inset-sm w-full px-3.5 py-2.5 text-sm font-mono focus:outline-none"
            />
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
                ? 'Publish immediately to the Blog page'
                : 'Langsung publikasikan ke halaman Blog'}
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
                ? 'Save Article'
                : 'Simpan Artikel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
