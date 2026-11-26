import { NextResponse } from 'next/server';
import { listCategories } from '../../../db/queries.ts';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const categories = await listCategories();
    return NextResponse.json({ categories });
  } catch {
    return NextResponse.json({ error: 'Gagal memuat daftar kategori.' }, { status: 500 });
  }
}
