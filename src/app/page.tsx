'use client';

import { useRouter } from 'next/navigation';
import { useAppContent } from '../context/AppContentContext';
import type { TimeOfDay } from '../lib/validations/content';
import { HomePage } from '../views/HomePage';

export default function HomeRoutePage() {
  const router = useRouter();
  const { zikrs, hadiths, blogs, categories, bookmarks, toggleBookmark, setZikirTab } =
    useAppContent();

  return (
    <HomePage
      zikrs={zikrs}
      hadiths={hadiths}
      blogs={blogs}
      categories={categories}
      bookmarks={bookmarks}
      onToggleBookmark={toggleBookmark}
      onNavigate={(path, preferredZikirTime?: TimeOfDay) => {
        if (preferredZikirTime) {
          setZikirTab(preferredZikirTime);
        }
        router.push(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    />
  );
}
