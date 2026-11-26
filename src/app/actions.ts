'use server';

import {
  incrementBlogRead,
  incrementPublicZikirCompletion,
  incrementSiteVisit,
  listBlogs,
  listCategories,
  listFigures,
  listHadiths,
  listSunnahGuides,
  listZikrs,
} from '../db/queries.ts';

export async function getPublicContentAction() {
  const [categories, zikrs, hadiths, sunnahGuides, blogs, figures] = await Promise.all([
    listCategories(),
    listZikrs({ includeUnpublished: false }),
    listHadiths({ includeUnpublished: false }),
    listSunnahGuides({ includeUnpublished: false }),
    listBlogs({ includeUnpublished: false }),
    listFigures({ includeUnpublished: false }),
  ]);

  return { categories, zikrs, hadiths, sunnahGuides, blogs, figures };
}

export async function trackSiteVisitAction(): Promise<void> {
  await incrementSiteVisit();
}

export async function trackBlogReadAction(blogId?: number): Promise<void> {
  const validId = typeof blogId === 'number' && Number.isInteger(blogId) && blogId > 0 ? blogId : undefined;
  await incrementBlogRead(validId);
}

export async function trackZikirCompleteAction(): Promise<void> {
  await incrementPublicZikirCompletion();
}
