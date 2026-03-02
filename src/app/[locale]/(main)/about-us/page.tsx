import api, { Api } from "@/_lib/api/api";
import type { StaticPage } from "@/types/page.types";
import AboutUsPageContent from "./_components/AboutUsPageContent";

const ABOUT_US_SLUG = "about-us";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let page: StaticPage | null = null;

  try {
    const response = await api.get<StaticPage>(
      `${Api.routes.site.pages}/${ABOUT_US_SLUG}`
    );
    if (response?.status && response.data) {
      page = response.data;
    }
  } catch {
    // Fallback to null; content will use defaults
  }

  return <AboutUsPageContent page={page} locale={locale as "en" | "ar"} />;
}
