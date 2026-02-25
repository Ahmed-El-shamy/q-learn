"use client";
import { trendedCoursesOptions } from "../_quires/trendedCoursesOptions";
import { useQuery } from "@tanstack/react-query";
import CourseCard from "./CourseCard";
import type { Course } from "../_types/course.types";
import HorizontalCarousel from "@/_components/common/carousels/HorizontalCarousel";

const ShowTrendedCourses = () => {
  const queryResult = useQuery(trendedCoursesOptions());
  return (
    <section aria-labelledby="top-categories-heading">
      <div className="text-center space-y-5">
        <h2
          id="top-categories-heading"
          className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
        >
          trended courses
        </h2>
        <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-600">
          Amet minim non deserunt ullamco est sit aliqua dolor do amet sint
          velit officia consequat.
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
