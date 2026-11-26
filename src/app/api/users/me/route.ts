import { NextRequest, NextResponse } from 'next/server';
import { resolveAuthenticatedUser, toPublicUser } from '../../../../lib/server/auth.ts';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const authResult = await resolveAuthenticatedUser(req);
  if ('errorResponse' in authResult) {
    return authResult.errorResponse;
  }

  return NextResponse.json({
    user: toPublicUser(authResult.user),
    savedHadithIds: authResult.user.savedHadithIds ?? [],
  });
}
