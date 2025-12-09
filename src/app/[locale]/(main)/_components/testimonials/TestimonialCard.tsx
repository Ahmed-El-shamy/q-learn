import type { FC } from "react";

interface TestimonialCardProps {
  categoryLabel?: string; // Course Quality
  rating?: number; // 1–5
  quote: string;
  name: string;
  role: string; // Photographer, Cricketer, ...
  company?: string; // LucidChart مثلا
  avatarSrc?: string;
  initials?: string; // لو مفيش صورة
}

const TestimonialCard: FC<TestimonialCardProps> = ({
  categoryLabel = "Course Quality",
  rating = 5,
  quote,
  name,
  role,
  company,
  avatarSrc,
  initials,
}) => {
  const safeRating = Math.max(0, Math.min(5, rating));

  return (
    <article
      className="
        relative
        w-[360px] sm:w-[420px] lg:w-[440px]
        bg-[#E7F3FF]
        rounded-tr-[48px]
        rounded-tl-[48px]
        rounded-bl-[48px]
        px-10 pt-16 pb-10
        flex flex-col items-center justify-between
        text-center
        duration-300 transition-all hover:translate-y-2
        h-full
      "
      aria-label={`Testimonial from ${name}`}
    >
      {/* Badge أعلى الكارت */}
      <div
        className="
          absolute top-0 left-1/2 -translate-x-1/2 
          bg-[#4A5568]
          text-white
          rounded-full
          px-8 py-2
          flex items-center gap-2
          text-xs sm:text-sm font-medium
          shadow-md
        "
      >
        {/* النجوم */}
        <div className="flex items-center gap-0.5" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={index}
              className={
                index < safeRating
                  ? "text-[#FFB400] text-sm"
                  : "text-white/40 text-sm"
              }
            >
              ★
            </span>
          ))}
        </div>
        <span className="border-l border-white/20 h-4" aria-hidden="true" />
        <span>{categoryLabel}</span>

        {/* نص مخفي لقرّاء الشاشة */}
        <span className="sr-only">
          Rated {safeRating} out of 5 for {categoryLabel}
        </span>
      </div>

      {/* علامة الاقتباس الخلفية */}
      <div
        className="
          pointer-events-none
          select-none
          absolute right-16 bottom-16
          text-[120px]
          font-serif
          leading-none
          text-white/35
        "
        aria-hidden="true"
      >
        ”
      </div>

      {/* النص */}
      <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl z-[1]">
        {quote}
      </p>

      {/* الشخص */}
      <div className="mt-6 flex flex-col items-center gap-2 z-[1]">
        {/* Avatar */}
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={name}
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
          />
        ) : (
          <div
            className="
              w-12 h-12 rounded-full
              flex items-center justify-center
              text-sm font-semibold
              bg-[#00F2FE]
              text-slate-800
              shadow-md
            "
            aria-hidden="true"
          >
            {initials}
          </div>
        )}

        {/* Role + Name */}
        <div className="text-xs text-slate-500">
          {company && <div className="mb-0.5">{company}</div>}
          <div>{role}</div>
        </div>
        <div className="text-sm font-semibold text-slate-800">{name}</div>
      </div>
    </article>
  );
};

export default TestimonialCard;
