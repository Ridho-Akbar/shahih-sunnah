import { NextRequest, NextResponse } from 'next/server';
import { getAdminAuthStatus, isAdminAuthorized } from '../../../../lib/server/auth.ts';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const status = await getAdminAuthStatus();
  const authenticated = await isAdminAuthorized(req);
  return NextResponse.json({ ...status, authenticated });
}
