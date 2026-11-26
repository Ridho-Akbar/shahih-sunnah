'use client';

import { useAppContent } from '../../context/AppContentContext';
import { AdminHadisPage } from '../../views/AdminHadisPage';

export default function AdminRoutePage() {
  const { categories, loadPublicContent } = useAppContent();
  return <AdminHadisPage categories={categories} onDataChanged={loadPublicContent} />;
}
