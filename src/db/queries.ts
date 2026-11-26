import { asc, desc, eq, sql } from 'drizzle-orm';
import { db } from './index.ts';
import {
  adminCredentials,
  analyticsStats,
  blogs,
  categories,
  hadiths,
  scholarFigures,
  sunnahGuides,
  users,
  zikrs,
} from './schema.ts';
import {
  INITIAL_BLOGS,
  INITIAL_CATEGORIES,
  INITIAL_FIGURES,
  INITIAL_HADITHS,
  INITIAL_SUNNAH_GUIDES,
  INITIAL_ZIKRS,
} from './seedData.ts';
import type {
  AnalyticsSummary,
  BlogPost,
  Category,
  Hadith,
  PublicLeaderboardUser,
  ScholarFigure,
  SunnahGuideItem,
  SunnahGuideType,
  TimeOfDay,
  Zikir,
} from '../lib/validations/content.ts';

export interface StoredAdminCredential {
  salt: string;
  hash: string;
  claimedAt: string;
}

export interface StoredUserRecord {
  id: number;
  uid: string;
  username: string;
  email: string;
  salt: string;
  passwordHash: string;
  points: number;
  zikirCompleted: number;
  sunnahCompleted: number;
  streakDays: number;
  lastActivityDate: string | null;
  savedHadithIds: number[];
  joinedAt: string;
}

function getLocalDateKey(offsetDays = 0): string {
  const d = new Date(Date.now() + offsetDays * 86400000);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
}

function mapCategory(row: typeof categories.$inferSelect): Category {
  return {
    id: row.id,
    name: row.name,
    nameEn: row.nameEn,
    slug: row.slug,
    createdAt: row.createdAt.toISOString(),
  };
}

function mapZikir(row: typeof zikrs.$inferSelect): Zikir {
  return {
    id: row.id,
    categoryId: row.categoryId,
    title: row.title,
    titleEn: row.titleEn,
    arabicText: row.arabicText,
    latinText: row.latinText,
    translation: row.translation,
    translationEn: row.translationEn,
    reference: row.reference,
    dalilSource: row.dalilSource,
    dalilStatus: row.dalilStatus,
    dalilText: row.dalilText,
    dalilTextEn: row.dalilTextEn,
    tafsir: row.tafsir,
    tafsirEn: row.tafsirEn,
    repeatCount: row.repeatCount,
    timeOfDay: row.timeOfDay as TimeOfDay,
    isPublished: row.isPublished,
    createdAt: row.createdAt.toISOString(),
  };
}

function mapHadith(row: typeof hadiths.$inferSelect): Hadith {
  return {
    id: row.id,
    categoryId: row.categoryId,
    title: row.title,
    titleEn: row.titleEn,
    arabicText: row.arabicText,
    latinText: row.latinText,
    translation: row.translation,
    translationEn: row.translationEn,
    source: row.source,
    narrator: row.narrator,
    dalilStatus: row.dalilStatus,
    dalilText: row.dalilText,
    dalilTextEn: row.dalilTextEn,
    tafsir: row.tafsir,
    tafsirEn: row.tafsirEn,
    isPublished: row.isPublished,
    createdAt: row.createdAt.toISOString(),
  };
}

function mapBlog(row: typeof blogs.$inferSelect): BlogPost {
  return {
    id: row.id,
    categoryId: row.categoryId,
    title: row.title,
    titleEn: row.titleEn,
    slug: row.slug,
    imageUrl: row.imageUrl,
    excerpt: row.excerpt,
    excerptEn: row.excerptEn,
    content: row.content,
    contentEn: row.contentEn,
    author: row.author,
    readingTimeMinutes: row.readingTimeMinutes,
    views: row.views,
    isPublished: row.isPublished,
    createdAt: row.createdAt.toISOString(),
  };
}

function mapSunnah(row: typeof sunnahGuides.$inferSelect): SunnahGuideItem {
  return {
    id: row.id,
    guideType: row.guideType as SunnahGuideType,
    stepOrder: row.stepOrder,
    title: row.title,
    titleEn: row.titleEn,
    arabicText: row.arabicText,
    latinText: row.latinText,
    translation: row.translation,
    translationEn: row.translationEn,
    dalilSource: row.dalilSource,
    dalilStatus: row.dalilStatus,
    dalilText: row.dalilText,
    dalilTextEn: row.dalilTextEn,
    tafsir: row.tafsir,
    tafsirEn: row.tafsirEn,
    isPublished: row.isPublished,
    createdAt: row.createdAt.toISOString(),
  };
}

function mapFigure(row: typeof scholarFigures.$inferSelect): ScholarFigure {
  return {
    id: row.id,
    name: row.name,
    fullName: row.fullName,
    nasab: row.nasab,
    nasabEn: row.nasabEn,
    role: row.role,
    roleEn: row.roleEn,
    tabaqah: row.tabaqah,
    tabaqahEn: row.tabaqahEn,
    birthDeath: row.birthDeath,
    birthDeathEn: row.birthDeathEn,
    jarhWaTadil: row.jarhWaTadil,
    jarhWaTadilEn: row.jarhWaTadilEn,
    teachersAndStudents: row.teachersAndStudents,
    teachersAndStudentsEn: row.teachersAndStudentsEn,
    majorWorks: row.majorWorks,
    majorWorksEn: row.majorWorksEn,
    biography: row.biography,
    biographyEn: row.biographyEn,
    isPublished: row.isPublished,
    createdAt: row.createdAt.toISOString(),
  };
}

