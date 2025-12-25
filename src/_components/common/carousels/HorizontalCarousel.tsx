"use client";

import {
  Children,
  type FC,
  type PropsWithChildren,
  useRef,
  useCallback,
} from "react";

interface HorizontalCarouselProps extends PropsWithChildren {
  ariaLabel?: string;
  className?: string;
}

const HorizontalCarousel: FC<HorizontalCarouselProps> = ({
  children,
  ariaLabel = "Carousel",
  className = "",
}) => {
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const scroll = useCallback((direction: "prev" | "next") => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const amount = viewport.clientWidth * 0.8;
    viewport.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  }, []);

  const totalSlides = Children.count(children);

  return (
    <section
      className={`relative flex items-center ${className}`}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      role="region"
    >
      {/* Previous button */}
      <button
        type="button"
        onClick={() => scroll("prev")}
        className="
          hidden md:flex
          items-center justify-center
          w-16 h-16 rounded-full
          bg-white shadow-md
          absolute left-0
          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500
          -translate-x-1/2 z-30 cursor-pointer
        "
        aria-label="Scroll previous"
      >
        <span aria-hidden="true" className="text-2xl">
          ←
        </span>
      </button>

      {/* Viewport */}
      <div
        ref={viewportRef}
        className="
          overflow-x-auto scroll-smooth scrollbar-hidden
          w-full
        "
        tabIndex={0}
      >
        <div
          className="
            flex gap-6 px-8 md:px-16
            items-stretch
          "
          role="list"
        >
          {Children.map(children, (child, index) => (
            <div
              role="group"
              aria-roledescription="slide"
              aria-label={`Item ${index + 1} of ${totalSlides}`}
              className="shrink-0 flex items-stretch"
            >
              {/* هنا الكارت هياخد h-full من الwrapper ده */}
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Next button */}
      <button
        type="button"
        onClick={() => scroll("next")}
        className="
          hidden md:flex
          items-center justify-center
          w-16 h-16 rounded-full
          bg-white shadow-md
          absolute right-0
          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500
          translate-x-1/2 z-30 cursor-pointer
        "
        aria-label="Scroll next"
      >
        <span aria-hidden="true" className="text-2xl">
          →
        </span>
      </button>
    </section>
  );
};

export default HorizontalCarousel;
/**
 *
 */
