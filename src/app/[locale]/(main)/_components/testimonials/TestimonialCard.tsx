"use client";

import type { FC } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Test } from "./types/test.types";

interface TestimonialCardProps {
  review: Test;
  className?: string;
}

const TestimonialCard: FC<TestimonialCardProps> = ({
  review,
  className = "",
}) => {
  const t = useTranslations("testimonials");
  const name = review?.name ?? t("defaultName");
  const job = review?.job_title ?? t("defaultJob");
  const quote = review?.quote ?? "";

  return (
    <figure
      className={`
        group
        w-[300px] sm:w-[360px] md:w-[420px]
        h-[320px] sm:h-[340px]
        rounded-3xl
        border border-slate-200/70
        bg-white
        shadow-sm
        overflow-hidden
        transition
        hover:-translate-y-1 hover:shadow-lg
        ${className}
      `}
      aria-label={t("testimonialFrom", { name })}
    >
      {/* Top accent */}
      <div
        className="h-2 w-full bg-gradient-to-r from-sky-500/60 via-indigo-500/40 to-emerald-500/50"
        aria-hidden="true"
      />

      <div className="flex h-[calc(100%-0.5rem)] flex-col p-5 sm:p-6">
        {/* Header (avatar + identity) */}
        <figcaption className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="
              relative h-12 w-12 shrink-0 overflow-hidden rounded-full
              border border-slate-200 bg-slate-100
            "
          >
            {review?.image ? (
              <Image
                src={review.image}
                alt={name}
                fill
                sizes="48px"
                className="object-cover"
                quality={85}
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-100">
                <ImageIcon className="h-6 w-6 text-slate-400" aria-hidden />
              </div>
            )}
          </div>

          {/* Name + role */}
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 line-clamp-1">
              {name}
            </p>
            <p className="text-xs text-slate-500 line-clamp-1">{job}</p>
          </div>

          {/* Optional badge (non-interactive) */}
          <div className="ml-auto">
            <span className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
              {t("verified")}
            </span>
          </div>
        </figcaption>

        {/* Quote */}
        <div className="mt-4 flex-1">
          <blockquote className="relative">
            {/* Quote mark */}
            <span
              className="absolute -left-1 -top-3 text-5xl leading-none text-slate-200 select-none"
              aria-hidden="true"
            >
              “
            </span>

            <p className="pl-6 text-sm sm:text-base leading-relaxed text-slate-700 line-clamp-5">
              {quote}
            </p>
          </blockquote>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="text-xs text-slate-500">
            {t("educationExperience")}
          </div>

          {/* Rating (static UI – you can wire it later if API provides it) */}
          <div
            className="flex items-center gap-1"
            aria-label={t("ratingLabel")}
          >
            <span
              className="h-2 w-2 rounded-full bg-sky-500"
              aria-hidden="true"
            />
            <span
              className="h-2 w-2 rounded-full bg-sky-500"
              aria-hidden="true"
            />
            <span
              className="h-2 w-2 rounded-full bg-sky-500"
              aria-hidden="true"
            />
            <span
              className="h-2 w-2 rounded-full bg-sky-500"
              aria-hidden="true"
            />
            <span
              className="h-2 w-2 rounded-full bg-sky-500"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </figure>
  );
};

export default TestimonialCard;
