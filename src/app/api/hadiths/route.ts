import { NextRequest, NextResponse } from 'next/server';
import { listHadiths } from '../../../db/queries.ts';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const rawCat = Number(req.nextUrl.searchParams.get('categoryId'));
    const categoryId = Number.isInteger(rawCat) && rawCat > 0 ? rawCat : undefined;
    const hadiths = await listHadiths({ includeUnpublished: false, categoryId });
    return NextResponse.json({ hadiths });
  } catch {
    return NextResponse.json({ error: 'Gagal memuat koleksi hadis.' }, { status: 500 });
  }
}
