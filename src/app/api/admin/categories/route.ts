import { NextRequest, NextResponse } from 'next/server';
import { addCategory } from '../../../../db/queries.ts';
import { requireAdminRequest } from '../../../../lib/server/auth.ts';
import { createCategorySchema } from '../../../../lib/validations/content.ts';

export async function POST(req: NextRequest) {
  const denied = await requireAdminRequest(req);
  if (denied) return denied;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });
  }

  const parsed = createCategorySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || 'Validasi kategori gagal.' },
      { status: 400 }
    );
  }

  try {
    const category = await addCategory(parsed.data);
    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'SLUG_EXISTS') {
      return NextResponse.json({ error: 'Slug kategori sudah digunakan.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Gagal menyimpan kategori.' }, { status: 500 });
  }
}
