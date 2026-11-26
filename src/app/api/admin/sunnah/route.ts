import { NextRequest, NextResponse } from 'next/server';
import { addSunnahGuide, listSunnahGuides } from '../../../../db/queries.ts';
import { requireAdminRequest } from '../../../../lib/server/auth.ts';
import { createSunnahSchema } from '../../../../lib/validations/content.ts';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const denied = await requireAdminRequest(req);
  if (denied) return denied;

  const sunnahGuides = await listSunnahGuides({ includeUnpublished: true });
  return NextResponse.json({ sunnahGuides });
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

  const parsed = createSunnahSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || 'Validasi panduan sunnah gagal.' },
      { status: 400 }
    );
  }

  const item = await addSunnahGuide(parsed.data);
  return NextResponse.json({ sunnahGuide: item }, { status: 201 });
}
