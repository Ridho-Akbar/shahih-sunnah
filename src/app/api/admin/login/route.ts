import { NextRequest, NextResponse } from 'next/server';
import {
  getAdminAuthStatus,
  issueAdminToken,
  verifyAdminPasscode,
} from '../../../../lib/server/auth.ts';
import { adminLoginSchema } from '../../../../lib/validations/content.ts';

export async function POST(req: NextRequest) {
  const status = await getAdminAuthStatus();
  if (!status.configured) {
    return NextResponse.json(
      { error: 'Kata sandi admin belum diatur. Silakan buat kata sandi terlebih dahulu.' },
      { status: 400 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });
  }

  const parsed = adminLoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || 'Validasi gagal.' },
      { status: 400 }
    );
  }

  if (!(await verifyAdminPasscode(parsed.data.passcode))) {
    return NextResponse.json({ error: 'Kata sandi admin salah.' }, { status: 401 });
  }

  const token = issueAdminToken();
  return NextResponse.json({ token });
}