function mapUserRecord(row: typeof users.$inferSelect): StoredUserRecord {
  return {
    id: row.id,
    uid: row.uid,
    username: row.username,
    email: row.email,
    salt: row.salt,
    passwordHash: row.passwordHash,
    points: row.points,
    zikirCompleted: row.zikirCompleted,
    sunnahCompleted: row.sunnahCompleted,
    streakDays: row.streakDays,
    lastActivityDate: row.lastActivityDate ?? null,
    savedHadithIds: Array.isArray(row.savedHadithIds) ? row.savedHadithIds : [],
    joinedAt: row.joinedAt.toISOString(),
  };
}

export function toPublicUser(user: {
  id: number;
  username: string;
  points: number;
  zikirCompleted: number;
  sunnahCompleted: number;
  streakDays: number;
  joinedAt: string | Date;
}): PublicLeaderboardUser {
  return {
    id: user.id,
    username: user.username,
    points: user.points,
    zikirCompleted: user.zikirCompleted,
    sunnahCompleted: user.sunnahCompleted,
    streakDays: user.streakDays ?? 0,
    joinedAt: user.joinedAt instanceof Date ? user.joinedAt.toISOString() : user.joinedAt,
  };
}

let seedPromise: Promise<void> | null = null;

/**
 * Lazily seeds initial authentic content into PostgreSQL on first request
 * if the database is empty (no top-level startup probes).
 */
export async function ensureSeeded(): Promise<void> {
  if (!seedPromise) {
    seedPromise = (async () => {
      const existing = await db.select({ id: categories.id }).from(categories).limit(1);
      if (existing.length === 0) {
        await db
          .insert(categories)
          .values(
            INITIAL_CATEGORIES.map((c) => ({
              id: c.id,
              name: c.name,
              nameEn: c.nameEn ?? '',
              slug: c.slug,
              createdAt: new Date(c.createdAt),
            }))
          )
          .onConflictDoNothing();

        await db
          .insert(zikrs)
          .values(
            INITIAL_ZIKRS.map((z) => ({
              id: z.id,
              categoryId: z.categoryId,
              title: z.title,
              titleEn: z.titleEn ?? '',
              arabicText: z.arabicText,
              latinText: z.latinText,
              translation: z.translation,
              translationEn: z.translationEn ?? '',
              reference: z.reference,
              dalilSource: z.dalilSource,
              dalilStatus: z.dalilStatus,
              dalilText: z.dalilText,
              dalilTextEn: z.dalilTextEn ?? '',
              tafsir: z.tafsir,
              tafsirEn: z.tafsirEn ?? '',
              repeatCount: z.repeatCount,
              timeOfDay: z.timeOfDay,
              isPublished: z.isPublished,
              createdAt: new Date(z.createdAt),
            }))
          )
          .onConflictDoNothing();

        await db
          .insert(hadiths)
          .values(
            INITIAL_HADITHS.map((h) => ({
              id: h.id,
              categoryId: h.categoryId,
              title: h.title,
              titleEn: h.titleEn ?? '',
              arabicText: h.arabicText,
              latinText: h.latinText,
              translation: h.translation,
              translationEn: h.translationEn ?? '',
              source: h.source,
              narrator: h.narrator,
              dalilStatus: h.dalilStatus,
              dalilText: h.dalilText,
              dalilTextEn: h.dalilTextEn ?? '',
              tafsir: h.tafsir,
              tafsirEn: h.tafsirEn ?? '',
              isPublished: h.isPublished,
              createdAt: new Date(h.createdAt),
            }))
          )
          .onConflictDoNothing();

        await db
          .insert(blogs)
          .values(
            INITIAL_BLOGS.map((b) => ({
              id: b.id,
              categoryId: b.categoryId,
              title: b.title,
              titleEn: b.titleEn ?? '',
              slug: b.slug,
              imageUrl: b.imageUrl ?? '',
              excerpt: b.excerpt,
              excerptEn: b.excerptEn ?? '',
              content: b.content,
              contentEn: b.contentEn ?? '',
              author: b.author,
              readingTimeMinutes: b.readingTimeMinutes,
              views: b.views,
              isPublished: b.isPublished,
              createdAt: new Date(b.createdAt),
            }))
          )
          .onConflictDoNothing();

        await db
          .insert(sunnahGuides)
          .values(
            INITIAL_SUNNAH_GUIDES.map((s) => ({
              id: s.id,
              guideType: s.guideType,
              stepOrder: s.stepOrder,
              title: s.title,
              titleEn: s.titleEn ?? '',
              arabicText: s.arabicText,
              latinText: s.latinText,
              translation: s.translation,
              translationEn: s.translationEn ?? '',
              dalilSource: s.dalilSource,
              dalilStatus: s.dalilStatus,
              dalilText: s.dalilText,
              dalilTextEn: s.dalilTextEn ?? '',
              tafsir: s.tafsir,
              tafsirEn: s.tafsirEn ?? '',
              isPublished: s.isPublished,
              createdAt: new Date(s.createdAt),
            }))
          )
          .onConflictDoNothing();

        await db
          .insert(scholarFigures)
          .values(
            INITIAL_FIGURES.map((f) => ({
              id: f.id,
              name: f.name,
              fullName: f.fullName,
              nasab: f.nasab,
              nasabEn: f.nasabEn ?? '',
              role: f.role,
              roleEn: f.roleEn ?? '',
              tabaqah: f.tabaqah,
              tabaqahEn: f.tabaqahEn ?? '',
              birthDeath: f.birthDeath,
              birthDeathEn: f.birthDeathEn ?? '',
              jarhWaTadil: f.jarhWaTadil,
              jarhWaTadilEn: f.jarhWaTadilEn ?? '',
              teachersAndStudents: f.teachersAndStudents,
              teachersAndStudentsEn: f.teachersAndStudentsEn ?? '',
              majorWorks: f.majorWorks,
              majorWorksEn: f.majorWorksEn ?? '',
              biography: f.biography,
              biographyEn: f.biographyEn ?? '',
              isPublished: f.isPublished,
              createdAt: new Date(f.createdAt),
            }))
          )
          .onConflictDoNothing();

        await db
          .insert(analyticsStats)
          .values({ id: 1, siteVisits: 1, blogReads: 89, zikirCompletions: 0 })
          .onConflictDoNothing();

        await db.execute(
          sql`SELECT setval(pg_get_serial_sequence('categories', 'id'), COALESCE((SELECT MAX(id) FROM categories), 1))`
        );
        await db.execute(
          sql`SELECT setval(pg_get_serial_sequence('zikrs', 'id'), COALESCE((SELECT MAX(id) FROM zikrs), 1))`
        );
        await db.execute(
          sql`SELECT setval(pg_get_serial_sequence('hadiths', 'id'), COALESCE((SELECT MAX(id) FROM hadiths), 1))`
        );
        await db.execute(
          sql`SELECT setval(pg_get_serial_sequence('blogs', 'id'), COALESCE((SELECT MAX(id) FROM blogs), 1))`
        );
        await db.execute(
          sql`SELECT setval(pg_get_serial_sequence('sunnah_guides', 'id'), COALESCE((SELECT MAX(id) FROM sunnah_guides), 1))`
        );
        await db.execute(
          sql`SELECT setval(pg_get_serial_sequence('scholar_figures', 'id'), COALESCE((SELECT MAX(id) FROM scholar_figures), 1))`
        );
      }
    })().catch((err) => {
      seedPromise = null;
      console.error('Database initial seed failed:', err);
      throw new Error('Database initialization failed. Please try again later.', { cause: err });
    });
  }
  await seedPromise;
}

