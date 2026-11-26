import { eq } from 'drizzle-orm';
import { db } from './index.ts';
import { users } from './schema.ts';

function deriveUsername(uid: string, email: string, displayName?: string): string {
  const baseSource =
    (displayName && displayName.trim()) ||
    (email && email.split('@')[0]) ||
    'mukmin';
  const cleaned = baseSource
    .toLowerCase()
    .replace(/[^a-z0-9_.-]/g, '')
    .slice(0, 16);
  const prefix = cleaned.length >= 3 ? cleaned : 'mukmin';
  const suffix = uid.slice(0, 6).toLowerCase().replace(/[^a-z0-9]/g, 'x');
  return `${prefix}_${suffix}`.slice(0, 24);
}

export async function getOrCreateUser(uid: string, email: string, displayName?: string) {
  try {
    const existing = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
    if (existing[0]) {
      if (email && existing[0].email !== email) {
        const updated = await db
          .update(users)
          .set({ email })
          .where(eq(users.uid, uid))
          .returning();
        return updated[0] ?? existing[0];
      }
      return existing[0];
    }

    const username = deriveUsername(uid, email, displayName);
    const result = await db
      .insert(users)
      .values({
        uid,
        username,
        email: email || '',
        salt: '',
        passwordHash: '',
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email: email || '',
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Database user upsert failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}
