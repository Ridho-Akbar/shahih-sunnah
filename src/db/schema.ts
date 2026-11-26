import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  nameEn: text('name_en').notNull().default(''),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const zikrs = pgTable('zikrs', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id')
    .references(() => categories.id, { onDelete: 'restrict' })
    .notNull(),
  title: text('title').notNull(),
  titleEn: text('title_en').notNull().default(''),
  arabicText: text('arabic_text').notNull(),
  latinText: text('latin_text').notNull().default(''),
  translation: text('translation').notNull(),
  translationEn: text('translation_en').notNull().default(''),
  reference: text('reference').notNull().default(''),
  dalilSource: text('dalil_source').notNull().default(''),
  dalilStatus: text('dalil_status').notNull().default('Shahih'),
  dalilText: text('dalil_text').notNull().default(''),
  dalilTextEn: text('dalil_text_en').notNull().default(''),
  tafsir: text('tafsir').notNull().default(''),
  tafsirEn: text('tafsir_en').notNull().default(''),
  repeatCount: integer('repeat_count').notNull().default(1),
  timeOfDay: text('time_of_day').notNull().default('umum'),
  isPublished: boolean('is_published').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const hadiths = pgTable('hadiths', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id')
    .references(() => categories.id, { onDelete: 'restrict' })
    .notNull(),
  title: text('title').notNull(),
  titleEn: text('title_en').notNull().default(''),
  arabicText: text('arabic_text').notNull().default(''),
  latinText: text('latin_text').notNull().default(''),
  translation: text('translation').notNull(),
  translationEn: text('translation_en').notNull().default(''),
  source: text('source').notNull().default(''),
  narrator: text('narrator').notNull().default(''),
  dalilStatus: text('dalil_status').notNull().default('Shahih'),
  dalilText: text('dalil_text').notNull().default(''),
  dalilTextEn: text('dalil_text_en').notNull().default(''),
  tafsir: text('tafsir').notNull().default(''),
  tafsirEn: text('tafsir_en').notNull().default(''),
  isPublished: boolean('is_published').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const blogs = pgTable('blogs', {
  id: serial('id').primaryKey(),
  categoryId: integer('category_id')
    .references(() => categories.id, { onDelete: 'restrict' })
    .notNull(),
  title: text('title').notNull(),
  titleEn: text('title_en').notNull().default(''),
  slug: text('slug').notNull().unique(),
  imageUrl: text('image_url').notNull().default(''),
  excerpt: text('excerpt').notNull(),
  excerptEn: text('excerpt_en').notNull().default(''),
  content: text('content').notNull(),
  contentEn: text('content_en').notNull().default(''),
  author: text('author').notNull(),
  readingTimeMinutes: integer('reading_time_minutes').notNull().default(4),
  views: integer('views').notNull().default(0),
  isPublished: boolean('is_published').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const sunnahGuides = pgTable('sunnah_guides', {
  id: serial('id').primaryKey(),
  guideType: text('guide_type').notNull().default('sholat'),
  stepOrder: integer('step_order').notNull().default(1),
  title: text('title').notNull(),
  titleEn: text('title_en').notNull().default(''),
  arabicText: text('arabic_text').notNull().default(''),
  latinText: text('latin_text').notNull().default(''),
  translation: text('translation').notNull(),
  translationEn: text('translation_en').notNull().default(''),
  dalilSource: text('dalil_source').notNull().default(''),
  dalilStatus: text('dalil_status').notNull().default('Shahih'),
  dalilText: text('dalil_text').notNull().default(''),
  dalilTextEn: text('dalil_text_en').notNull().default(''),
  tafsir: text('tafsir').notNull().default(''),
  tafsirEn: text('tafsir_en').notNull().default(''),
  isPublished: boolean('is_published').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const scholarFigures = pgTable('scholar_figures', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  fullName: text('full_name').notNull(),
  nasab: text('nasab').notNull().default(''),
  nasabEn: text('nasab_en').notNull().default(''),
  role: text('role').notNull(),
  roleEn: text('role_en').notNull().default(''),
  tabaqah: text('tabaqah').notNull().default(''),
  tabaqahEn: text('tabaqah_en').notNull().default(''),
  birthDeath: text('birth_death').notNull().default(''),
  birthDeathEn: text('birth_death_en').notNull().default(''),
  jarhWaTadil: text('jarh_wa_tadil').notNull().default(''),
  jarhWaTadilEn: text('jarh_wa_tadil_en').notNull().default(''),
  teachersAndStudents: text('teachers_and_students').notNull().default(''),
  teachersAndStudentsEn: text('teachers_and_students_en').notNull().default(''),
  majorWorks: text('major_works').notNull().default(''),
  majorWorksEn: text('major_works_en').notNull().default(''),
  biography: text('biography').notNull(),
  biographyEn: text('biography_en').notNull().default(''),
  isPublished: boolean('is_published').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().default(''),
  salt: text('salt').notNull().default(''),
  passwordHash: text('password_hash').notNull().default(''),
  points: integer('points').notNull().default(0),
  zikirCompleted: integer('zikir_completed').notNull().default(0),
  sunnahCompleted: integer('sunnah_completed').notNull().default(0),
  streakDays: integer('streak_days').notNull().default(0),
  lastActivityDate: text('last_activity_date'),
  savedHadithIds: jsonb('saved_hadith_ids').$type<number[]>().notNull().default([]),
  joinedAt: timestamp('joined_at').notNull().defaultNow(),
});

export const analyticsStats = pgTable('analytics_stats', {
  id: integer('id').primaryKey().default(1),
  siteVisits: integer('site_visits').notNull().default(1),
  blogReads: integer('blog_reads').notNull().default(89),
  zikirCompletions: integer('zikir_completions').notNull().default(0),
});

export const adminCredentials = pgTable('admin_credentials', {
  id: integer('id').primaryKey().default(1),
  salt: text('salt').notNull(),
  hash: text('hash').notNull(),
  claimedAt: timestamp('claimed_at').notNull().defaultNow(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  zikrs: many(zikrs),
  hadiths: many(hadiths),
  blogs: many(blogs),
}));

export const zikrsRelations = relations(zikrs, ({ one }) => ({
  category: one(categories, {
    fields: [zikrs.categoryId],
    references: [categories.id],
  }),
}));

export const hadithsRelations = relations(hadiths, ({ one }) => ({
  category: one(categories, {
    fields: [hadiths.categoryId],
    references: [categories.id],
  }),
}));

export const blogsRelations = relations(blogs, ({ one }) => ({
  category: one(categories, {
    fields: [blogs.categoryId],
    references: [categories.id],
  }),
}));
