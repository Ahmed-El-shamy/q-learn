"use client";

import CourseCard from "@/app/[locale]/(main)/courses/_components/CourseCard";
import SearchFilter from "./SearchFilter";
import CategoryFilter from "./CategoryFilter";
import LevelFilter from "./LevelFilter";
import ModeFilter from "./ModeFilter";
import PriceTypeFilter from "./PriceTypeFilter";
import PriceFilter from "./PriceFilter";
import InstructorsFilter from "./InstructorsFilter";
import RatingFilter from "./RatingFilter";
import SortDropdown from "./SortDropDown";
import CourseSkelton from "./CourseSkelton";
import MobileFilters from "./MobileFilters";
import { useCoursesFilters } from "../_services/CourseFilterProvider";
import { CourseFilters } from "../_types/courses.types";
import { useCourseQuery } from "../_services/_hooks/useCourseQuery";
import FilterSkelton from "./FilterSkelton";
import MainBtn from "@/_components/common/buttons/MainBtn";
import { useTranslations } from "next-intl";

const CoursesContent = () => {
  const { filters, sortBy, resetFilters } = useCoursesFilters();
  const t = useTranslations("coursesPage");

  const queryFilters: CourseFilters = {
    ...filters,
    rating: filters.rating?.length ? [filters.rating[0]] : [],
  };

  const { data, isLoading, isFetching, isError, error } = useCourseQuery({
    filters: queryFilters,
    sort: sortBy,
  });

  return (
    <>
      {isFetching && !isLoading && (
        <div className="fixed top-0 left-0 w-full z-100">
          <div className="h-1 bg-purple-100 w-full overflow-hidden">
            <div className="h-full bg-linear-to-r from-[#660afb] to-[#b633ff] animate-progress origin-left"></div>
          </div>
        </div>
      )}

      <div className="bg-[url('/images/about-us/about-hero.webp')] bg-cover bg-center bg-no-repeat h-64 w-full text-center">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold translate-y-24">
          {t("heroTitle")}
        </h1>
      </div>

      <div className="containerr mt-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="hidden lg:block lg:col-span-3 space-y-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#202e3b]">
                {t("filtersTitle")}
              </h3>
              <MainBtn onClick={resetFilters}>{t("clearAll")}</MainBtn>
            </div>
            {isLoading ? (
              [...Array(6)].map((_, i) => <FilterSkelton key={i} />)
            ) : (
              <>
                <SearchFilter />
                <CategoryFilter />
                <LevelFilter />
                <ModeFilter />
                <PriceTypeFilter />
                <PriceFilter />
                <InstructorsFilter />
                <RatingFilter />
              </>
            )}
          </div>

          <div className="lg:col-span-9">
            <div className="hidden text-lg lg:flex justify-between items-center mb-5">
              <p>{t("resultsFound", { count: data?.length || 0 })}</p>
              <SortDropdown />
            </div>

            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <CourseSkelton key={i} />
                ))}
              </div>
            )}

            {isError && (
              <div className="flex flex-col items-center justify-center h-screen text-center w-full">
                <div className="bg-red-50 p-8 rounded-2xl">
                  <p className="text-red-500 font-bold text-xl mb-2">
                    {t("errorMessage")}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {(error as Error)?.message}
                  </p>
                </div>
              </div>
            )}

            {!isLoading &&
              !isError &&
              data &&
              (data?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-10 sm:mt-0">
                  {data.map((course, i) => (
                    <CourseCard key={course.id || i} {...course} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-screen text-center w-full">
                  <div className="space-y-4">
                    <p className="text-[#202e3b] text-2xl font-semibold">
                      {t("noCourses")}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="lg:hidden">
          <MobileFilters />
        </div>
      </div>
    </>
  );
};

export default CoursesContent;
