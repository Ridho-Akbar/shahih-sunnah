import { NextRequest, NextResponse } from 'next/server';
import { deleteFigureById, updateFigureById } from '../../../../../db/queries.ts';
import { requireAdminRequest } from '../../../../../lib/server/auth.ts';
import { updateFigureSchema } from '../../../../../lib/validations/content.ts';

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdminRequest(req);
  if (denied) return denied;

  const { id: rawId } = await context.params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: 'ID tokoh tidak valid.' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });
  }

  const parsed = updateFigureSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || 'Validasi pembaruan tokoh gagal.' },
      { status: 400 }
    );
  }

  try {
    const updated = await updateFigureById(id, parsed.data);
    if (!updated) {
      return NextResponse.json({ error: 'Tokoh tidak ditemukan.' }, { status: 404 });
    }
    return NextResponse.json({ figure: updated });
  } catch (error) {
    if (error instanceof Error && error.message === 'FIGURE_EXISTS') {
      return NextResponse.json(
        { error: 'Nama tokoh/perawi tersebut sudah terdaftar.' },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: 'Gagal memperbarui data tokoh.' }, { status: 500 });
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
    return NextResponse.json({ error: 'ID tokoh tidak valid.' }, { status: 400 });
  }

  const removed = await deleteFigureById(id);
  if (!removed) {
    return NextResponse.json({ error: 'Tokoh tidak ditemukan.' }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
