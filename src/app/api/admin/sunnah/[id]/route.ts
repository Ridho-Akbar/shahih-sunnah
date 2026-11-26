import { NextRequest, NextResponse } from 'next/server';
import { deleteSunnahGuideById, updateSunnahGuideById } from '../../../../../db/queries.ts';
import { requireAdminRequest } from '../../../../../lib/server/auth.ts';
import { updateSunnahSchema } from '../../../../../lib/validations/content.ts';

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdminRequest(req);
  if (denied) return denied;

  const { id: rawId } = await context.params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: 'ID panduan tidak valid.' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });
  }

  const parsed = updateSunnahSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || 'Validasi pembaruan panduan gagal.' },
      { status: 400 }
    );
  }

  const updated = await updateSunnahGuideById(id, parsed.data);
  if (!updated) {
    return NextResponse.json({ error: 'Panduan tidak ditemukan.' }, { status: 404 });
  }
  return NextResponse.json({ sunnahGuide: updated });
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
    return NextResponse.json({ error: 'ID panduan tidak valid.' }, { status: 400 });
  }

  const removed = await deleteSunnahGuideById(id);
  if (!removed) {
    return NextResponse.json({ error: 'Panduan tidak ditemukan.' }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
