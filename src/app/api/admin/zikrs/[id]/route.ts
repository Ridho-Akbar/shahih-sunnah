import { NextRequest, NextResponse } from 'next/server';
import {
  deleteZikirById,
  findCategoryById,
  updateZikirById,
} from '../../../../../db/queries.ts';
import { requireAdminRequest } from '../../../../../lib/server/auth.ts';
import { updateZikirSchema } from '../../../../../lib/validations/content.ts';

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdminRequest(req);
  if (denied) return denied;

  const { id: rawId } = await context.params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: 'ID zikir tidak valid.' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });
  }

  const parsed = updateZikirSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || 'Validasi pembaruan zikir gagal.' },
      { status: 400 }
    );
  }

  if (parsed.data.categoryId !== undefined && !(await findCategoryById(parsed.data.categoryId))) {
    return NextResponse.json({ error: 'Kategori tidak ditemukan.' }, { status: 400 });
  }

  const updated = await updateZikirById(id, parsed.data);
  if (!updated) {
    return NextResponse.json({ error: 'Zikir tidak ditemukan.' }, { status: 404 });
  }
  return NextResponse.json({ zikir: updated });
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdminRequest(req);
  if (denied) return denied;

  const { id: rawId } = await context.params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: 'ID zikir tidak valid.' }, { status: 400 });
  }

  const removed = await deleteZikirById(id);
  if (!removed) {
    return NextResponse.json({ error: 'Zikir tidak ditemukan.' }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
