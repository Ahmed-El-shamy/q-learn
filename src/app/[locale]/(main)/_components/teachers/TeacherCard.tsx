"use client";

import type { FC } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import type {
  Instructor,
  InstructorSocialMedia,
} from "@/types/instructor.types";
import {
  Star,
  Users,
  MessageSquare,
  Globe,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Twitter,
  MessageCircle,
  Music2,
  Image as ImageIcon,
} from "lucide-react";

type TeacherCardProps = {
  instructor: Instructor;
  className?: string;
};

/* =========================
   Utils
========================= */
function formatCompact(n: number) {
  if (!Number.isFinite(n)) return "0";
  return Intl.NumberFormat("en", { notation: "compact" }).format(n);
}

function isAbsoluteUrl(v: string) {
  if (!v) return false;
  return /^https?:\/\//i.test(v);
}

function safeUrl(url: string) {
  if (!url) return "#";
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url.replace(/^\/+/, "")}`;
}

function getSocialLabel(type: string, name?: string) {
  const t = (type || "").toLowerCase();
  if (name) return name;
  if (t.includes("facebook")) return "Facebook";
  if (t.includes("instagram")) return "Instagram";
  if (t.includes("linkedin")) return "LinkedIn";
  if (t.includes("youtube")) return "YouTube";
  if (t.includes("tiktok")) return "TikTok";
  if (t.includes("twitter") || t.includes("x")) return "X (Twitter)";
  if (t.includes("whatsapp")) return "WhatsApp";
  return "Website";
}

function pickFallbackIcon(type: string, icon: string) {
  const t = (type || "").toLowerCase();
  const i = (icon || "").toLowerCase();

  if (t.includes("instagram") || i.includes("instagram")) return Instagram;
  if (t.includes("facebook") || i.includes("facebook")) return Facebook;
  if (t.includes("linkedin") || i.includes("linkedin")) return Linkedin;
  if (t.includes("youtube") || i.includes("youtube")) return Youtube;
  if (t.includes("twitter") || t === "x" || i.includes("twitter"))
    return Twitter;
  if (t.includes("whatsapp") || i.includes("whatsapp")) return MessageCircle;
  if (t.includes("tiktok") || i.includes("tiktok")) return Music2;

  // heroicon-o-globe-alt, website, unknown …
  return Globe;
}

/* =========================
   Sub Components
========================= */
const SocialIconRenderer: FC<{ icon: string; type: string; alt: string }> = ({
  icon,
  type,
  alt,
}) => {
  if (isAbsoluteUrl(icon)) {
    return (
      <span className="relative h-5 w-5">
        <Image
          src={icon}
          alt={alt}
          fill
          sizes="20px"
          className="object-contain"
        />
      </span>
    );
  }

  const Icon = pickFallbackIcon(type, icon);
  return <Icon className="h-5 w-5" aria-hidden="true" />;
};

const SocialButton: FC<{
  item: InstructorSocialMedia;
  instructorName: string;
}> = ({ item, instructorName }) => {
  const label = getSocialLabel(item.type, item.name);

  return (
    <a
      href={safeUrl(item.profile_url)}
      target="_blank"
      rel="noreferrer"
      className="
        inline-flex h-10 w-10 items-center justify-center
        rounded-full
        bg-white/90 backdrop-blur
        shadow-sm
        transition
        hover:bg-white
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2
      "
      aria-label={`Open ${instructorName} on ${label}`}
      title={label}
    >
      <SocialIconRenderer icon={item.icon} type={item.type} alt={label} />
    </a>
  );
};

const StatChip: FC<{
  icon: React.ReactNode;
  label: string;
  value: number;
}> = ({ icon, label, value }) => {
  return (
    <div
      className="
        flex items-center gap-2
        rounded-2xl
        bg-slate-50
        px-3 py-2
        text-slate-700
      "
      aria-label={`${label}: ${value}`}
    >
      <span className="shrink-0 text-slate-500" aria-hidden="true">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs text-slate-500 leading-none">{label}</p>
        <p className="text-sm font-semibold leading-none">
          {formatCompact(value)}
        </p>
      </div>
    </div>
  );
};

/* =========================
   TeacherCard
========================= */
const TeacherCard: FC<TeacherCardProps> = ({ instructor, className = "" }) => {
  const t = useTranslations("teachers");
  const name = instructor.user?.name ?? "Instructor";
  const title = instructor.user?.job_title || t("instructor");
  const avatarSrc = instructor.avatar || instructor.user?.avatar_url;
  const social = instructor.social_media ?? [];

  return (
    <article
      className={`
        group relative
        w-[260px] sm:w-[280px] md:w-[300px]
        overflow-hidden rounded-3xl
        border border-slate-200/70
        bg-white
        shadow-sm
        transition
        hover:shadow-lg
        focus-within:shadow-lg
        ${className}
      `}
      aria-label={`Instructor card: ${name}`}
    >
      {/* ====== Media ====== */}
      <div className="relative aspect-[4/5] bg-slate-100">
        {avatarSrc ? (
          <Image
            src={avatarSrc}
            alt={name}
            fill
            sizes="(max-width: 640px) 260px, (max-width: 768px) 280px, 300px"
            className="
              object-cover
              transition-transform duration-500
              group-hover:scale-[1.03]
            "
            quality={90}
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400">
            <span className="sr-only">No image</span>
            <ImageIcon className="h-10 w-10" aria-hidden="true" />
          </div>
        )}

        {/* Gradient overlay */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/0"
          aria-hidden="true"
        />

        {/* Social (Desktop hover) */}
        {social.length > 0 && (
          <div
            className="
              absolute bottom-3 left-3 right-3
              hidden md:flex items-center gap-2
              opacity-0 translate-y-2
              transition-all duration-300
              group-hover:opacity-100 group-hover:translate-y-0
            "
          >
            {social.slice(0, 5).map((item) => (
              <SocialButton key={item.id} item={item} instructorName={name} />
            ))}
          </div>
        )}
      </div>

      {/* ====== Content (fixed height) ====== */}
      <div className="flex min-h-[170px] flex-col justify-between px-4 py-4">
        {/* Header */}
        <div className="min-w-0">
          <h3 className="line-clamp-1 text-lg font-semibold text-slate-900">
            {name}
          </h3>
          <p className="mt-0.5 line-clamp-1 text-sm text-slate-500">{title}</p>

          {/* Rating Row */}
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1">
              <Star className="h-4 w-4" aria-hidden="true" />
              <span className="font-semibold">
                {formatCompact(instructor.ratings_count ?? 0)}
              </span>
              <span className="text-slate-400">{t("ratings")}</span>
            </span>

            <span className="h-4 w-px bg-slate-200" aria-hidden="true" />

            <span className="inline-flex items-center gap-1">
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              <span className="font-semibold">
                {formatCompact(instructor.courses_count ?? 0)}
              </span>
              <span className="text-slate-400">{t("courses")}</span>
            </span>
            <span className="h-4 w-px bg-slate-200" aria-hidden="true" />
            <span className="inline-flex items-center gap-1">
              <Users className="h-4 w-4" aria-hidden="true" />
              <span className="font-semibold">
                {formatCompact(instructor.students_count ?? 0)}
              </span>
              <span className="text-slate-400">{t("students")}</span>
            </span>
          </div>

          {/* Social (Mobile visible) */}
          {social.length > 0 && (
            <div className="mt-3 flex items-center gap-2 md:hidden">
              {social.slice(0, 4).map((item) => (
                <SocialButton key={item.id} item={item} instructorName={name} />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default TeacherCard;
