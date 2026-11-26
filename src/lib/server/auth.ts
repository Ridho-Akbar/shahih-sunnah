import crypto from 'node:crypto';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import {
  claimAdminCredentialAtomic,
  createUserAccount,
  findUserById,
  findUserByUsername,
  getAdminCredential,
  toPublicUser,
  type StoredUserRecord,
} from '../../db/queries.ts';
import { getOrCreateUser } from '../../db/users.ts';
import { createClient } from '../supabase-server.ts';
import type { PublicLeaderboardUser } from '../validations/content.ts';

const FALLBACK_SESSION_SECRET = crypto.randomBytes(32);

function getSigningKey(): Buffer {
  const envSecret = process.env.SESSION_SECRET?.trim();
  if (envSecret && envSecret.length >= 16) {
    return crypto.createHash('sha256').update(envSecret).digest();
  }
  return FALLBACK_SESSION_SECRET;
}

export function getAuthorizedAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAIL?.trim() || 'ridho8977@gmail.com';
  return raw
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export async function getAdminAuthStatus(): Promise<{
  configured: boolean;
  mode: 'env' | 'claimed' | 'unclaimed';
}> {
  const envPasscode = process.env.ADMIN_PASSCODE?.trim();
  if (envPasscode && envPasscode.length > 0) {
    return { configured: true, mode: 'env' };
  }
  const saved = await getAdminCredential();
  if (saved) {
    return { configured: true, mode: 'claimed' };
  }
  return { configured: false, mode: 'unclaimed' };
}

function hashPassword(password: string, salt: string): Buffer {
  return crypto.scryptSync(password, salt, 64);
}

export async function claimInitialAdminPassword(password: string): Promise<boolean> {
  const envPasscode = process.env.ADMIN_PASSCODE?.trim();
  if (envPasscode && envPasscode.length > 0) {
    return false;
  }
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = hashPassword(password, salt).toString('hex');
  return claimAdminCredentialAtomic({
    salt,
    hash,
    claimedAt: new Date().toISOString(),
  });
}

export async function verifyAdminPasscode(passcode: string): Promise<boolean> {
  const envPasscode = process.env.ADMIN_PASSCODE?.trim();
  if (envPasscode && envPasscode.length > 0) {
    const providedDigest = crypto.createHash('sha256').update(passcode).digest();
    const expectedDigest = crypto.createHash('sha256').update(envPasscode).digest();
    return crypto.timingSafeEqual(providedDigest, expectedDigest);
  }

  const saved = await getAdminCredential();
  if (!saved) return false;

  const derived = hashPassword(passcode, saved.salt);
  const expected = Buffer.from(saved.hash, 'hex');
  if (derived.length !== expected.length) return false;
  return crypto.timingSafeEqual(derived, expected);
}

interface TokenPayload {
  role: 'admin' | 'user';
  userId?: number;
  iat: number;
  exp: number;
}

function signPayload(payload: TokenPayload): string {
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', getSigningKey())
    .update(encodedPayload)
    .digest('base64url');
  return `${encodedPayload}.${signature}`;
}

