import { NextRequest, NextResponse } from 'next/server';
import { addBlog, findCategoryById, listBlogs } from '../../../../db/queries.ts';
import { requireAdminRequest } from '../../../../lib/server/auth.ts';
import { sanitizeHtmlServer } from '../../../../lib/server/sanitize.ts';
import { createBlogSchema } from '../../../../lib/validations/content.ts';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const denied = await requireAdminRequest(req);
  if (denied) return denied;

  const blogs = await listBlogs({ includeUnpublished: true });
  return NextResponse.json({ blogs });
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

  const parsed = createBlogSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || 'Validasi artikel gagal.' },
      { status: 400 }
    );
  }

  if (!(await findCategoryById(parsed.data.categoryId))) {
    return NextResponse.json({ error: 'Kategori tidak ditemukan.' }, { status: 400 });
  }

  try {
    const sanitizedPayload = {
      ...parsed.data,
      excerpt: sanitizeHtmlServer(parsed.data.excerpt),
      excerptEn: sanitizeHtmlServer(parsed.data.excerptEn ?? ''),
      content: sanitizeHtmlServer(parsed.data.content),
      contentEn: sanitizeHtmlServer(parsed.data.contentEn ?? ''),
    };
    const blog = await addBlog(sanitizedPayload);
    return NextResponse.json({ blog }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'SLUG_EXISTS') {
      return NextResponse.json({ error: 'Slug artikel sudah digunakan.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Gagal menyimpan artikel.' }, { status: 500 });
  }
}
