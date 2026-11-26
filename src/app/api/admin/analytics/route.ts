import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsSummary } from '../../../../db/queries.ts';
import { requireAdminRequest } from '../../../../lib/server/auth.ts';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const denied = await requireAdminRequest(req);
  if (denied) return denied;

  const analytics = await getAnalyticsSummary();
  return NextResponse.json({ analytics });
}