function verifyToken(token: string, expectedRole: 'admin' | 'user'): TokenPayload | null {
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [encodedPayload, providedSignature] = parts;
  if (!encodedPayload || !providedSignature) return null;

  const expectedSignature = crypto
    .createHmac('sha256', getSigningKey())
    .update(encodedPayload)
    .digest('base64url');

  const sigA = Buffer.from(providedSignature);
  const sigB = Buffer.from(expectedSignature);
  if (sigA.length !== sigB.length || !crypto.timingSafeEqual(sigA, sigB)) {
    return null;
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf8')
    ) as TokenPayload;
    if (parsed.role !== expectedRole || typeof parsed.exp !== 'number') {
      return null;
    }
    if (Math.floor(Date.now() / 1000) >= parsed.exp) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function issueAdminToken(): string {
  const now = Math.floor(Date.now() / 1000);
  return signPayload({
    role: 'admin',
    iat: now,
    exp: now + 60 * 60 * 12,
  });
}

export function verifyAdminToken(token: string): TokenPayload | null {
  return verifyToken(token, 'admin');
}

export function extractBearerToken(req: NextRequest): string | null {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.slice('Bearer '.length).trim();
  return token || null;
}

export async function isAdminAuthorized(req: NextRequest): Promise<boolean> {
  const token = extractBearerToken(req);
  if (!token) return false;

  if (verifyAdminToken(token)) {
    return true;
  }

  try {
    const supabase = await createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser(token);

    if (!authUser || !authUser.email) {
      return false;
    }

    const email = authUser.email.trim().toLowerCase();
    const allowedEmails = getAuthorizedAdminEmails();
    if (allowedEmails.includes(email)) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export async function requireAdminRequest(
  req: NextRequest
): Promise<NextResponse | null> {
  const ok = await isAdminAuthorized(req);
  if (!ok) {
    return NextResponse.json(
      { error: 'Sesi admin diperlukan atau tidak valid. Silakan masuk terlebih dahulu.' },
      { status: 401 }
    );
  }
  return null;
}

export async function registerLeaderboardUser(input: {
  username: string;
  email: string;
  password: string;
}): Promise<{ user: PublicLeaderboardUser; token: string }> {
  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(input.password, salt).toString('hex');
  const user = await createUserAccount({
    username: input.username,
    email: input.email,
    salt,
    passwordHash,
  });
  const now = Math.floor(Date.now() / 1000);
  const token = signPayload({
    role: 'user',
    userId: user.id,
    iat: now,
    exp: now + 60 * 60 * 24 * 7,
  });
  return { user, token };
}

export async function loginLeaderboardUser(
  username: string,
  password: string
): Promise<{ user: StoredUserRecord; token: string } | null> {
  const record = await findUserByUsername(username);
  if (!record || !record.salt || !record.passwordHash) return null;

  const derived = hashPassword(password, record.salt);
  const expected = Buffer.from(record.passwordHash, 'hex');
  if (derived.length !== expected.length || !crypto.timingSafeEqual(derived, expected)) {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  const token = signPayload({
    role: 'user',
    userId: record.id,
    iat: now,
    exp: now + 60 * 60 * 24 * 7,
  });
  return { user: record, token };
}

export async function resolveAuthenticatedUser(
  req: NextRequest
): Promise<{ user: StoredUserRecord } | { errorResponse: NextResponse }> {
  const token = extractBearerToken(req);
  if (!token) {
    return {
      errorResponse: NextResponse.json(
        { error: 'Silakan masuk ke akun peringkat terlebih dahulu.' },
        { status: 401 }
      ),
    };
  }

  const localPayload = verifyToken(token, 'user');
  if (localPayload && typeof localPayload.userId === 'number') {
    const user = await findUserById(localPayload.userId);
    if (!user) {
      return {
        errorResponse: NextResponse.json({ error: 'Pengguna tidak ditemukan.' }, { status: 404 }),
      };
    }
    return { user };
  }

  try {
    const supabase = await createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser(token);
    if (!authUser) throw new Error('Invalid token');

    const synced = await getOrCreateUser(
      authUser.id,
      authUser.email ?? '',
      authUser.user_metadata.full_name as string | undefined
    );
    const record: StoredUserRecord = {
      id: synced.id,
      uid: synced.uid,
      username: synced.username,
      email: synced.email,
      salt: synced.salt,
      passwordHash: synced.passwordHash,
      points: synced.points,
      zikirCompleted: synced.zikirCompleted,
      sunnahCompleted: synced.sunnahCompleted,
      streakDays: synced.streakDays,
      lastActivityDate: synced.lastActivityDate ?? null,
      savedHadithIds: Array.isArray(synced.savedHadithIds) ? synced.savedHadithIds : [],
      joinedAt: synced.joinedAt.toISOString(),
    };
    return { user: record };
  } catch {
    return {
      errorResponse: NextResponse.json(
        { error: 'Sesi pengguna tidak valid atau telah berakhir.' },
        { status: 401 }
      ),
    };
  }
}

export { toPublicUser };
