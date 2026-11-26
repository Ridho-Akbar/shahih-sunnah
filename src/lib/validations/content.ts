import { z } from 'zod';

export type TimeOfDay = 'pagi' | 'petang' | 'setelah-sholat' | 'umum' | 'khusus';

export const ZIKIR_TIME_LABELS: Record<TimeOfDay, { id: string; en: string }> = {
  pagi: { id: 'Zikir Pagi', en: 'Morning Dhikr' },
  petang: { id: 'Zikir Petang', en: 'Evening Dhikr' },
  'setelah-sholat': { id: 'Setelah Sholat', en: 'After Prayer' },
  umum: { id: 'Zikir Umum', en: 'General Dhikr' },
  khusus: { id: 'Zikir Khusus', en: 'Special Occasions' },
};

export interface Category {
  id: number;
  name: string;
  nameEn?: string;
  slug: string;
  createdAt: string;
}

export interface Zikir {
  id: number;
  categoryId: number;
  title: string;
  titleEn?: string;
  arabicText: string;
  latinText: string;
  translation: string;
  translationEn?: string;
  reference: string;
  dalilSource: string;
  dalilStatus: string;
  dalilText: string;
  dalilTextEn?: string;
  tafsir: string;
  tafsirEn?: string;
  repeatCount: number; // 0 = Tanpa Batasan
  timeOfDay: TimeOfDay;
  isPublished: boolean;
  createdAt: string;
}

export interface Hadith {
  id: number;
  categoryId: number;
  title: string;
  titleEn?: string;
  arabicText: string;
  latinText: string;
  translation: string;
  translationEn?: string;
  source: string;
  narrator: string;
  dalilStatus: string;
  dalilText: string;
  dalilTextEn?: string;
  tafsir: string;
  tafsirEn?: string;
  isPublished: boolean;
  createdAt: string;
}

export interface BlogPost {
  id: number;
  categoryId: number;
  title: string;
  titleEn?: string;
  slug: string;
  imageUrl?: string;
  excerpt: string;
  excerptEn?: string;
  content: string;
  contentEn?: string;
  author: string;
  readingTimeMinutes: number;
  views: number;
  isPublished: boolean;
  createdAt: string;
}

export type SunnahGuideType = 'sholat' | 'kebiasaan';

export interface SunnahGuideItem {
  id: number;
  guideType: SunnahGuideType;
  stepOrder: number;
  title: string;
  titleEn?: string;
  arabicText: string;
  latinText: string;
  translation: string;
  translationEn?: string;
  dalilSource: string;
  dalilStatus: string;
  dalilText: string;
  dalilTextEn?: string;
  tafsir: string;
  tafsirEn?: string;
  isPublished: boolean;
  createdAt: string;
}

export interface PublicLeaderboardUser {
  id: number;
  username: string;
  points: number;
  zikirCompleted: number;
  sunnahCompleted: number;
  streakDays: number;
  joinedAt: string;
}

export interface ScholarFigure {
  id: number;
  name: string;
  fullName: string;
  nasab: string;
  nasabEn?: string;
  role: string;
  roleEn?: string;
  tabaqah: string;
  tabaqahEn?: string;
  birthDeath: string;
  birthDeathEn?: string;
  jarhWaTadil: string;
  jarhWaTadilEn?: string;
  teachersAndStudents: string;
  teachersAndStudentsEn?: string;
  majorWorks: string;
  majorWorksEn?: string;
  biography: string;
  biographyEn?: string;
  isPublished: boolean;
  createdAt: string;
}

export interface AnalyticsSummary {
  siteVisits: number;
  blogReads: number;
  userJoins: number;
  zikirCompletions: number;
  totalHadiths: number;
  totalZikrs: number;
  totalBlogs: number;
  totalSunnah: number;
  totalFigures: number;
  topBlogs: Array<{ id: number; title: string; views: number }>;
  recentUsers: PublicLeaderboardUser[];
}

