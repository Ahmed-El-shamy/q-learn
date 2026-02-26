"use client";

import type { LucideIcon } from "lucide-react";
import { BookOpen, Users, Earth, Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCountUp } from "../../_hooks/useCountUp";

type IconKey = "book" | "users" | "earth" | "heart";

const ICONS: Record<IconKey, LucideIcon> = {
  book: BookOpen,
  users: Users,
  earth: Earth,
  heart: Heart,
};

type StatisticsCardProps = {
  className?: string;
  bgColor: string;
  iconKey: IconKey;
  number?: number;
  textKey: string;
};

export default function StatisticsCard({
  className,
  bgColor,
  iconKey,
  number,
  textKey,
}: StatisticsCardProps) {
  const t = useTranslations("statistics");
  const Icon = ICONS[iconKey];
  const countUp = typeof number === "number" ? useCountUp(number) : null;

  return (
    <div className="bg-white rounded-2xl flex flex-col items-center justify-center border border-[#cee8ff] p-10 text-[#425073]">
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center ${
          className || ""
        }`}
        style={{ backgroundColor: bgColor }}
      >
        <Icon color="white" size={40} />
      </div>

      {typeof number === "number" && (
        <h2 ref={countUp?.ref ?? null} className="font-bold text-3xl mt-5">
          {countUp?.count}+
        </h2>
      )}

      <p>{t(textKey)}</p>
    </div>
  );
}
