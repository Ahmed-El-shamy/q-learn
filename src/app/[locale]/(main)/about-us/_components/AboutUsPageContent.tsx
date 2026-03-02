"use client";

import Image from "next/image";
import { useCountUp } from "../../_hooks/useCountUp";
import HtmlContent from "@/_components/common/HtmlContent";
import type {
  StaticPage,
  LocalizedText,
  PageSectionStatic,
} from "@/types/page.types";

const defaultHeroTitle = "Learn More About Us";
const defaultWhoWeAreTitle =
  "Improving lives through Learning. We are always Inspired by the world and people us. Celebrating e-Learning excellence in Personal.";
const defaultSubheading =
  "We are here to meet your demand and teach the most beneficial way for you in Personal.";
const defaultLibraryTitle =
  "Build your own library for your career and personal growth.";
const defaultLibraryDesc =
  "Our goal is to learn the next generation of creative professionals for a future in any industry. We offer course in most demanded industries. Whether begin to your journey on our courses website or choose the flexibility of video learning our courses are designed to help you along your path.";

type Locale = "en" | "ar";

function getLocalizedText(text: LocalizedText | null | undefined, locale: Locale): string {
  if (!text) return "";
  const value = locale === "ar" ? text.ar : text.en;
  return value ?? (locale === "ar" ? text.en : text.ar) ?? "";
}

function parseStaticNumber(value: string): number {
  const num = parseInt(value.replace(/\D/g, ""), 10);
  return Number.isNaN(num) ? 0 : num;
}

function StatisticsItem({
  item,
  locale,
  translateClass,
}: {
  item: PageSectionStatic;
  locale: Locale;
  translateClass: string;
}) {
  const num = parseStaticNumber(item.number);
  const countUp = useCountUp(num);
  const label = getLocalizedText(item.label, locale);
  const suffix = item.number.replace(/[0-9]/g, "").trim() || "";

  return (
    <div
      className={`flex flex-col md:flex-row md:items-center gap-3 md:gap-10 ${translateClass}`}
    >
      <h2
        ref={countUp.ref}
        className="text-[#656a7b] text-4xl md:text-6xl font-bold"
      >
        {countUp.count}
        {suffix}
      </h2>
      <div>
        <h3 className="text-[#202e3b] text-2xl font-bold">{label}</h3>
      </div>
    </div>
  );
}

type Props = {
  page: StaticPage | null;
  locale: Locale;
};

