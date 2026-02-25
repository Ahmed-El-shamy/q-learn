import Footer from "@/_components/layout/footerHome/Footer";
import Navbar from "@/_components/layout/navbar/common/Navbar";
import MobileWidget from "@/_components/layout/mobile-widget/MobileWidget";
import "@/styles/globals.css";
import LanguageSwitcher from "@/_components/lang/LanguageSwitcher";
import ScrollToTop from "@/_components/common/ScrollToTop";
import { Suspense } from "react";
import NavbarSkeleton from "@/_components/common/loaders/skeltons/NavbarSkeleton";
import "keen-slider/keen-slider.min.css";
import { getSettings } from "@/_lib/server/getSettings";
import { getLocale } from "next-intl/server";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  const locale = await getLocale();
  const isAr = locale === "ar";
  const websiteTitle = isAr
    ? (settings?.site_name_ar ?? settings?.site_name)
    : settings?.site_name;
  const slogan = isAr
    ? (settings?.site_description_ar ?? settings?.site_description)
    : settings?.site_description;

  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<NavbarSkeleton />}>
        <Navbar logoImg={settings?.site_logo} />
      </Suspense>
      <div className="grow pb-20">{children}</div>
      <MobileWidget />
      <Footer
        hotLine={settings?.hot_line || ""}
        email={settings?.contact_email}
        address={settings?.contact_address}
        facebook={settings?.social_facebook}
        instagram={settings?.social_instagram}
        linkedin={settings?.social_linkedin}
        x={settings?.social_twitter}
        websiteTitle={websiteTitle}
        slogan={slogan}
        copyRight={settings?.copyright_text}
      />
      <LanguageSwitcher />
      <ScrollToTop />
    </div>
  );
}
