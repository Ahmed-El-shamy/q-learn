import type { FC, ReactNode } from "react";

interface CategoryCardProps {
  icon?: ReactNode;
  title: string;
  coursesCount: number;
}

const CategoryCard: FC<CategoryCardProps> = ({ icon, title, coursesCount }) => {
  return (
    <article
      className="
        flex flex-col items-center justify-center
        w-[180px] sm:w-[200px] md:w-[220px] lg:w-[230px]
        h-[180px]
        rounded-2xl
        bg-[#2E3A4A]
        text-white
        px-6
        shadow-sm duration-300
        transition-transform transition-shadow
        hover:-translate-y-1 hover:shadow-lg
        focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500
      "
      tabIndex={-1}
    >
      {/* Icon */}
      <div className="mb-6" aria-hidden="true">
        {icon ?? (
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            className="opacity-90"
          >
            <rect x="3" y="10" width="3" height="10" rx="1.5" fill="white" />
            <rect x="10.5" y="6" width="3" height="14" rx="1.5" fill="white" />
            <rect x="18" y="3" width="3" height="17" rx="1.5" fill="white" />
          </svg>
        )}
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold truncate max-w-full mb-1">
        {title}
      </h3>

      {/* Subtitle */}
      <p className="text-xs text-white/70">
        {coursesCount} {coursesCount === 1 ? "Courses" : "Courses"}
      </p>
    </article>
  );
};

export default CategoryCard;
