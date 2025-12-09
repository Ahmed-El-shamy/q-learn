import type { FC } from "react";
import Image, { type StaticImageData } from "next/image";

type SocialPlatform = "facebook" | "twitter" | "linkedin" | "instagram";

interface SocialLink {
  platform: SocialPlatform;
  href: string;
}

type GradientVariant = "blue" | "purple" | "pink";

interface TeacherCardProps {
  name: string;
  title: string;
  photo: StaticImageData | string;
  photoAlt?: string;
  socialLinks?: SocialLink[];
  gradient?: GradientVariant;
  className?: string;
}

const gradientClasses: Record<GradientVariant, string> = {
  blue: "from-[#02A6FF] via-[#407BFF] to-[#0049FF]",
  purple: "from-[#A855F7] via-[#8B5CF6] to-[#6366F1]",
  pink: "from-[#EC4899] via-[#A855F7] to-[#6366F1]",
};

const platformLabel: Record<SocialPlatform, string> = {
  facebook: "Facebook",
  twitter: "Twitter / X",
  linkedin: "LinkedIn",
  instagram: "Instagram",
};

const platformLetter: Record<SocialPlatform, string> = {
  facebook: "f",
  twitter: "t",
  linkedin: "in",
  instagram: "ig",
};

const TeacherCard: FC<TeacherCardProps> = ({
  name,
  title,
  photo,
  photoAlt,
  socialLinks = [],
  gradient = "blue",
  className = "",
}) => {
  const gradientClass = gradientClasses[gradient];

  return (
    <article
      className={`
        group relative mx-auto
        w-[260px] sm:w-[280px]
        pb-12   /* عشان نسيب مساحة للكارت الأبيض */
        focus-within:outline-none
        ${className}
      `}
      aria-label={`${name}, ${title}`}
    >
      {/* ظل خلفي خفيف */}
      <div
        className="
          absolute inset-0
          translate-x-3 translate-y-3
          rounded-[32px]
          bg-slate-100
          pointer-events-none
        "
        aria-hidden="true"
      />

      {/* الكارت الأساسي */}
      <div
        className={`
          relative z-[1]
          rounded-[32px]
          bg-gradient-to-b ${gradientClass}
          shadow-lg
          transition-transform transition-shadow
          duration-300
          group-hover:-translate-y-2
          group-hover:shadow-2xl
        `}
      >
        {/* صورة المدرّس */}
        <div className="relative aspect-[3/4]">
          <Image
            src={photo}
            alt={photoAlt ?? name}
            fill
            sizes="(min-width: 1024px) 280px, 60vw"
            className="object-cover object-bottom"
            priority={false}
          />
        </div>

        {/* الكارت الأبيض اللي تحت */}
        <div
          className="
            absolute left-1/2 bottom-0
            w-[85%] max-w-[230px]
            -translate-x-1/2 translate-y-1/3  /* بدل 1/2 */
          "
        >
          <div
            className="
              rounded-[24px]
              bg-white
              px-5 pt-4 pb-4
              shadow-xl
              flex flex-col items-center
              text-center
            "
          >
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">
              {name}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">{title}</p>

            {socialLinks.length > 0 && (
              <div className="mt-4 flex items-center justify-center gap-3">
                {socialLinks.map(({ platform, href }) => (
                  <a
                    key={platform}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex h-9 w-9 items-center justify-center
                      rounded-full
                      bg-slate-100
                      text-slate-600
                      text-xs font-semibold
                      hover:bg-slate-900 hover:text-white
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-offset-2
                      focus-visible:ring-sky-500
                      transition-colors
                    "
                    aria-label={`Visit ${name} on ${platformLabel[platform]}`}
                  >
                    <span aria-hidden="true" className="">
                      {platformLetter[platform]}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default TeacherCard;
