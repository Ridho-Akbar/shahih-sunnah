'use client';

import { useAppContent } from '../../context/AppContentContext';
import { useLanguage } from '../../context/LanguageContext';
import { HadisPage } from '../../views/HadisPage';

export default function HadisRoutePage() {
  const { lang } = useLanguage();
  const { hadiths, categories, loading, error, bookmarks, toggleBookmark, loadPublicContent } =
    useAppContent();

  const resolvedError =
    error === '__LOAD_FAILED__'
      ? lang === 'en'
        ? 'Failed to load application content.'
        : 'Gagal memuat konten aplikasi.'
      : error;

  return (
    <HadisPage
      hadiths={hadiths}
      categories={categories}
      loading={loading}
      error={resolvedError}
      bookmarks={bookmarks}
      onToggleBookmark={toggleBookmark}
      onRetry={() => void loadPublicContent()}
      onDataChanged={loadPublicContent}
    />
  );
}
