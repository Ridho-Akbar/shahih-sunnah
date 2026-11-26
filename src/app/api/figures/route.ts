import { NextResponse } from 'next/server';
import { listFigures } from '../../../db/queries.ts';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const figures = await listFigures({ includeUnpublished: false });
    return NextResponse.json({ figures });
  } catch {
    return NextResponse.json({ error: 'Gagal memuat daftar tokoh dan perawi.' }, { status: 500 });
  }
}
