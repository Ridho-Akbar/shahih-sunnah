import { NextRequest, NextResponse } from 'next/server';
import { recordUserActivity } from '../../../../db/queries.ts';
import { resolveAuthenticatedUser } from '../../../../lib/server/auth.ts';
import { userActivitySchema } from '../../../../lib/validations/content.ts';

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

  const parsed = userActivitySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Jenis aktivitas tidak valid.' }, { status: 400 });
  }

  const updated = await recordUserActivity(authResult.user.id, parsed.data.type);
  if (!updated) {
    return NextResponse.json({ error: 'Pengguna tidak ditemukan.' }, { status: 404 });
  }
  return NextResponse.json({ user: updated });
}
