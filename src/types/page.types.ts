/**
 * Types for GET /pages/{slug} (Website/Pages).
 * Response shape for static CMS pages with localized content and sections.
 */

/** Localized string (ar / en) */
export interface LocalizedText {
  ar: string | null;
  en: string | null;
}

/** A single statistic in a section (e.g. "1200+", "Trained Students") */
export interface PageSectionStatic {
  number: string;
  sort_order: number;
  label: LocalizedText;
}

/** A section of a static page (overview, vision, mission, statistics, etc.) */
export interface PageSection {
  key: string;
  is_active: boolean;
  sort_order: number;
  title: LocalizedText;
  content: LocalizedText;
  button_text: LocalizedText | null;
  button_url: string | null;
  media_url: string | null;
  statics: PageSectionStatic[];
}

/** Static page response from GET /pages/{slug} */
export interface StaticPage {
  id: number;
  slug: string;
  title: LocalizedText;
  sections: PageSection[];
}