export const createCategorySchema = z.object({
  name: z.string().trim().min(2, 'Nama kategori minimal 2 karakter').max(100),
  nameEn: z.string().trim().max(100).optional().default(''),
  slug: z
    .string()
    .trim()
    .min(2, 'Slug minimal 2 karakter')
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Slug hanya boleh huruf kecil, angka, dan tanda hubung'),
});

export const updateCategorySchema = createCategorySchema.partial();

export const createZikirSchema = z.object({
  categoryId: z.coerce.number().int().positive('Kategori wajib dipilih'),
  title: z.string().trim().min(2, 'Judul zikir wajib diisi').max(255),
  titleEn: z.string().trim().max(255).optional().default(''),
  arabicText: z.string().trim().min(2, 'Teks Arab wajib diisi'),
  latinText: z.string().trim().optional().default(''),
  translation: z.string().trim().min(2, 'Terjemahan wajib diisi'),
  translationEn: z.string().trim().optional().default(''),
  reference: z.string().trim().max(255).optional().default(''),
  dalilSource: z.string().trim().max(255).optional().default(''),
  dalilStatus: z.string().trim().max(120).optional().default('Shahih'),
  dalilText: z.string().trim().max(3000).optional().default(''),
  dalilTextEn: z.string().trim().max(3000).optional().default(''),
  tafsir: z.string().trim().max(4000).optional().default(''),
  tafsirEn: z.string().trim().max(4000).optional().default(''),
  repeatCount: z.coerce.number().int().min(0).max(1000).default(1),
  timeOfDay: z.enum(['pagi', 'petang', 'setelah-sholat', 'umum', 'khusus']),
  isPublished: z.boolean().default(true),
});

export const updateZikirSchema = createZikirSchema.partial();

export const createHadithSchema = z.object({
  categoryId: z.coerce.number().int().positive('Kategori wajib dipilih'),
  title: z.string().trim().min(2, 'Judul hadis wajib diisi').max(255),
  titleEn: z.string().trim().max(255).optional().default(''),
  arabicText: z.string().trim().optional().default(''),
  latinText: z.string().trim().optional().default(''),
  translation: z.string().trim().min(5, 'Terjemahan hadis wajib diisi'),
  translationEn: z.string().trim().optional().default(''),
  source: z.string().trim().max(255).optional().default(''),
  narrator: z.string().trim().max(255).optional().default(''),
  dalilStatus: z.string().trim().max(120).optional().default('Shahih'),
  dalilText: z.string().trim().max(3000).optional().default(''),
  dalilTextEn: z.string().trim().max(3000).optional().default(''),
  tafsir: z.string().trim().max(4000).optional().default(''),
  tafsirEn: z.string().trim().max(4000).optional().default(''),
  isPublished: z.boolean().default(true),
});

export const updateHadithSchema = createHadithSchema.partial();

export const createBlogSchema = z.object({
  categoryId: z.coerce.number().int().positive('Kategori wajib dipilih'),
  title: z.string().trim().min(3, 'Judul artikel minimal 3 karakter').max(255),
  titleEn: z.string().trim().max(255).optional().default(''),
  slug: z
    .string()
    .trim()
    .min(2, 'Slug minimal 2 karakter')
    .max(160)
    .regex(/^[a-z0-9-]+$/, 'Slug hanya boleh huruf kecil, angka, dan tanda hubung'),
  imageUrl: z.string().trim().max(500).optional().default(''),
  excerpt: z.string().trim().min(10, 'Ringkasan minimal 10 karakter').max(15000),
  excerptEn: z.string().trim().max(15000).optional().default(''),
  content: z.string().trim().min(20, 'Isi artikel minimal 20 karakter').max(100000),
  contentEn: z.string().trim().max(100000).optional().default(''),
  author: z.string().trim().min(2, 'Nama penulis wajib diisi').max(120),
  readingTimeMinutes: z.coerce.number().int().min(1).max(60).default(4),
  isPublished: z.boolean().default(true),
});

