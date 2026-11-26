'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Check,
  Eye,
  EyeOff,
  Pencil,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import type { BlogPost, Category } from '../lib/validations/content';
import { translateCategoryName } from '../lib/i18n';
import { stripHtmlToText } from '../lib/sanitizeHtml';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { trackBlogRead } from '../lib/api';
import { BlogEditorModal } from '../components/features/BlogEditorModal';
import { SafeBlogContent } from '../components/features/SafeBlogContent';
import { ResilientImage } from '../components/ui/ResilientImage';

interface BlogPageProps {
  blogs: BlogPost[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onDataChanged: () => Promise<void>;
}

export function BlogPage({
  blogs,
  categories,
  loading,
  error,
  onRetry,
  onDataChanged,
}: BlogPageProps) {
  const { lang, pick } = useLanguage();
  const isEn = lang === 'en';
  const { isAuthenticated, authFetch } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState<'all' | number>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePostId, setActivePostId] = useState<number | null>(null);

  // Admin CRUD state on BlogPage (active when admin is authenticated)
  const [adminBlogs, setAdminBlogs] = useState<BlogPost[] | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [crudMessage, setCrudMessage] = useState<string | null>(null);
  const [crudError, setCrudError] = useState<string | null>(null);

  const loadAdminBlogs = useCallback(async () => {
    if (!isAuthenticated) {
      setAdminBlogs(null);
      return;
    }
    try {
      const res = await authFetch('/api/admin/blogs');
      if (!res.ok) return;
      const data = (await res.json()) as { blogs: BlogPost[] };
      setAdminBlogs(data.blogs);
    } catch {
      // Fallback cleanly to public blogs
    }
  }, [authFetch, isAuthenticated]);

  useEffect(() => {
    void loadAdminBlogs();
  }, [loadAdminBlogs]);

