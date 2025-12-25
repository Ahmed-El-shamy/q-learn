"use client";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

const CourseNotFound = () => {
  const t = useTranslations("courses.notFound");
  const locale = useLocale();
  
  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-gray-100 text-gray-800 px-6 text-center overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 left-0 w-60 h-60 bg-orange-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-200 rounded-full blur-2xl opacity-40 animate-bounce-slow"></div>
      </div>

      <div className="relative z-10 max-w-md flex flex-col items-center">
        <div className="flex justify-center mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-orangeColor animate-float"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          {t("title")}
        </h1>

        <p className="mt-3 text-lg text-gray-600 leading-relaxed">
          {t("message")}
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href="/courses"
            className="inline-block px-6 py-2 rounded-xl bg-orange-400 text-white font-medium shadow-md hover:bg-orange-500 hover:shadow-lg transition-all"
          >
            {t("browseCourses")}
          </Link>
          <Link
            href="/"
            className="inline-block px-6 py-2 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium shadow-md hover:bg-gray-50 hover:shadow-lg transition-all"
          >
            {t("backToHome")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseNotFound;

