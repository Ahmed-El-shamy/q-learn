import type { FC } from "react";
import { getTranslations } from "next-intl/server";
import HorizontalCarousel from "@/_components/common/carousels/HorizontalCarousel";
import TestimonialCard from "./TestimonialCard";
import ErrorHandler from "@/_components/common/error-handler/ErrorHandler";
import api, { Api } from "@/_lib/api/api";
import Container from "@/_components/common/container/Container";
import type { Test } from "./types/test.types";

const TestimonialsSection: FC = async () => {
  const t = await getTranslations("testimonials");
  const response = await api.get(Api.routes.site.testimonials);
  if (!response?.status) return null;
  const d = response.data as Test[];
  try {
    return (
      <section aria-labelledby="testimonials-heading">
        <div>
          <div className="text-center mb-10 md:mb-12">
            <h2
              id="testimonials-heading"
              className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
            >
              {t("title")}
            </h2>
            <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-600">
              {t("description")}
            </p>
          </div>

          {/* السلايدر */}
          <HorizontalCarousel ariaLabel="Students testimonials slider">
            {d.map((item) => (
              <TestimonialCard key={item.id} review={item} />
            ))}
          </HorizontalCarousel>
        </div>
      </section>
    );
  } catch {
    return <ErrorHandler />;
  }
};

export default TestimonialsSection;
