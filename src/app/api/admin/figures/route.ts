import { NextRequest, NextResponse } from 'next/server';
import { addFigure, listFigures } from '../../../../db/queries.ts';
import { requireAdminRequest } from '../../../../lib/server/auth.ts';
import { createFigureSchema } from '../../../../lib/validations/content.ts';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const denied = await requireAdminRequest(req);
  if (denied) return denied;

  const figures = await listFigures({ includeUnpublished: true });
  return NextResponse.json({ figures });
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

  const parsed = createFigureSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || 'Validasi tokoh gagal.' },
      { status: 400 }
    );
  }

  try {
    const figure = await addFigure(parsed.data);
    return NextResponse.json({ figure }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'FIGURE_EXISTS') {
      return NextResponse.json(
        { error: 'Nama tokoh/perawi tersebut sudah terdaftar.' },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: 'Gagal menyimpan data tokoh.' }, { status: 500 });
  }
}
