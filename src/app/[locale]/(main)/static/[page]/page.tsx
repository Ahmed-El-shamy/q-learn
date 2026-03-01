import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import SimpleContentPage from "../../_components/SimpleContentPage";
import { isStaticPageSlug } from "../_config/staticPages";

interface PageProps {
  params: Promise<{ page: string }>;
}

export default async function Page({ params }: PageProps) {
  const { page } = await params;

  if (!isStaticPageSlug(page)) {
    notFound();
  }

  const t = await getTranslations("staticPages");
  const title = t(`${page}.title`);
  const description = t(`${page}.description`);

  return <SimpleContentPage title={title} description={description} />;
}
