import { NextRequest, NextResponse } from 'next/server';
import { incrementBlogRead } from '../../../../db/queries.ts';

export async function POST(req: NextRequest) {
  let blogId: number | undefined;
  try {
    const body = (await req.json()) as { blogId?: unknown };
    const parsed = Number(body?.blogId);
    if (Number.isInteger(parsed) && parsed > 0) {
      blogId = parsed;
    }
  } catch {
    // Ignore malformed optional body
  }
  await incrementBlogRead(blogId);
  return NextResponse.json({ ok: true });
}
