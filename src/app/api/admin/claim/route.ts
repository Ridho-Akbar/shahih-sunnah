import { NextRequest, NextResponse } from 'next/server';
import {
  claimInitialAdminPassword,
  getAdminAuthStatus,
  issueAdminToken,
} from '../../../../lib/server/auth.ts';
import { adminClaimSchema } from '../../../../lib/validations/content.ts';

export async function POST(req: NextRequest) {
  const status = await getAdminAuthStatus();
  if (status.configured) {
    return NextResponse.json({ error: 'Kata sandi admin sudah dikonfigurasi.' }, { status: 409 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });
  }

  const parsed = adminClaimSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || 'Validasi gagal.' },
      { status: 400 }
    );
  }

  const claimed = await claimInitialAdminPassword(parsed.data.passcode);
  if (!claimed) {
    return NextResponse.json({ error: 'Kata sandi admin sudah diklaim sebelumnya.' }, { status: 409 });
  }

  const token = issueAdminToken();
  return NextResponse.json({ token }, { status: 201 });
}
