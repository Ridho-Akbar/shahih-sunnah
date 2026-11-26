import { NextRequest, NextResponse } from 'next/server';
import { loginLeaderboardUser, toPublicUser } from '../../../../lib/server/auth.ts';
import { loginUserSchema } from '../../../../lib/validations/content.ts';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });
  }

  const parsed = loginUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || 'Validasi login gagal.' },
      { status: 400 }
    );
  }

  try {
    const authResult = await loginLeaderboardUser(parsed.data.username, parsed.data.password);
    if (!authResult) {
      return NextResponse.json({ error: 'Username atau kata sandi salah.' }, { status: 401 });
    }

    return NextResponse.json({
      user: toPublicUser(authResult.user),
      token: authResult.token,
      savedHadithIds: authResult.user.savedHadithIds ?? [],
    });
  } catch {
    return NextResponse.json({ error: 'Gagal masuk ke akun.' }, { status: 500 });
  }
}
