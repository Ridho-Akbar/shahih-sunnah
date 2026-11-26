import { NextRequest, NextResponse } from 'next/server';
import { listBlogs } from '../../../db/queries.ts';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const rawCat = Number(req.nextUrl.searchParams.get('categoryId'));
    const categoryId = Number.isInteger(rawCat) && rawCat > 0 ? rawCat : undefined;
    const blogs = await listBlogs({ includeUnpublished: false, categoryId });
    return NextResponse.json({ blogs });
  } catch {
    return NextResponse.json({ error: 'Gagal memuat artikel blog.' }, { status: 500 });
  }
}
