import { NextRequest, NextResponse } from 'next/server';
import { listSunnahGuides } from '../../../db/queries.ts';
import type { SunnahGuideType } from '../../../lib/validations/content.ts';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const typeParam = req.nextUrl.searchParams.get('guideType') ?? '';
    const guideType =
      typeParam === 'sholat' || typeParam === 'kebiasaan'
        ? (typeParam as SunnahGuideType)
        : undefined;
    const sunnahGuides = await listSunnahGuides({ includeUnpublished: false, guideType });
    return NextResponse.json({ sunnahGuides });
  } catch {
    return NextResponse.json({ error: 'Gagal memuat panduan sunnah.' }, { status: 500 });
  }
}
