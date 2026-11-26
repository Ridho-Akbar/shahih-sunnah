'use client';

import { useAppContent } from '../../context/AppContentContext';
import { useLanguage } from '../../context/LanguageContext';
import { SunnahPage } from '../../views/SunnahPage';

export default function SunnahRoutePage() {
  const { lang } = useLanguage();
  const { sunnahGuides, loading, error, loadPublicContent } = useAppContent();

  const resolvedError =
    error === '__LOAD_FAILED__'
      ? lang === 'en'
        ? 'Failed to load application content.'
        : 'Gagal memuat konten aplikasi.'
      : error;

  return (
    <SunnahPage
      sunnahGuides={sunnahGuides}
      loading={loading}
      error={resolvedError}
      onRetry={() => void loadPublicContent()}
      onDataChanged={loadPublicContent}
    />
  );
}
