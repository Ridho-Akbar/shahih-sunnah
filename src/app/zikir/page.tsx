'use client';

import { useAppContent } from '../../context/AppContentContext';
import { useLanguage } from '../../context/LanguageContext';
import { ZikirPage } from '../../views/ZikirPage';

export default function ZikirRoutePage() {
  const { lang } = useLanguage();
  const { zikrs, categories, loading, error, zikirTab, setZikirTab, loadPublicContent } =
    useAppContent();

  const resolvedError =
    error === '__LOAD_FAILED__'
      ? lang === 'en'
        ? 'Failed to load application content.'
        : 'Gagal memuat konten aplikasi.'
      : error;

  return (
    <ZikirPage
      zikrs={zikrs}
      categories={categories}
      loading={loading}
      error={resolvedError}
      activeTab={zikirTab}
      onChangeTab={setZikirTab}
      onRetry={() => void loadPublicContent()}
      onDataChanged={loadPublicContent}
    />
  );
}
