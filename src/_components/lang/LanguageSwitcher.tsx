"use client";
import Image from "next/image";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";
import MainBtn from "../common/buttons/MainBtn";
import { useSearchParams } from "next/navigation";

const LanguageSwitcher = ({ className }: { className?: string }) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isLoginPages =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forget-password";

  const switchLanguage = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    const query = searchParams.toString();

    router.push(query ? `${pathname}?${query}` : pathname, {
      locale: newLocale,
    });
  };

  return (
    <>
      {isLoginPages ? (
        <button
          onClick={switchLanguage}
          className={`fixed bottom-18 right-6 z-50 flex-center gap-2 p-2 rounded-md bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white shadow-md border border-green-200 transition-all `}
        >
          <Image
            alt="language-flag"
            src={locale === "ar" ? "/images/us.png" : "/images/ksa.png"}
            width={20}
            height={20}
          />
        </button>
      ) : (
        <MainBtn
          onClick={switchLanguage}
          containerClassName={twMerge(
            "fixed cursor-pointer rounded-full main-background bottom-24 lg:bottom-6 start-6 z-50 flex-center gap-2 p-2 shadow-md border border-green-600 transition-all",
            className
          )}
        >
          <Image
            alt="language-flag"
            src={locale === "ar" ? "/images/us.png" : "/images/ksa.png"}
            width={20}
            height={20}
          />
        </MainBtn>
      )}
    </>
  );
};

export default LanguageSwitcher;
