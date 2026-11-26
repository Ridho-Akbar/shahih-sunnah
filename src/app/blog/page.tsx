'use client';

import { useAppContent } from '../../context/AppContentContext';
import { useLanguage } from '../../context/LanguageContext';
import { BlogPage } from '../../views/BlogPage';

export default function BlogRoutePage() {
  const { lang } = useLanguage();
  const { blogs, categories, loading, error, loadPublicContent } = useAppContent();

  const resolvedError =
    error === '__LOAD_FAILED__'
      ? lang === 'en'
        ? 'Failed to load application content.'
        : 'Gagal memuat konten aplikasi.'
      : error;

  return (
    <BlogPage
      blogs={blogs}
      categories={categories}
      loading={loading}
      error={resolvedError}
      onRetry={() => void loadPublicContent()}
      onDataChanged={loadPublicContent}
    />
  );
}
