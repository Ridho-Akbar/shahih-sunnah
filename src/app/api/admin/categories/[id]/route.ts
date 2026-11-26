import { NextRequest, NextResponse } from 'next/server';
import { deleteCategoryById, updateCategoryById } from '../../../../../db/queries.ts';
import { requireAdminRequest } from '../../../../../lib/server/auth.ts';
import { updateCategorySchema } from '../../../../../lib/validations/content.ts';

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdminRequest(req);
  if (denied) return denied;

  const { id: rawId } = await context.params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: 'ID kategori tidak valid.' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });
  }

  const parsed = updateCategorySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || 'Validasi kategori gagal.' },
      { status: 400 }
    );
  }

  try {
    const updated = await updateCategoryById(id, parsed.data);
    if (!updated) {
      return NextResponse.json({ error: 'Kategori tidak ditemukan.' }, { status: 404 });
    }
    return NextResponse.json({ category: updated });
  } catch (error) {
    if (error instanceof Error && error.message === 'SLUG_EXISTS') {
      return NextResponse.json({ error: 'Slug kategori sudah digunakan.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Gagal memperbarui kategori.' }, { status: 500 });
  }
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
    return NextResponse.json({ error: 'ID kategori tidak valid.' }, { status: 400 });
  }

  try {
    const removed = await deleteCategoryById(id);
    if (!removed) {
      return NextResponse.json({ error: 'Kategori tidak ditemukan.' }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Error && error.message === 'CATEGORY_IN_USE') {
      return NextResponse.json(
        {
          error:
            'Kategori masih digunakan oleh hadis, zikir, atau blog. Pindahkan item terlebih dahulu.',
        },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: 'Gagal menghapus kategori.' }, { status: 500 });
  }
}
