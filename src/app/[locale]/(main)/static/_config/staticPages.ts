/**
 * Valid slugs for /static/[page]. Used to validate the dynamic segment and 404 unknown pages.
 */
export const STATIC_PAGE_SLUGS = [
  "unlock-your-potential",
  "privacy-policy",
  "sitemap",
  "featured-courses",
  "join-us",
  "learn",
  "teach",
  "git-the-app",
  "careers",
  "blog",
  "help",
  "terms",
  "certificate",
  "free-course",
] as const;

export type StaticPageSlug = (typeof STATIC_PAGE_SLUGS)[number];

export function isStaticPageSlug(slug: string): slug is StaticPageSlug {
  return (STATIC_PAGE_SLUGS as readonly string[]).includes(slug);
}
