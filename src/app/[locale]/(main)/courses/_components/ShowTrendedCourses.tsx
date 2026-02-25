"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import CourseCard from "./CourseCard";
import type { Course } from "../_types/course.types";
import HorizontalCarousel from "@/_components/common/carousels/HorizontalCarousel";
import { trendedCoursesOptions } from "../_quires/trendedCoursesOptions";

const ShowTrendedCourses = () => {
  const t = useTranslations("trendedCourses");
  const queryResult = useQuery(trendedCoursesOptions());
  return (
    <section aria-labelledby="trended-courses-heading">
      <div className="text-center space-y-5">
        <h2
          id="trended-courses-heading"
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
        >
          {t("title")}
        </h2>
        <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-600">
          {t("description")}
        </p>

        {queryResult?.data && queryResult?.data?.length > 0 ? (
          <HorizontalCarousel
            ariaLabel="Trended courses slider"
            slidesPerView={{ base: 1, sm: 1, md: 3, lg: 4, xl: 5 }}
          >
            {queryResult?.data?.slice(0, 10).map((item: Course) => (
              <CourseCard key={item.id} {...item} />
            ))}
          </HorizontalCarousel>
        ) : null}
      </div>
    </section>
  );
};

export default ShowTrendedCourses;
