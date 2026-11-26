import { NextRequest, NextResponse } from 'next/server';
import { addHadith, findCategoryById, listHadiths } from '../../../../db/queries.ts';
import { requireAdminRequest } from '../../../../lib/server/auth.ts';
import { createHadithSchema } from '../../../../lib/validations/content.ts';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const denied = await requireAdminRequest(req);
  if (denied) return denied;

  const hadiths = await listHadiths({ includeUnpublished: true });
  return NextResponse.json({ hadiths });
}

export async function POST(req: NextRequest) {
  const denied = await requireAdminRequest(req);
  if (denied) return denied;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });
  }

  const parsed = createHadithSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || 'Validasi hadis gagal.' },
      { status: 400 }
    );
  }

  if (!(await findCategoryById(parsed.data.categoryId))) {
    return NextResponse.json({ error: 'Kategori tidak ditemukan.' }, { status: 400 });
  }

  const hadith = await addHadith(parsed.data);
  return NextResponse.json({ hadith }, { status: 201 });
}
