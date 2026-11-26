import { NextResponse } from 'next/server';
import { listLeaderboard } from '../../../db/queries.ts';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const leaderboard = await listLeaderboard();
    return NextResponse.json({ leaderboard });
  } catch {
    return NextResponse.json({ error: 'Gagal memuat papan peringkat.' }, { status: 500 });
  }
}