  const displayedSourceBlogs = isAuthenticated && adminBlogs ? adminBlogs : blogs;

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
    const activeCatIds = new Set(displayedSourceBlogs.map((b) => b.categoryId));
    return categories.filter((c) => activeCatIds.has(c.id));
  }, [categories, displayedSourceBlogs]);

  const filteredBlogs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return displayedSourceBlogs.filter((post) => {
      if (selectedCategory !== 'all' && post.categoryId !== selectedCategory) {
        return false;
      }
      if (!q) return true;
      const plainExcerpt = stripHtmlToText(post.excerpt).toLowerCase();
      const plainExcerptEn = stripHtmlToText(post.excerptEn || '').toLowerCase();
      const plainContent = stripHtmlToText(post.content).toLowerCase();
      const plainContentEn = stripHtmlToText(post.contentEn || '').toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        (post.titleEn || '').toLowerCase().includes(q) ||
        plainExcerpt.includes(q) ||
        plainExcerptEn.includes(q) ||
        plainContent.includes(q) ||
        plainContentEn.includes(q) ||
        post.author.toLowerCase().includes(q)
      );
    });
  }, [displayedSourceBlogs, selectedCategory, searchQuery]);

  const activePost = useMemo(
    () => displayedSourceBlogs.find((b) => b.id === activePostId) || null,
    [displayedSourceBlogs, activePostId]
  );

  const handleOpenPost = (postId: number) => {
    setActivePostId(postId);
    void trackBlogRead(postId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCreate = () => {
    setCrudError(null);
    setEditingPost(null);
    setEditorOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setCrudError(null);
    setEditingPost(post);
    setEditorOpen(true);
  };

  const handleTogglePublish = async (post: BlogPost) => {
    setCrudError(null);
    try {
      const res = await authFetch(`/api/admin/blogs/${post.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !post.isPublished }),
      });
      if (!res.ok) {
        throw new Error(isEn ? 'Failed to update status.' : 'Gagal mengubah status artikel.');
      }
      await loadAdminBlogs();
      await onDataChanged();
      showCrudToast(
        !post.isPublished
          ? isEn
            ? 'Article published.'
            : 'Artikel dipublikasikan.'
          : isEn
          ? 'Article saved as draft.'
          : 'Artikel dijadikan draf.'
      );
    } catch (err) {
      setCrudError(
        err instanceof Error
          ? err.message
          : isEn
          ? 'Failed to update status.'
          : 'Gagal mengubah status artikel.'
      );
    }
  };

  const handleDeletePost = async (id: number) => {
    setCrudError(null);
    try {
      const res = await authFetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error(isEn ? 'Failed to delete article.' : 'Gagal menghapus artikel.');
      }
      setConfirmDeleteId(null);
      if (activePostId === id) {
        setActivePostId(null);
      }
      await loadAdminBlogs();
      await onDataChanged();
      showCrudToast(isEn ? 'Article deleted.' : 'Artikel berhasil dihapus.');
    } catch (err) {
      setCrudError(
        err instanceof Error
          ? err.message
          : isEn
          ? 'Failed to delete article.'
          : 'Gagal menghapus artikel.'
      );
    }
  };

  if (activePost) {
    const bodyText = pick(activePost.content, activePost.contentEn);
    const excerptText = pick(activePost.excerpt, activePost.excerptEn);

    const formattedDate = new Intl.DateTimeFormat(isEn ? 'en-US' : 'id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(activePost.createdAt));

    return (
      <article className="max-w-3xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setActivePostId(null)}
            className="neu-outset-sm inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer min-h-[40px]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>{isEn ? 'Back to Articles' : 'Kembali ke Daftar Artikel'}</span>
          </button>

          {isAuthenticated && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleOpenEdit(activePost)}
                className="neu-outset-sm inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-primary-600 dark:text-primary-400 cursor-pointer min-h-[40px]"
              >
                <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{isEn ? 'Edit Article' : 'Sunting Artikel'}</span>
              </button>

              {confirmDeleteId === activePost.id ? (
                <div className="inline-flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => void handleDeletePost(activePost.id)}
                    className="px-3.5 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold cursor-pointer min-h-[40px]"
                  >
                    {isEn ? 'Confirm Delete' : 'Konfirmasi Hapus'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteId(null)}
                    className="neu-outset-sm px-3 py-2 text-xs font-medium cursor-pointer min-h-[40px]"
                  >
                    {isEn ? 'Cancel' : 'Batal'}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmDeleteId(activePost.id)}
                  className="neu-outset-sm inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-red-600 dark:text-red-400 cursor-pointer min-h-[40px]"
                >
                  <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{isEn ? 'Delete' : 'Hapus'}</span>
                </button>
              )}
            </div>
          )}
        </div>

        <div className="neu-outset p-6 sm:p-10 space-y-6">
          {activePost.imageUrl && (
            <div className="overflow-hidden rounded-xl aspect-video">
              <ResilientImage
                src={activePost.imageUrl}
                alt={pick(activePost.title, activePost.titleEn)}
                fallbackLabel={categoryById.get(activePost.categoryId)?.name || 'Blog'}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <header className="pb-6 border-b border-[var(--color-border)]/60 space-y-3">
            <p className="text-xs font-medium text-[var(--color-text-secondary)] flex flex-wrap items-center gap-2">
              <span>
                {translateCategoryName(
                  categoryById.get(activePost.categoryId)?.name,
                  lang,
                  categoryById.get(activePost.categoryId)?.nameEn
                ) || (isEn ? 'Article' : 'Artikel')}
              </span>
              <span aria-hidden="true">·</span>
              <span>{activePost.author}</span>
              <span aria-hidden="true">·</span>
              <span>{formattedDate}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">
                {activePost.readingTimeMinutes} {isEn ? 'min read' : 'menit baca'}
              </span>
              {isAuthenticated && !activePost.isPublished && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-700 dark:text-amber-400 font-semibold">
                    {isEn ? 'Draft' : 'Draf'}
                  </span>
                </>
              )}
            </p>
            <h1
              className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              {pick(activePost.title, activePost.titleEn)}
            </h1>
            <SafeBlogContent content={excerptText} variant="excerpt" />
          </header>

          <SafeBlogContent content={bodyText} variant="article" className="max-w-prose" />
        </div>

        <BlogEditorModal
          open={editorOpen}
          initialPost={editingPost}
          categories={categories}
          authFetch={authFetch}
          onClose={() => setEditorOpen(false)}
          onSaved={async (msg) => {
            await loadAdminBlogs();
            await onDataChanged();
            showCrudToast(msg);
          }}
        />
      </article>
    );
  }

  return (
    <div className="space-y-8">
      <div className="neu-outset p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-wide text-primary-600 dark:text-primary-400">
              {isEn ? 'Essays & Prophetic Methodology' : 'Artikel & Kajian Ringkas'}
            </p>
            <h1 className="mt-1.5 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
              Blog Shahih Sunnah
            </h1>
            <p className="mt-2 font-prose text-base text-[var(--color-text-secondary)] max-w-prose">
              {isEn
                ? 'In-depth writings on dhikr virtues, hadith understanding, and daily worship based on the Quran and authentic Sunnah.'
                : 'Bacaan mendalam seputar keutamaan zikir, pemahaman hadis, dan tuntunan ibadah harian sesuai sunnah.'}
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
                placeholder={isEn ? 'Search title or author...' : 'Cari judul atau penulis...'}
                aria-label={isEn ? 'Search blog articles' : 'Cari artikel blog'}
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
                <span>{isEn ? 'Write Article' : 'Tulis Artikel'}</span>
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

        {/* Category Filter Tabs */}
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
            {isEn ? 'All' : 'Semua'} ({displayedSourceBlogs.length})
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
        </div>
      </div>

      {/* Article List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" aria-busy="true">
          {[1, 2, 3].map((item) => (
            <div key={item} className="neu-outset p-8 animate-pulse space-y-4">
              <div className="h-4 w-1/3 rounded bg-[var(--color-border)]/50" />
              <div className="h-6 w-3/4 rounded bg-[var(--color-border)]/50" />
              <div className="h-20 w-full rounded bg-[var(--color-border)]/40" />
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
      ) : filteredBlogs.length === 0 ? (
        <div className="neu-outset p-10 text-center space-y-3">
          <BookOpen className="w-8 h-8 mx-auto text-[var(--color-text-secondary)]" aria-hidden="true" />
          <p className="text-base font-semibold text-[var(--color-text-primary)]">
            {isEn ? 'No matching articles found' : 'Belum ada artikel yang sesuai'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="neu-outset-sm px-4 py-2 text-xs font-semibold text-primary-600 dark:text-primary-400 cursor-pointer"
          >
            {isEn ? 'Show All Articles' : 'Tampilkan Semua Artikel'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredBlogs.map((post) => {
            const formattedDate = new Intl.DateTimeFormat(isEn ? 'en-US' : 'id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }).format(new Date(post.createdAt));

            return (
              <article key={post.id} className="neu-outset p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  {post.imageUrl && (
                    <div className="overflow-hidden rounded-xl aspect-video">
                      <ResilientImage
                        src={post.imageUrl}
                        alt={pick(post.title, post.titleEn)}
                        fallbackLabel={categoryById.get(post.categoryId)?.name || 'Blog'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-medium text-[var(--color-text-secondary)] flex flex-wrap items-center gap-2">
                      <span>
                        {translateCategoryName(
                          categoryById.get(post.categoryId)?.name,
                          lang,
                          categoryById.get(post.categoryId)?.nameEn
                        ) || (isEn ? 'Article' : 'Artikel')}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{post.author}</span>
                      <span aria-hidden="true">·</span>
                      <span>{formattedDate}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">
                        {post.readingTimeMinutes} {isEn ? 'min' : 'mnt'}
                      </span>
                      {isAuthenticated && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span
                            className={
                              post.isPublished
                                ? 'text-primary-600 dark:text-primary-400 font-semibold'
                                : 'text-amber-700 dark:text-amber-400 font-semibold'
                            }
                          >
                            {post.isPublished
                              ? isEn
                                ? 'Published'
                                : 'Terbit'
                              : isEn
                              ? 'Draft'
                              : 'Draf'}
                          </span>
                        </>
                      )}
                    </p>
                    <h2 className="mt-3 text-xl font-bold text-[var(--color-text-primary)] leading-snug">
                      {pick(post.title, post.titleEn)}
                    </h2>
                    <SafeBlogContent
                      content={pick(post.excerpt, post.excerptEn)}
                      variant="excerpt"
                      className="mt-3"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--color-border)]/60 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => handleOpenPost(post.id)}
                    className="neu-outset-sm inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors cursor-pointer min-h-[40px]"
                  >
                    <span>{isEn ? 'Read Article' : 'Baca Artikel'}</span>
                  </button>

                  {isAuthenticated && (
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => void handleTogglePublish(post)}
                        aria-label={post.isPublished ? (isEn ? 'Set Draft' : 'Jadikan Draf') : (isEn ? 'Publish' : 'Publikasikan')}
                        className="neu-outset-sm inline-flex items-center gap-1 px-2.5 py-2 text-xs font-medium text-[var(--color-text-primary)] cursor-pointer min-h-[36px]"
                      >
                        {post.isPublished ? (
                          <EyeOff className="w-3.5 h-3.5" aria-hidden="true" />
                        ) : (
                          <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenEdit(post)}
                        className="neu-outset-sm inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-[var(--color-text-primary)] cursor-pointer min-h-[36px]"
                      >
                        <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{isEn ? 'Edit' : 'Sunting'}</span>
                      </button>

                      {confirmDeleteId === post.id ? (
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => void handleDeletePost(post.id)}
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
                          onClick={() => setConfirmDeleteId(post.id)}
                          aria-label={isEn ? 'Delete article' : 'Hapus artikel'}
                          className="neu-outset-sm inline-flex items-center gap-1 px-2.5 py-2 text-xs font-medium text-red-600 dark:text-red-400 cursor-pointer min-h-[36px]"
                        >
                          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <BlogEditorModal
        open={editorOpen}
        initialPost={editingPost}
        categories={categories}
        authFetch={authFetch}
        onClose={() => setEditorOpen(false)}
        onSaved={async (msg) => {
          await loadAdminBlogs();
          await onDataChanged();
          showCrudToast(msg);
        }}
      />
    </div>
  );
}
