import { getCollection, type CollectionEntry } from 'astro:content';

export type AnyContentEntry =
  | CollectionEntry<'tutorials'>
  | CollectionEntry<'articles'>
  | CollectionEntry<'reviews'>
  | CollectionEntry<'comparisons'>
  | CollectionEntry<'commercial'>
  | CollectionEntry<'topics'>;

export async function getAllPublishedContent(): Promise<AnyContentEntry[]> {
  const [tutorials, articles, reviews, comparisons, commercial, topics] =
    await Promise.all([
      getCollection('tutorials', ({ data }) => !data.draft),
      getCollection('articles', ({ data }) => !data.draft),
      getCollection('reviews', ({ data }) => !data.draft),
      getCollection('comparisons', ({ data }) => !data.draft),
      getCollection('commercial', ({ data }) => !data.draft),
      getCollection('topics', ({ data }) => !data.draft),
    ]);

  const combined: AnyContentEntry[] = [
    ...tutorials,
    ...articles,
    ...reviews,
    ...comparisons,
    ...commercial,
    ...topics,
  ];

  return combined.sort(
    (a, b) =>
      new Date(b.data.updatedDate || b.data.pubDate).getTime() -
      new Date(a.data.updatedDate || a.data.pubDate).getTime()
  );
}

export async function getPublishedTutorials() {
  const items = await getCollection('tutorials', ({ data }) => !data.draft);
  return items.sort(
    (a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );
}

export async function getPublishedReviews() {
  const items = await getCollection('reviews', ({ data }) => !data.draft);
  return items.sort(
    (a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );
}

export async function getPublishedComparisons() {
  const items = await getCollection('comparisons', ({ data }) => !data.draft);
  return items.sort(
    (a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );
}

export function getRelatedEntries(
  currentUrl: string,
  allEntries: AnyContentEntry[],
  relatedSlugs: string[] = [],
  category?: string,
  limit = 4
): AnyContentEntry[] {
  const explicit = allEntries.filter(
    (e) =>
      e.data.urlPath !== currentUrl &&
      (relatedSlugs.includes(e.id) || relatedSlugs.includes(e.data.urlPath))
  );
  if (explicit.length >= limit) return explicit.slice(0, limit);

  const sameCat = allEntries.filter(
    (e) =>
      e.data.urlPath !== currentUrl &&
      !explicit.some((ex) => ex.data.urlPath === e.data.urlPath) &&
      (category ? e.data.category === category : true)
  );

  return [...explicit, ...sameCat].slice(0, limit);
}
