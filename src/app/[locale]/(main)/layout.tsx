import type { Metadata } from "next";
import Footer from "@/_components/layout/footerHome/Footer";
import Navbar from "@/_components/layout/navbar/common/Navbar";
import MobileWidget from "@/_components/layout/mobile-widget/MobileWidget";
import "@/styles/globals.css";
import LanguageSwitcher from "@/_components/lang/LanguageSwitcher";
import ScrollToTop from "@/_components/common/ScrollToTop";
import { Suspense } from "react";
import NavbarSkeleton from "@/_components/common/loaders/skeltons/NavbarSkeleton";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<NavbarSkeleton />}>
        <Navbar />
      </Suspense>
      <div className="grow pb-20">{children}</div>
      <MobileWidget />
      <Footer />
      <LanguageSwitcher />
      <ScrollToTop />
    </div>
  );
}