export const updateBlogSchema = createBlogSchema.partial();

export const createSunnahSchema = z.object({
  guideType: z.enum(['sholat', 'kebiasaan']),
  stepOrder: z.coerce.number().int().min(1).max(200).default(1),
  title: z.string().trim().min(2, 'Judul amalan wajib diisi').max(255),
  titleEn: z.string().trim().max(255).optional().default(''),
  arabicText: z.string().trim().optional().default(''),
  latinText: z.string().trim().optional().default(''),
  translation: z.string().trim().min(3, 'Penjelasan/terjemahan wajib diisi'),
  translationEn: z.string().trim().optional().default(''),
  dalilSource: z.string().trim().max(255).optional().default(''),
  dalilStatus: z.string().trim().max(120).optional().default('Shahih'),
  dalilText: z.string().trim().max(3000).optional().default(''),
  dalilTextEn: z.string().trim().max(3000).optional().default(''),
  tafsir: z.string().trim().max(4000).optional().default(''),
  tafsirEn: z.string().trim().max(4000).optional().default(''),
  isPublished: z.boolean().default(true),
});

export const updateSunnahSchema = createSunnahSchema.partial();

export const registerUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Username minimal 3 karakter')
    .max(24, 'Username maksimal 24 karakter')
    .regex(/^[a-zA-Z0-9_.-]+$/, 'Username hanya boleh huruf, angka, titik, atau garis bawah'),
  email: z
    .string()
    .trim()
    .max(120)
    .optional()
    .default(''),
  password: z
    .string()
    .min(6, 'Password minimal 6 karakter')
    .max(200),
});

export const loginUserSchema = z.object({
  username: z.string().trim().min(1, 'Username wajib diisi').max(60),
  password: z.string().min(1, 'Password wajib diisi').max(200),
});

export const userActivitySchema = z.object({
  type: z.enum(['zikir', 'sunnah']),
});

export const toggleUserBookmarkSchema = z.object({
  hadithId: z.coerce.number().int().positive('ID hadis tidak valid'),
});

export const adminLoginSchema = z.object({
  passcode: z.string().min(1, 'Kata sandi wajib diisi').max(200),
});

export const adminClaimSchema = z.object({
  passcode: z
    .string()
    .min(8, 'Kata sandi admin minimal 8 karakter')
    .max(200, 'Kata sandi maksimal 200 karakter'),
});

export const createFigureSchema = z.object({
  name: z.string().trim().min(2, 'Nama pemicu klik wajib diisi').max(120),
  fullName: z.string().trim().min(2, 'Nama lengkap/kunyah wajib diisi').max(255),
  nasab: z.string().trim().max(1000).optional().default(''),
  nasabEn: z.string().trim().max(1000).optional().default(''),
  role: z.string().trim().min(2, 'Kedudukan dalam ilmu hadis wajib diisi').max(200),
  roleEn: z.string().trim().max(200).optional().default(''),
  tabaqah: z.string().trim().max(120).optional().default(''),
  tabaqahEn: z.string().trim().max(120).optional().default(''),
  birthDeath: z.string().trim().max(120).optional().default(''),
  birthDeathEn: z.string().trim().max(120).optional().default(''),
  jarhWaTadil: z.string().trim().max(1500).optional().default(''),
  jarhWaTadilEn: z.string().trim().max(1500).optional().default(''),
  teachersAndStudents: z.string().trim().max(1500).optional().default(''),
  teachersAndStudentsEn: z.string().trim().max(1500).optional().default(''),
  majorWorks: z.string().trim().max(1000).optional().default(''),
  majorWorksEn: z.string().trim().max(1000).optional().default(''),
  biography: z.string().trim().min(10, 'Biografi ringkas minimal 10 karakter').max(4000),
  biographyEn: z.string().trim().max(4000).optional().default(''),
  isPublished: z.boolean().default(true),
});

export const updateFigureSchema = createFigureSchema.partial();
