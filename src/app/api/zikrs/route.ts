import { NextRequest, NextResponse } from 'next/server';
import { listZikrs } from '../../../db/queries.ts';
import type { TimeOfDay } from '../../../lib/validations/content.ts';

export const dynamic = 'force-dynamic';

const VALID_ZIKIR_TIMES = new Set<string>(['pagi', 'petang', 'setelah-sholat', 'umum', 'khusus']);

export async function GET(req: NextRequest) {
  try {
    const timeParam = req.nextUrl.searchParams.get('timeOfDay') ?? '';
    const timeOfDay = VALID_ZIKIR_TIMES.has(timeParam) ? (timeParam as TimeOfDay) : undefined;
    const zikrs = await listZikrs({ includeUnpublished: false, timeOfDay });
    return NextResponse.json({ zikrs });
  } catch {
    return NextResponse.json({ error: 'Gagal memuat kumpulan zikir.' }, { status: 500 });
  }
}
