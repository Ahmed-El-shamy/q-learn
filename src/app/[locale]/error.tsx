"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import MainBtn from "@/_components/common/buttons/MainBtn";
import cn from "@/utils/cn";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="containerr min-h-[60vh] flex flex-col items-center justify-center py-16 px-4 text-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#202e3b] mb-4">
        {t("title")}
      </h1>
      <p className="text-[#373737] max-w-md mb-8">{t("description")}</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <MainBtn onClick={reset} variant="main">
          {t("tryAgain")}
        </MainBtn>
        <Link
          href="/"
          className={cn(
            "inline-flex items-center justify-center px-6 py-4 capitalize duration-500 font-bold rounded border",
            "bg-gray-100 text-gray-800 border-gray-200 hover:bg-white hover:border-purple-500"
          )}
        >
          {t("goToHomepage")}
        </Link>
      </div>
    </div>
  );
}
