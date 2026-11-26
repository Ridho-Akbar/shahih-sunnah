import { NextRequest, NextResponse } from 'next/server';
import { getUserSavedHadithIds } from '../../../../db/queries.ts';
import { registerLeaderboardUser } from '../../../../lib/server/auth.ts';
import { registerUserSchema } from '../../../../lib/validations/content.ts';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Payload tidak valid.' }, { status: 400 });
  }

  const parsed = registerUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || 'Validasi pendaftaran gagal.' },
      { status: 400 }
    );
  }

  try {
    const result = await registerLeaderboardUser({
      username: parsed.data.username,
      email: parsed.data.email || '',
      password: parsed.data.password,
    });
    const savedHadithIds = await getUserSavedHadithIds(result.user.id);
    return NextResponse.json({ ...result, savedHadithIds }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'USERNAME_EXISTS') {
      return NextResponse.json(
        { error: 'Username sudah digunakan. Silakan pilih username lain.' },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: 'Gagal mendaftarkan akun.' }, { status: 500 });
  }
}
