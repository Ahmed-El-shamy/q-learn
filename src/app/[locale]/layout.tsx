import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "../../i18n/routing";
import LocaleProviders from "@/_components/local-providers/LocaleProviders";
import { getDefaultSiteMeta, buildMetadata } from "@/_lib/meta";
import AppSessionProvider from "@/_components/common/SessionProvider";
import "@/styles/globals.css";
import { Toaster } from "sonner";
import { Metadata } from "next";
import { getSettings } from "@/_lib/server/getSettings";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const messages = (await import(`@/messages/${locale}.json`)).default;
  const siteMeta = getDefaultSiteMeta(messages);

  const settings = await getSettings();

  return buildMetadata(
    {
      title: settings?.seo_meta_title || messages?.PageMetaData?.contact?.title,
      description:
        settings?.seo_meta_description ||
        messages?.PageMetaData?.contact?.description,
      keywords: settings?.seo_meta_keywords || messages?.SEO?.keywords,
      image: settings?.og_image || "",
      url: "https://q-learn.dev.qutell.net",
      type: "website",
    },
    siteMeta
  );
}
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <AppSessionProvider>
          <LocaleProviders locale={locale} messages={messages}>
            <main>{children}</main>
            <Toaster position="top-center" />
          </LocaleProviders>
        </AppSessionProvider>
      </body>
    </html>
  );
}
