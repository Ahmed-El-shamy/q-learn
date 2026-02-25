"use client";

import type { FC } from "react";
import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface CategoryCardProps {
  name: string;
  slug: string;
  courses_count: number;
  image?: string;
}

const CategoryCard: FC<CategoryCardProps> = ({
  name,
  slug,
  courses_count,
  image,
}) => {
  const t = useTranslations("categoryCard");
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={`/category/${slug}`}
      aria-label={`Open category: ${name}`}
      className="
        group block
        w-[180px] sm:w-[200px] md:w-[220px] lg:w-[230px]
        h-[200px]
        rounded-3xl
        border border-slate-200/70
        bg-white
        shadow-sm
        overflow-hidden
        transition
        hover:-translate-y-1 hover:shadow-lg
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2
      "
    >
      {/* Media */}
      <div className="relative h-[110px] bg-gradient-to-br from-sky-50 to-indigo-50">
        {image && !imageError ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, (max-width: 1024px) 220px, 230px"
            className="
              object-cover
  transition-transform duration-300
  group-hover:scale-105
            "
            quality={90}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
            <ImageIcon className="h-10 w-10 text-slate-400" aria-hidden />
          </div>
        )}

        {/* subtle overlay for modern feel */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="flex h-[90px] flex-col justify-between px-4 py-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug">
            {name}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {courses_count} {courses_count === 1 ? t("course") : t("courses")}
          </span>

          <span
            className="
              inline-flex items-center
              rounded-full
              bg-slate-900
              px-2.5 py-1
              text-[11px] font-semibold
              text-white
              transition
              group-hover:bg-sky-600
            "
            aria-label={`${courses_count} ${t("courses")}`}
          >
            {t("explore")}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