export default function AboutUsPageContent({ page, locale }: Props) {
  const heroTitle = page
    ? getLocalizedText(page.title, locale)
    : defaultHeroTitle;

  const overviewSection = page?.sections?.find((s) => s.key === "about_overview");
  const visionSection = page?.sections?.find((s) => s.key === "vision");
  const missionSection = page?.sections?.find((s) => s.key === "mission");
  const statisticsSection = page?.sections?.find((s) => s.key === "statistics");
  const librarySection = page?.sections?.find(
    (s) => s.key === "library" || s.key === "about_library"
  );

  const whoWeAreTitle = overviewSection
    ? getLocalizedText(overviewSection.title, locale)
    : defaultWhoWeAreTitle;
  const whoWeAreContent = overviewSection
    ? getLocalizedText(overviewSection.content, locale)
    : "";
  const subheading = visionSection
    ? getLocalizedText(visionSection.content, locale)
    : missionSection
      ? getLocalizedText(missionSection.content, locale)
      : defaultSubheading;
  const visionContent = visionSection
    ? getLocalizedText(visionSection.content, locale)
    : "";

  const libraryTitle = librarySection
    ? getLocalizedText(librarySection.title, locale) || defaultLibraryTitle
    : defaultLibraryTitle;
  const libraryDesc = librarySection
    ? getLocalizedText(librarySection.content, locale) || defaultLibraryDesc
    : defaultLibraryDesc;

  const statics = statisticsSection?.statics?.slice(0, 3).sort((a, b) => a.sort_order - b.sort_order) ?? [];
  const hasStatics = statics.length > 0;

  const translateClasses = [
    "md:translate-x-40 rtl:md:-translate-x-40",
    "md:translate-x-32 rtl:md:-translate-x-32",
    "md:translate-x-16 rtl:md:-translate-x-16",
  ];

  return (
    <>
      <section
        className="bg-[url('/images/about-us/about-hero.webp')] 
             bg-cover bg-center bg-no-repeat
             h-64 w-full text-center"
      >
        <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-bold translate-y-24">
          {heroTitle}
        </h1>
      </section>

      <section className="containerr">
        <div className="flex flex-col md:flex-row border border-[#d1d1d1] rounded my-28">
          <div className="flex-1 p-10 px-5 lg:px-16">
            <h2 className="font-bold text-xl sm:text-2xl lg:text-3xl text-[#202e3b] w-full lg:w-[90%] xl:w-[85%] leading-10">
              {whoWeAreTitle}
            </h2>
            {whoWeAreContent ? (
              <div className="mt-6 prose max-w-none prose-p:leading-relaxed [&_p]:text-lg [&_p]:md:text-xl [&_p]:lg:text-2xl [&_p]:w-full [&_p]:lg:w-[90%] [&_p]:xl:w-[85%]">
                <HtmlContent html={whoWeAreContent} />
              </div>
            ) : (
              <p className="mt-6 text-lg md:text-xl lg:text-2xl text-[#373737] w-full lg:w-[90%] xl:w-[85%] leading-relaxed">
                {subheading || defaultSubheading}
              </p>
            )}
          </div>
          <div className="flex-1 p-10 px-5 lg:px-16 gradient-background text-white">
            {visionContent ? (
              <div className="prose prose-invert max-w-none prose-p:leading-relaxed [&_p]:text-xl [&_p]:font-bold [&_p]:md:text-3xl [&_p]:lg:text-4xl [&_p]:w-full [&_p]:lg:w-[90%] [&_p]:xl:w-[85%] [&_p]:leading-12">
                <HtmlContent html={visionContent} />
              </div>
            ) : (
              <p className="text-xl md:text-2xl lg:text-3xl font-bold w-full lg:w-[90%] xl:w-[85%] leading-12">
                {defaultSubheading}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-20 xl:mt-64">
          <div className="flex-1 hidden md:flex gap-10">
            <div>
              {overviewSection?.media_url ? (
                <Image
                  src={overviewSection.media_url}
                  alt={whoWeAreTitle}
                  width={400}
                  height={300}
                  className="h-[300px] xl:-translate-y-40 xl:translate-x-10 hidden lg:block object-cover rtl:xl:-translate-x-10"
                />
              ) : (
                <Image
                  src="/images/about-us/1.jpg"
                  alt=""
                  width={400}
                  height={100}
                  className="h-[300px] xl:-translate-y-40 xl:translate-x-10 hidden lg:block rtl:xl:-translate-x-10"
                />
              )}
              <Image
                src="/images/about-us/2.jpg"
                alt=""
                width={300}
                height={100}
                className="h-full lg:h-[400px] lg:translate-y-5 xl:-translate-y-32 w-[500px] lg:w-[400px] lg:translate-x-28 xl:translate-x-14 rtl:lg:-translate-x-28 rtl:xl:-translate-x-14"
              />
            </div>
            <Image
              src="/images/about-us/3.jpg"
              alt=""
              width={350}
              height={100}
              className="h-[450px] -translate-y-10 translate-x-8 hidden xl:block rtl:-translate-x-8"
            />
          </div>

          <div className="flex-1">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl xl:text-6xl text-[#202e3b] w-full md:w-[95%] lg:w-[90%] xl:w-[85%]">
              {libraryTitle}
            </h2>
            <div className="mt-5 text-[#373737] text-xl w-full md:w-[90%] xl:w-[80%] prose prose-p:my-2 max-w-none">
              <HtmlContent html={libraryDesc} />
            </div>
          </div>
        </div>
      </section>

      <section className="flex lg:h-screen">
        <div className="space-y-10 py-28 px-4 sm:px-10 md:px-0 relative z-1 md:-mr-96 rtl:md:mr-0 rtl:md:-ml-96">
          {hasStatics ? (
            statics.map((item, index) => (
              <StatisticsItem
                key={item.sort_order}
                item={item}
                locale={locale}
                translateClass={translateClasses[index] ?? ""}
              />
            ))
          ) : (
            <>
              <StatisticsItem
                item={{
                  number: "100K+",
                  sort_order: 1,
                  label: { ar: "معلمون", en: "Most Involved Teachers" },
                }}
                locale={locale}
                translateClass="md:translate-x-40 rtl:md:-translate-x-40"
              />
              <StatisticsItem
                item={{
                  number: "200+",
                  sort_order: 2,
                  label: { ar: "دورات", en: "Large Selection of Courses" },
                }}
                locale={locale}
                translateClass="md:translate-x-32 rtl:md:-translate-x-32"
              />
              <StatisticsItem
                item={{
                  number: "150K+",
                  sort_order: 3,
                  label: { ar: "طلاب", en: "Large Selection of Courses" },
                }}
                locale={locale}
                translateClass="md:translate-x-16 rtl:md:-translate-x-16"
              />
            </>
          )}
        </div>
        <div className="w-full hidden lg:block">
          <img
            src="/images/about-us/counter_bg.png"
            alt=""
            className="[clip-path:polygon(25%_0%,100%_0,100%_100%,0%_100%)] rtl:[clip-path:polygon(0%_0%,75%_0,100%_100%,0%_100%)] w-full h-full object-cover"
          />
        </div>
      </section>
    </>
  );
}
