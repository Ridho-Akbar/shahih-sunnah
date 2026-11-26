import { NextRequest, NextResponse } from 'next/server';
import { addZikir, findCategoryById, listZikrs } from '../../../../db/queries.ts';
import { requireAdminRequest } from '../../../../lib/server/auth.ts';
import { createZikirSchema } from '../../../../lib/validations/content.ts';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const denied = await requireAdminRequest(req);
  if (denied) return denied;

  const zikrs = await listZikrs({ includeUnpublished: true });
  return NextResponse.json({ zikrs });
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

  const parsed = createZikirSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || 'Validasi zikir gagal.' },
      { status: 400 }
    );
  }

  if (!(await findCategoryById(parsed.data.categoryId))) {
    return NextResponse.json({ error: 'Kategori tidak ditemukan.' }, { status: 400 });
  }

  const zikir = await addZikir(parsed.data);
  return NextResponse.json({ zikir }, { status: 201 });
}
