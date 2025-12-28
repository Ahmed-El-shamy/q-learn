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
export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

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
        websiteTitle={settings?.site_name}
        slogan={settings?.site_description}
        copyRight={settings?.copyright_text}
      />
      <LanguageSwitcher />
      <ScrollToTop />
    </div>
  );
}
