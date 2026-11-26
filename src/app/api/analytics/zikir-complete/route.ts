import { NextResponse } from 'next/server';
import { incrementPublicZikirCompletion } from '../../../../db/queries.ts';

export async function POST() {
  await incrementPublicZikirCompletion();
  return NextResponse.json({ ok: true });
}
