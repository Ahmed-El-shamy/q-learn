import React from "react";
import BlogSidebar from "../_components/BlogSidebar";
import { getTranslations } from "next-intl/server";

export default async function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("blogs");

  return (
    <>
      <div
        className="bg-[url('/images/about-us/about-hero.webp')]
             bg-cover bg-center bg-no-repeat
             h-64 w-full text-center"
      >
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold translate-y-24">
          {t("hero")}
        </h1>
      </div>

      <div className="containerr mt-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9">{children}</div>
          <BlogSidebar />
        </div>
      </div>
    </>
  );
}

