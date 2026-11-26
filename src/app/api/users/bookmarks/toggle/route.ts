import { NextRequest, NextResponse } from 'next/server';
import { toggleUserBookmark } from '../../../../../db/queries.ts';
import { resolveAuthenticatedUser } from '../../../../../lib/server/auth.ts';
import { toggleUserBookmarkSchema } from '../../../../../lib/validations/content.ts';

export async function POST(req: NextRequest) {
  const authResult = await resolveAuthenticatedUser(req);
  if ('errorResponse' in authResult) {
    return authResult.errorResponse;
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });
  }

  const parsed = toggleUserBookmarkSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || 'ID hadis tidak valid.' },
      { status: 400 }
    );
  }

  const savedHadithIds = await toggleUserBookmark(authResult.user.id, parsed.data.hadithId);
  if (!savedHadithIds) {
    return NextResponse.json({ error: 'Pengguna tidak ditemukan.' }, { status: 404 });
  }

  return NextResponse.json({ savedHadithIds });
}
