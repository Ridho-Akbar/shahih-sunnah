import { NextRequest, NextResponse } from 'next/server';
import {
  deleteBlogById,
  findCategoryById,
  updateBlogById,
} from '../../../../../db/queries.ts';
import { requireAdminRequest } from '../../../../../lib/server/auth.ts';
import { sanitizeHtmlServer } from '../../../../../lib/server/sanitize.ts';
import { updateBlogSchema } from '../../../../../lib/validations/content.ts';

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdminRequest(req);
  if (denied) return denied;

  const { id: rawId } = await context.params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: 'ID artikel tidak valid.' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });
  }

  const parsed = updateBlogSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || 'Validasi pembaruan artikel gagal.' },
      { status: 400 }
    );
  }

  if (parsed.data.categoryId !== undefined && !(await findCategoryById(parsed.data.categoryId))) {
    return NextResponse.json({ error: 'Kategori tidak ditemukan.' }, { status: 400 });
  }

  try {
    const sanitizedPatch = {
      ...parsed.data,
      ...(parsed.data.excerpt !== undefined
        ? { excerpt: sanitizeHtmlServer(parsed.data.excerpt) }
        : {}),
      ...(parsed.data.excerptEn !== undefined
        ? { excerptEn: sanitizeHtmlServer(parsed.data.excerptEn) }
        : {}),
      ...(parsed.data.content !== undefined
        ? { content: sanitizeHtmlServer(parsed.data.content) }
        : {}),
      ...(parsed.data.contentEn !== undefined
        ? { contentEn: sanitizeHtmlServer(parsed.data.contentEn) }
        : {}),
    };
    const updated = await updateBlogById(id, sanitizedPatch);
    if (!updated) {
      return NextResponse.json({ error: 'Artikel tidak ditemukan.' }, { status: 404 });
    }
    return NextResponse.json({ blog: updated });
  } catch (error) {
    if (error instanceof Error && error.message === 'SLUG_EXISTS') {
      return NextResponse.json({ error: 'Slug artikel sudah digunakan.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Gagal memperbarui artikel.' }, { status: 500 });
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
    return NextResponse.json({ error: 'ID artikel tidak valid.' }, { status: 400 });
  }

  const removed = await deleteBlogById(id);
  if (!removed) {
    return NextResponse.json({ error: 'Artikel tidak ditemukan.' }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
