import { NextResponse } from 'next/server';
import { incrementSiteVisit } from '../../../../db/queries.ts';

export async function POST() {
  await incrementSiteVisit();
  return NextResponse.json({ ok: true });
}
