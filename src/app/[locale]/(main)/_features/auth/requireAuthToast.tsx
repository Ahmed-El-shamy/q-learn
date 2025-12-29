"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

export function useRequireAuthToast() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("common");

  return (message?: string) => {
    toast(message ?? t("loginRequired"), {
      action: {
        label: t("login"),
        onClick: () => router.push(`/${locale}/auth/login`),
      },
    });
  };
}
