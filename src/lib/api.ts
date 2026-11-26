import {
  trackBlogReadAction,
  trackSiteVisitAction,
  trackZikirCompleteAction,
} from '../app/actions';
import type {
  BlogPost,
  Category,
  Hadith,
  PublicLeaderboardUser,
  ScholarFigure,
  SunnahGuideItem,
  SunnahGuideType,
  TimeOfDay,
  Zikir,
} from './validations/content';

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch('/api/categories');
  if (!res.ok) {
    throw new Error('Gagal memuat daftar kategori.');
  }
  const data = (await res.json()) as { categories: Category[] };
  return data.categories;
}

export async function fetchZikrs(timeOfDay?: TimeOfDay): Promise<Zikir[]> {
  const query = timeOfDay ? `?timeOfDay=${encodeURIComponent(timeOfDay)}` : '';
  const res = await fetch(`/api/zikrs${query}`);
  if (!res.ok) {
    throw new Error('Gagal memuat kumpulan zikir.');
  }
  const data = (await res.json()) as { zikrs: Zikir[] };
  return data.zikrs;
}

export async function fetchHadiths(categoryId?: number): Promise<Hadith[]> {
  const query = categoryId ? `?categoryId=${encodeURIComponent(String(categoryId))}` : '';
  const res = await fetch(`/api/hadiths${query}`);
  if (!res.ok) {
    throw new Error('Gagal memuat koleksi hadis.');
  }
  const data = (await res.json()) as { hadiths: Hadith[] };
  return data.hadiths;
}

export async function fetchBlogs(categoryId?: number): Promise<BlogPost[]> {
  const query = categoryId ? `?categoryId=${encodeURIComponent(String(categoryId))}` : '';
  const res = await fetch(`/api/blogs${query}`);
  if (!res.ok) {
    throw new Error('Gagal memuat artikel blog.');
  }
  const data = (await res.json()) as { blogs: BlogPost[] };
  return data.blogs;
}

export async function fetchSunnahGuides(guideType?: SunnahGuideType): Promise<SunnahGuideItem[]> {
  const query = guideType ? `?guideType=${encodeURIComponent(guideType)}` : '';
  const res = await fetch(`/api/sunnah${query}`);
  if (!res.ok) {
    throw new Error('Gagal memuat panduan sunnah.');
  }
  const data = (await res.json()) as { sunnahGuides: SunnahGuideItem[] };
  return data.sunnahGuides;
}

export async function fetchFigures(): Promise<ScholarFigure[]> {
  const res = await fetch('/api/figures');
  if (!res.ok) {
    throw new Error('Gagal memuat daftar tokoh dan perawi.');
  }
  const data = (await res.json()) as { figures: ScholarFigure[] };
  return data.figures;
}

export async function fetchLeaderboard(): Promise<PublicLeaderboardUser[]> {
  const res = await fetch('/api/leaderboard');
  if (!res.ok) {
    throw new Error('Gagal memuat papan peringkat.');
  }
  const data = (await res.json()) as { leaderboard: PublicLeaderboardUser[] };
  return data.leaderboard;
}

export async function trackSiteVisit(): Promise<void> {
  try {
    await trackSiteVisitAction();
  } catch {
    // Non-blocking analytics
  }
}

export async function trackBlogRead(blogId: number): Promise<void> {
  try {
    await trackBlogReadAction(blogId);
  } catch {
    // Non-blocking analytics
  }
}

export async function trackZikirComplete(): Promise<void> {
  try {
    await trackZikirCompleteAction();
  } catch {
    // Non-blocking analytics
  }
}