// ---------- Categories ----------

export async function listCategories(): Promise<Category[]> {
  try {
    await ensureSeeded();
    const rows = await db.select().from(categories).orderBy(asc(categories.id));
    return rows.map(mapCategory);
  } catch (error) {
    console.error('listCategories failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function findCategoryById(id: number): Promise<Category | undefined> {
  try {
    await ensureSeeded();
    const rows = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
    return rows[0] ? mapCategory(rows[0]) : undefined;
  } catch (error) {
    console.error('findCategoryById failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function addCategory(input: {
  name: string;
  nameEn?: string;
  slug: string;
}): Promise<Category> {
  try {
    await ensureSeeded();
    const existing = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.slug, input.slug))
      .limit(1);
    if (existing.length > 0) {
      throw new Error('SLUG_EXISTS');
    }

    const inserted = await db
      .insert(categories)
      .values({
        name: input.name,
        nameEn: input.nameEn ?? '',
        slug: input.slug,
      })
      .returning();
    return mapCategory(inserted[0]);
  } catch (error) {
    if (error instanceof Error && error.message === 'SLUG_EXISTS') throw error;
    console.error('addCategory failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function updateCategoryById(
  id: number,
  patch: Partial<{ name: string; nameEn: string; slug: string }>
): Promise<Category | undefined> {
  try {
    await ensureSeeded();
    const existing = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
    if (!existing[0]) return undefined;

    if (patch.slug && patch.slug !== existing[0].slug) {
      const conflict = await db
        .select({ id: categories.id })
        .from(categories)
        .where(eq(categories.slug, patch.slug))
        .limit(1);
      if (conflict.length > 0) {
        throw new Error('SLUG_EXISTS');
      }
    }

    const updated = await db
      .update(categories)
      .set({
        ...(patch.name !== undefined ? { name: patch.name } : {}),
        ...(patch.nameEn !== undefined ? { nameEn: patch.nameEn } : {}),
        ...(patch.slug !== undefined ? { slug: patch.slug } : {}),
      })
      .where(eq(categories.id, id))
      .returning();
    return updated[0] ? mapCategory(updated[0]) : undefined;
  } catch (error) {
    if (error instanceof Error && error.message === 'SLUG_EXISTS') throw error;
    console.error('updateCategoryById failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function deleteCategoryById(id: number): Promise<boolean> {
  try {
    await ensureSeeded();
    const existing = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
    if (!existing[0]) return false;

    const [usedHadith, usedZikir, usedBlog] = await Promise.all([
      db.select({ id: hadiths.id }).from(hadiths).where(eq(hadiths.categoryId, id)).limit(1),
      db.select({ id: zikrs.id }).from(zikrs).where(eq(zikrs.categoryId, id)).limit(1),
      db.select({ id: blogs.id }).from(blogs).where(eq(blogs.categoryId, id)).limit(1),
    ]);

    if (usedHadith.length > 0 || usedZikir.length > 0 || usedBlog.length > 0) {
      throw new Error('CATEGORY_IN_USE');
    }

    const removed = await db.delete(categories).where(eq(categories.id, id)).returning();
    return removed.length > 0;
  } catch (error) {
    if (error instanceof Error && error.message === 'CATEGORY_IN_USE') throw error;
    console.error('deleteCategoryById failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

// ---------- Zikrs ----------

export async function listZikrs(options?: {
  includeUnpublished?: boolean;
  timeOfDay?: TimeOfDay;
}): Promise<Zikir[]> {
  try {
    await ensureSeeded();
    const rows = await db.select().from(zikrs).orderBy(asc(zikrs.id));
    return rows
      .filter((z) => {
        if (!options?.includeUnpublished && !z.isPublished) return false;
        if (options?.timeOfDay && z.timeOfDay !== options.timeOfDay) return false;
        return true;
      })
      .map(mapZikir);
  } catch (error) {
    console.error('listZikrs failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function addZikir(
  input: Omit<Zikir, 'id' | 'createdAt'>
): Promise<Zikir> {
  try {
    await ensureSeeded();
    const inserted = await db
      .insert(zikrs)
      .values({
        categoryId: input.categoryId,
        title: input.title,
        titleEn: input.titleEn ?? '',
        arabicText: input.arabicText,
        latinText: input.latinText ?? '',
        translation: input.translation,
        translationEn: input.translationEn ?? '',
        reference: input.reference ?? '',
        dalilSource: input.dalilSource ?? '',
        dalilStatus: input.dalilStatus ?? 'Shahih',
        dalilText: input.dalilText ?? '',
        dalilTextEn: input.dalilTextEn ?? '',
        tafsir: input.tafsir ?? '',
        tafsirEn: input.tafsirEn ?? '',
        repeatCount: input.repeatCount ?? 1,
        timeOfDay: input.timeOfDay,
        isPublished: input.isPublished ?? true,
      })
      .returning();
    return mapZikir(inserted[0]);
  } catch (error) {
    console.error('addZikir failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function updateZikirById(
  id: number,
  patch: Partial<Omit<Zikir, 'id' | 'createdAt'>>
): Promise<Zikir | undefined> {
  try {
    await ensureSeeded();
    const updated = await db
      .update(zikrs)
      .set({
        ...(patch.categoryId !== undefined ? { categoryId: patch.categoryId } : {}),
        ...(patch.title !== undefined ? { title: patch.title } : {}),
        ...(patch.titleEn !== undefined ? { titleEn: patch.titleEn } : {}),
        ...(patch.arabicText !== undefined ? { arabicText: patch.arabicText } : {}),
        ...(patch.latinText !== undefined ? { latinText: patch.latinText } : {}),
        ...(patch.translation !== undefined ? { translation: patch.translation } : {}),
        ...(patch.translationEn !== undefined ? { translationEn: patch.translationEn } : {}),
        ...(patch.reference !== undefined ? { reference: patch.reference } : {}),
        ...(patch.dalilSource !== undefined ? { dalilSource: patch.dalilSource } : {}),
        ...(patch.dalilStatus !== undefined ? { dalilStatus: patch.dalilStatus } : {}),
        ...(patch.dalilText !== undefined ? { dalilText: patch.dalilText } : {}),
        ...(patch.dalilTextEn !== undefined ? { dalilTextEn: patch.dalilTextEn } : {}),
        ...(patch.tafsir !== undefined ? { tafsir: patch.tafsir } : {}),
        ...(patch.tafsirEn !== undefined ? { tafsirEn: patch.tafsirEn } : {}),
        ...(patch.repeatCount !== undefined ? { repeatCount: patch.repeatCount } : {}),
        ...(patch.timeOfDay !== undefined ? { timeOfDay: patch.timeOfDay } : {}),
        ...(patch.isPublished !== undefined ? { isPublished: patch.isPublished } : {}),
      })
      .where(eq(zikrs.id, id))
      .returning();
    return updated[0] ? mapZikir(updated[0]) : undefined;
  } catch (error) {
    console.error('updateZikirById failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function deleteZikirById(id: number): Promise<boolean> {
  try {
    await ensureSeeded();
    const removed = await db.delete(zikrs).where(eq(zikrs.id, id)).returning();
    return removed.length > 0;
  } catch (error) {
    console.error('deleteZikirById failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

// ---------- Hadiths ----------

export async function listHadiths(options?: {
  includeUnpublished?: boolean;
  categoryId?: number;
}): Promise<Hadith[]> {
  try {
    await ensureSeeded();
    const rows = await db.select().from(hadiths).orderBy(desc(hadiths.id));
    return rows
      .filter((h) => {
        if (!options?.includeUnpublished && !h.isPublished) return false;
        if (options?.categoryId && h.categoryId !== options.categoryId) return false;
        return true;
      })
      .map(mapHadith);
  } catch (error) {
    console.error('listHadiths failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function addHadith(
  input: Omit<Hadith, 'id' | 'createdAt'>
): Promise<Hadith> {
  try {
    await ensureSeeded();
    const inserted = await db
      .insert(hadiths)
      .values({
        categoryId: input.categoryId,
        title: input.title,
        titleEn: input.titleEn ?? '',
        arabicText: input.arabicText ?? '',
        latinText: input.latinText ?? '',
        translation: input.translation,
        translationEn: input.translationEn ?? '',
        source: input.source ?? '',
        narrator: input.narrator ?? '',
        dalilStatus: input.dalilStatus ?? 'Shahih',
        dalilText: input.dalilText ?? '',
        dalilTextEn: input.dalilTextEn ?? '',
        tafsir: input.tafsir ?? '',
        tafsirEn: input.tafsirEn ?? '',
        isPublished: input.isPublished ?? true,
      })
      .returning();
    return mapHadith(inserted[0]);
  } catch (error) {
    console.error('addHadith failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function updateHadithById(
  id: number,
  patch: Partial<Omit<Hadith, 'id' | 'createdAt'>>
): Promise<Hadith | undefined> {
  try {
    await ensureSeeded();
    const updated = await db
      .update(hadiths)
      .set({
        ...(patch.categoryId !== undefined ? { categoryId: patch.categoryId } : {}),
        ...(patch.title !== undefined ? { title: patch.title } : {}),
        ...(patch.titleEn !== undefined ? { titleEn: patch.titleEn } : {}),
        ...(patch.arabicText !== undefined ? { arabicText: patch.arabicText } : {}),
        ...(patch.latinText !== undefined ? { latinText: patch.latinText } : {}),
        ...(patch.translation !== undefined ? { translation: patch.translation } : {}),
        ...(patch.translationEn !== undefined ? { translationEn: patch.translationEn } : {}),
        ...(patch.source !== undefined ? { source: patch.source } : {}),
        ...(patch.narrator !== undefined ? { narrator: patch.narrator } : {}),
        ...(patch.dalilStatus !== undefined ? { dalilStatus: patch.dalilStatus } : {}),
        ...(patch.dalilText !== undefined ? { dalilText: patch.dalilText } : {}),
        ...(patch.dalilTextEn !== undefined ? { dalilTextEn: patch.dalilTextEn } : {}),
        ...(patch.tafsir !== undefined ? { tafsir: patch.tafsir } : {}),
        ...(patch.tafsirEn !== undefined ? { tafsirEn: patch.tafsirEn } : {}),
        ...(patch.isPublished !== undefined ? { isPublished: patch.isPublished } : {}),
      })
      .where(eq(hadiths.id, id))
      .returning();
    return updated[0] ? mapHadith(updated[0]) : undefined;
  } catch (error) {
    console.error('updateHadithById failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function deleteHadithById(id: number): Promise<boolean> {
  try {
    await ensureSeeded();
    const removed = await db.delete(hadiths).where(eq(hadiths.id, id)).returning();
    return removed.length > 0;
  } catch (error) {
    console.error('deleteHadithById failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

// ---------- Blogs ----------

export async function listBlogs(options?: {
  includeUnpublished?: boolean;
  categoryId?: number;
}): Promise<BlogPost[]> {
  try {
    await ensureSeeded();
    const rows = await db.select().from(blogs).orderBy(desc(blogs.id));
    return rows
      .filter((b) => {
        if (!options?.includeUnpublished && !b.isPublished) return false;
        if (options?.categoryId && b.categoryId !== options.categoryId) return false;
        return true;
      })
      .map(mapBlog);
  } catch (error) {
    console.error('listBlogs failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function addBlog(
  input: Omit<BlogPost, 'id' | 'views' | 'createdAt'>
): Promise<BlogPost> {
  try {
    await ensureSeeded();
    const existing = await db
      .select({ id: blogs.id })
      .from(blogs)
      .where(eq(blogs.slug, input.slug))
      .limit(1);
    if (existing.length > 0) {
      throw new Error('SLUG_EXISTS');
    }

    const inserted = await db
      .insert(blogs)
      .values({
        categoryId: input.categoryId,
        title: input.title,
        titleEn: input.titleEn ?? '',
        slug: input.slug,
        imageUrl: input.imageUrl ?? '',
        excerpt: input.excerpt,
        excerptEn: input.excerptEn ?? '',
        content: input.content,
        contentEn: input.contentEn ?? '',
        author: input.author,
        readingTimeMinutes: input.readingTimeMinutes ?? 4,
        views: 0,
        isPublished: input.isPublished ?? true,
      })
      .returning();
    return mapBlog(inserted[0]);
  } catch (error) {
    if (error instanceof Error && error.message === 'SLUG_EXISTS') throw error;
    console.error('addBlog failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function updateBlogById(
  id: number,
  patch: Partial<Omit<BlogPost, 'id' | 'createdAt'>>
): Promise<BlogPost | undefined> {
  try {
    await ensureSeeded();
    const existing = await db.select().from(blogs).where(eq(blogs.id, id)).limit(1);
    if (!existing[0]) return undefined;

    if (patch.slug && patch.slug !== existing[0].slug) {
      const conflict = await db
        .select({ id: blogs.id })
        .from(blogs)
        .where(eq(blogs.slug, patch.slug))
        .limit(1);
      if (conflict.length > 0) {
        throw new Error('SLUG_EXISTS');
      }
    }

    const updated = await db
      .update(blogs)
      .set({
        ...(patch.categoryId !== undefined ? { categoryId: patch.categoryId } : {}),
        ...(patch.title !== undefined ? { title: patch.title } : {}),
        ...(patch.titleEn !== undefined ? { titleEn: patch.titleEn } : {}),
        ...(patch.slug !== undefined ? { slug: patch.slug } : {}),
        ...(patch.imageUrl !== undefined ? { imageUrl: patch.imageUrl } : {}),
        ...(patch.excerpt !== undefined ? { excerpt: patch.excerpt } : {}),
        ...(patch.excerptEn !== undefined ? { excerptEn: patch.excerptEn } : {}),
        ...(patch.content !== undefined ? { content: patch.content } : {}),
        ...(patch.contentEn !== undefined ? { contentEn: patch.contentEn } : {}),
        ...(patch.author !== undefined ? { author: patch.author } : {}),
        ...(patch.readingTimeMinutes !== undefined
          ? { readingTimeMinutes: patch.readingTimeMinutes }
          : {}),
        ...(patch.views !== undefined ? { views: patch.views } : {}),
        ...(patch.isPublished !== undefined ? { isPublished: patch.isPublished } : {}),
      })
      .where(eq(blogs.id, id))
      .returning();
    return updated[0] ? mapBlog(updated[0]) : undefined;
  } catch (error) {
    if (error instanceof Error && error.message === 'SLUG_EXISTS') throw error;
    console.error('updateBlogById failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function deleteBlogById(id: number): Promise<boolean> {
  try {
    await ensureSeeded();
    const removed = await db.delete(blogs).where(eq(blogs.id, id)).returning();
    return removed.length > 0;
  } catch (error) {
    console.error('deleteBlogById failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

// ---------- Sunnah Guides ----------

export async function listSunnahGuides(options?: {
  includeUnpublished?: boolean;
  guideType?: SunnahGuideType;
}): Promise<SunnahGuideItem[]> {
  try {
    await ensureSeeded();
    const rows = await db
      .select()
      .from(sunnahGuides)
      .orderBy(asc(sunnahGuides.stepOrder), asc(sunnahGuides.id));
    return rows
      .filter((s) => {
        if (!options?.includeUnpublished && !s.isPublished) return false;
        if (options?.guideType && s.guideType !== options.guideType) return false;
        return true;
      })
      .map(mapSunnah);
  } catch (error) {
    console.error('listSunnahGuides failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function addSunnahGuide(
  input: Omit<SunnahGuideItem, 'id' | 'createdAt'>
): Promise<SunnahGuideItem> {
  try {
    await ensureSeeded();
    const inserted = await db
      .insert(sunnahGuides)
      .values({
        guideType: input.guideType,
        stepOrder: input.stepOrder ?? 1,
        title: input.title,
        titleEn: input.titleEn ?? '',
        arabicText: input.arabicText ?? '',
        latinText: input.latinText ?? '',
        translation: input.translation,
        translationEn: input.translationEn ?? '',
        dalilSource: input.dalilSource ?? '',
        dalilStatus: input.dalilStatus ?? 'Shahih',
        dalilText: input.dalilText ?? '',
        dalilTextEn: input.dalilTextEn ?? '',
        tafsir: input.tafsir ?? '',
        tafsirEn: input.tafsirEn ?? '',
        isPublished: input.isPublished ?? true,
      })
      .returning();
    return mapSunnah(inserted[0]);
  } catch (error) {
    console.error('addSunnahGuide failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function updateSunnahGuideById(
  id: number,
  patch: Partial<Omit<SunnahGuideItem, 'id' | 'createdAt'>>
): Promise<SunnahGuideItem | undefined> {
  try {
    await ensureSeeded();
    const updated = await db
      .update(sunnahGuides)
      .set({
        ...(patch.guideType !== undefined ? { guideType: patch.guideType } : {}),
        ...(patch.stepOrder !== undefined ? { stepOrder: patch.stepOrder } : {}),
        ...(patch.title !== undefined ? { title: patch.title } : {}),
        ...(patch.titleEn !== undefined ? { titleEn: patch.titleEn } : {}),
        ...(patch.arabicText !== undefined ? { arabicText: patch.arabicText } : {}),
        ...(patch.latinText !== undefined ? { latinText: patch.latinText } : {}),
        ...(patch.translation !== undefined ? { translation: patch.translation } : {}),
        ...(patch.translationEn !== undefined ? { translationEn: patch.translationEn } : {}),
        ...(patch.dalilSource !== undefined ? { dalilSource: patch.dalilSource } : {}),
        ...(patch.dalilStatus !== undefined ? { dalilStatus: patch.dalilStatus } : {}),
        ...(patch.dalilText !== undefined ? { dalilText: patch.dalilText } : {}),
        ...(patch.dalilTextEn !== undefined ? { dalilTextEn: patch.dalilTextEn } : {}),
        ...(patch.tafsir !== undefined ? { tafsir: patch.tafsir } : {}),
        ...(patch.tafsirEn !== undefined ? { tafsirEn: patch.tafsirEn } : {}),
        ...(patch.isPublished !== undefined ? { isPublished: patch.isPublished } : {}),
      })
      .where(eq(sunnahGuides.id, id))
      .returning();
    return updated[0] ? mapSunnah(updated[0]) : undefined;
  } catch (error) {
    console.error('updateSunnahGuideById failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function deleteSunnahGuideById(id: number): Promise<boolean> {
  try {
    await ensureSeeded();
    const removed = await db.delete(sunnahGuides).where(eq(sunnahGuides.id, id)).returning();
    return removed.length > 0;
  } catch (error) {
    console.error('deleteSunnahGuideById failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

// ---------- Scholar Figures ----------

export async function listFigures(options?: {
  includeUnpublished?: boolean;
}): Promise<ScholarFigure[]> {
  try {
    await ensureSeeded();
    const rows = await db.select().from(scholarFigures).orderBy(asc(scholarFigures.id));
    return rows
      .filter((f) => options?.includeUnpublished || f.isPublished)
      .map(mapFigure);
  } catch (error) {
    console.error('listFigures failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function addFigure(
  input: Omit<ScholarFigure, 'id' | 'createdAt'>
): Promise<ScholarFigure> {
  try {
    await ensureSeeded();
    const normalizedName = input.name.trim().toLowerCase();
    const all = await db.select({ id: scholarFigures.id, name: scholarFigures.name }).from(scholarFigures);
    if (all.some((f) => f.name.trim().toLowerCase() === normalizedName)) {
      throw new Error('FIGURE_EXISTS');
    }

    const inserted = await db
      .insert(scholarFigures)
      .values({
        name: input.name.trim(),
        fullName: input.fullName,
        nasab: input.nasab ?? '',
        nasabEn: input.nasabEn ?? '',
        role: input.role,
        roleEn: input.roleEn ?? '',
        tabaqah: input.tabaqah ?? '',
        tabaqahEn: input.tabaqahEn ?? '',
        birthDeath: input.birthDeath ?? '',
        birthDeathEn: input.birthDeathEn ?? '',
        jarhWaTadil: input.jarhWaTadil ?? '',
        jarhWaTadilEn: input.jarhWaTadilEn ?? '',
        teachersAndStudents: input.teachersAndStudents ?? '',
        teachersAndStudentsEn: input.teachersAndStudentsEn ?? '',
        majorWorks: input.majorWorks ?? '',
        majorWorksEn: input.majorWorksEn ?? '',
        biography: input.biography,
        biographyEn: input.biographyEn ?? '',
        isPublished: input.isPublished ?? true,
      })
      .returning();
    return mapFigure(inserted[0]);
  } catch (error) {
    if (error instanceof Error && error.message === 'FIGURE_EXISTS') throw error;
    console.error('addFigure failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function updateFigureById(
  id: number,
  patch: Partial<Omit<ScholarFigure, 'id' | 'createdAt'>>
): Promise<ScholarFigure | undefined> {
  try {
    await ensureSeeded();
    const existing = await db.select().from(scholarFigures).where(eq(scholarFigures.id, id)).limit(1);
    if (!existing[0]) return undefined;

    if (patch.name !== undefined) {
      const normalizedName = patch.name.trim().toLowerCase();
      const all = await db.select({ id: scholarFigures.id, name: scholarFigures.name }).from(scholarFigures);
      if (all.some((f) => f.id !== id && f.name.trim().toLowerCase() === normalizedName)) {
        throw new Error('FIGURE_EXISTS');
      }
    }

    const updated = await db
      .update(scholarFigures)
      .set({
        ...(patch.name !== undefined ? { name: patch.name.trim() } : {}),
        ...(patch.fullName !== undefined ? { fullName: patch.fullName } : {}),
        ...(patch.nasab !== undefined ? { nasab: patch.nasab } : {}),
        ...(patch.nasabEn !== undefined ? { nasabEn: patch.nasabEn } : {}),
        ...(patch.role !== undefined ? { role: patch.role } : {}),
        ...(patch.roleEn !== undefined ? { roleEn: patch.roleEn } : {}),
        ...(patch.tabaqah !== undefined ? { tabaqah: patch.tabaqah } : {}),
        ...(patch.tabaqahEn !== undefined ? { tabaqahEn: patch.tabaqahEn } : {}),
        ...(patch.birthDeath !== undefined ? { birthDeath: patch.birthDeath } : {}),
        ...(patch.birthDeathEn !== undefined ? { birthDeathEn: patch.birthDeathEn } : {}),
        ...(patch.jarhWaTadil !== undefined ? { jarhWaTadil: patch.jarhWaTadil } : {}),
        ...(patch.jarhWaTadilEn !== undefined ? { jarhWaTadilEn: patch.jarhWaTadilEn } : {}),
        ...(patch.teachersAndStudents !== undefined
          ? { teachersAndStudents: patch.teachersAndStudents }
          : {}),
        ...(patch.teachersAndStudentsEn !== undefined
          ? { teachersAndStudentsEn: patch.teachersAndStudentsEn }
          : {}),
        ...(patch.majorWorks !== undefined ? { majorWorks: patch.majorWorks } : {}),
        ...(patch.majorWorksEn !== undefined ? { majorWorksEn: patch.majorWorksEn } : {}),
        ...(patch.biography !== undefined ? { biography: patch.biography } : {}),
        ...(patch.biographyEn !== undefined ? { biographyEn: patch.biographyEn } : {}),
        ...(patch.isPublished !== undefined ? { isPublished: patch.isPublished } : {}),
      })
      .where(eq(scholarFigures.id, id))
      .returning();
    return updated[0] ? mapFigure(updated[0]) : undefined;
  } catch (error) {
    if (error instanceof Error && error.message === 'FIGURE_EXISTS') throw error;
    console.error('updateFigureById failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function deleteFigureById(id: number): Promise<boolean> {
  try {
    await ensureSeeded();
    const removed = await db.delete(scholarFigures).where(eq(scholarFigures.id, id)).returning();
    return removed.length > 0;
  } catch (error) {
    console.error('deleteFigureById failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

// ---------- Users & Leaderboard ----------

export async function findUserById(id: number): Promise<StoredUserRecord | undefined> {
  try {
    await ensureSeeded();
    const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return rows[0] ? mapUserRecord(rows[0]) : undefined;
  } catch (error) {
    console.error('findUserById failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function findUserByUid(uid: string): Promise<StoredUserRecord | undefined> {
  try {
    await ensureSeeded();
    const rows = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
    return rows[0] ? mapUserRecord(rows[0]) : undefined;
  } catch (error) {
    console.error('findUserByUid failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function findUserByUsername(username: string): Promise<StoredUserRecord | undefined> {
  try {
    await ensureSeeded();
    const normalized = username.trim().toLowerCase();
    const rows = await db.select().from(users);
    const match = rows.find((u) => u.username.toLowerCase() === normalized);
    return match ? mapUserRecord(match) : undefined;
  } catch (error) {
    console.error('findUserByUsername failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function createUserAccount(input: {
  username: string;
  email: string;
  salt: string;
  passwordHash: string;
}): Promise<PublicLeaderboardUser> {
  try {
    await ensureSeeded();
    const normalized = input.username.trim().toLowerCase();
    const allUsers = await db.select({ username: users.username }).from(users);
    if (allUsers.some((u) => u.username.toLowerCase() === normalized)) {
      throw new Error('USERNAME_EXISTS');
    }

    const uid = `local:${normalized}`;
    const inserted = await db
      .insert(users)
      .values({
        uid,
        username: input.username.trim(),
        email: input.email.trim(),
        salt: input.salt,
        passwordHash: input.passwordHash,
      })
      .returning();

    return toPublicUser(mapUserRecord(inserted[0]));
  } catch (error) {
    if (error instanceof Error && error.message === 'USERNAME_EXISTS') throw error;
    console.error('createUserAccount failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function listLeaderboard(limit = 30): Promise<PublicLeaderboardUser[]> {
  try {
    await ensureSeeded();
    const rows = await db
      .select()
      .from(users)
      .orderBy(desc(users.points), desc(users.streakDays), desc(users.zikirCompleted), asc(users.id))
      .limit(limit);
    return rows.map((u) => toPublicUser(mapUserRecord(u)));
  } catch (error) {
    console.error('listLeaderboard failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function recordUserActivity(
  userId: number,
  type: 'zikir' | 'sunnah'
): Promise<PublicLeaderboardUser | undefined> {
  try {
    await ensureSeeded();
    const existingRows = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    const user = existingRows[0];
    if (!user) return undefined;

    let nextPoints = user.points;
    let nextZikir = user.zikirCompleted;
    let nextSunnah = user.sunnahCompleted;
    let nextStreak = user.streakDays;
    let nextLastDate = user.lastActivityDate;

    if (type === 'zikir') {
      nextZikir += 1;
      nextPoints += 10;
      const today = getLocalDateKey(0);
      const yesterday = getLocalDateKey(-1);
      if (user.lastActivityDate !== today) {
        nextStreak = user.lastActivityDate === yesterday ? user.streakDays + 1 : 1;
        nextLastDate = today;
      }
    } else {
      nextSunnah += 1;
    }

    const updated = await db
      .update(users)
      .set({
        points: nextPoints,
        zikirCompleted: nextZikir,
        sunnahCompleted: nextSunnah,
        streakDays: nextStreak,
        lastActivityDate: nextLastDate,
      })
      .where(eq(users.id, userId))
      .returning();

    return updated[0] ? toPublicUser(mapUserRecord(updated[0])) : undefined;
  } catch (error) {
    console.error('recordUserActivity failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function getUserSavedHadithIds(userId: number): Promise<number[]> {
  try {
    await ensureSeeded();
    const rows = await db
      .select({ savedHadithIds: users.savedHadithIds })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    return Array.isArray(rows[0]?.savedHadithIds) ? rows[0].savedHadithIds : [];
  } catch (error) {
    console.error('getUserSavedHadithIds failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function toggleUserBookmark(
  userId: number,
  hadithId: number
): Promise<number[] | undefined> {
  try {
    await ensureSeeded();
    const rows = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    const user = rows[0];
    if (!user) return undefined;

    const current = Array.isArray(user.savedHadithIds) ? user.savedHadithIds : [];
    const next = current.includes(hadithId)
      ? current.filter((id) => id !== hadithId)
      : [...current, hadithId];

    await db
      .update(users)
      .set({ savedHadithIds: next })
      .where(eq(users.id, userId));

    return next;
  } catch (error) {
    console.error('toggleUserBookmark failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

// ---------- Analytics & Admin Credentials ----------

export async function incrementSiteVisit(): Promise<void> {
  try {
    await ensureSeeded();
    await db
      .insert(analyticsStats)
      .values({ id: 1, siteVisits: 1, blogReads: 89, zikirCompletions: 0 })
      .onConflictDoUpdate({
        target: analyticsStats.id,
        set: { siteVisits: sql`${analyticsStats.siteVisits} + 1` },
      });
  } catch (error) {
    console.error('incrementSiteVisit failed:', error);
  }
}

export async function incrementBlogRead(blogId?: number): Promise<void> {
  try {
    await ensureSeeded();
    await db
      .insert(analyticsStats)
      .values({ id: 1, siteVisits: 1, blogReads: 90, zikirCompletions: 0 })
      .onConflictDoUpdate({
        target: analyticsStats.id,
        set: { blogReads: sql`${analyticsStats.blogReads} + 1` },
      });

    if (blogId) {
      await db
        .update(blogs)
        .set({ views: sql`${blogs.views} + 1` })
        .where(eq(blogs.id, blogId));
    }
  } catch (error) {
    console.error('incrementBlogRead failed:', error);
  }
}

export async function incrementPublicZikirCompletion(): Promise<void> {
  try {
    await ensureSeeded();
    await db
      .insert(analyticsStats)
      .values({ id: 1, siteVisits: 1, blogReads: 89, zikirCompletions: 1 })
      .onConflictDoUpdate({
        target: analyticsStats.id,
        set: { zikirCompletions: sql`${analyticsStats.zikirCompletions} + 1` },
      });
  } catch (error) {
    console.error('incrementPublicZikirCompletion failed:', error);
  }
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  try {
    await ensureSeeded();
    const [statsRows, allHadiths, allZikrs, allBlogs, allSunnah, allFigures, allUsers] =
      await Promise.all([
        db.select().from(analyticsStats).where(eq(analyticsStats.id, 1)).limit(1),
        db.select({ id: hadiths.id }).from(hadiths),
        db.select({ id: zikrs.id }).from(zikrs),
        db
          .select({ id: blogs.id, title: blogs.title, views: blogs.views })
          .from(blogs)
          .orderBy(desc(blogs.views)),
        db.select({ id: sunnahGuides.id }).from(sunnahGuides),
        db.select({ id: scholarFigures.id }).from(scholarFigures),
        db.select().from(users).orderBy(desc(users.id)),
      ]);

    const stat = statsRows[0] ?? { siteVisits: 1, blogReads: 89, zikirCompletions: 0 };

    return {
      siteVisits: stat.siteVisits,
      blogReads: stat.blogReads,
      userJoins: allUsers.length,
      zikirCompletions: stat.zikirCompletions,
      totalHadiths: allHadiths.length,
      totalZikrs: allZikrs.length,
      totalBlogs: allBlogs.length,
      totalSunnah: allSunnah.length,
      totalFigures: allFigures.length,
      topBlogs: allBlogs.slice(0, 5),
      recentUsers: allUsers.slice(0, 8).map((u) => toPublicUser(mapUserRecord(u))),
    };
  } catch (error) {
    console.error('getAnalyticsSummary failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function getAdminCredential(): Promise<StoredAdminCredential | null> {
  try {
    const rows = await db
      .select()
      .from(adminCredentials)
      .where(eq(adminCredentials.id, 1))
      .limit(1);
    if (!rows[0]) return null;
    return {
      salt: rows[0].salt,
      hash: rows[0].hash,
      claimedAt: rows[0].claimedAt.toISOString(),
    };
  } catch (error) {
    console.error('getAdminCredential failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function claimAdminCredentialAtomic(
  credential: StoredAdminCredential
): Promise<boolean> {
  try {
    const inserted = await db
      .insert(adminCredentials)
      .values({
        id: 1,
        salt: credential.salt,
        hash: credential.hash,
        claimedAt: new Date(credential.claimedAt),
      })
      .onConflictDoNothing()
      .returning();
    return inserted.length > 0;
  } catch (error) {
    console.error('claimAdminCredentialAtomic failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}
