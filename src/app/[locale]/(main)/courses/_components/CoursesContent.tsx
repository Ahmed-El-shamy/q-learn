"use client";

import { useState } from "react";
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
import { useCoursesFilters } from "../_services/CourseFilterProvider";
import { CourseFilters } from "../_types/courses.types";
import { useCourseQuery } from "../_services/_hooks/useCourseQuery";
import FilterSkelton from "./FilterSkelton";
import MainBtn from "@/_components/common/buttons/MainBtn";
import { useTranslations, useLocale } from "next-intl";
import { Filter, X } from "lucide-react";

const CoursesContent = () => {
  const { serverFilters, sortBy, resetFilters } = useCoursesFilters();
  const t = useTranslations("coursesPage");
  const local = useLocale();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const queryFilters: CourseFilters = {
    ...serverFilters,
    rating: serverFilters.rating?.length ? [serverFilters.rating[0]] : [],
  };

  const { data, isLoading, isFetching, isError, error } = useCourseQuery({
    filters: queryFilters,
    sort: sortBy,
  });

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  const filtersComponents =
    isFetching && isLoading
      ? [...Array(8)].map((_, i) => <FilterSkelton key={i} />)
      : [
          <SearchFilter key="search" />,
          <CategoryFilter key="category" />,
          <LevelFilter key="level" />,
          <ModeFilter key="mode" />,
          <PriceTypeFilter key="priceType" />,
          <PriceFilter key="price" />,
          <InstructorsFilter key="instructor" />,
          <RatingFilter key="rating" />,
        ];

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
          {/* Desktop Filters */}
          <div className="hidden lg:block lg:col-span-3 space-y-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#202e3b]">
                {t("filtersTitle")}
              </h3>
              <MainBtn onClick={resetFilters}>{t("clearAll")}</MainBtn>
            </div>
            {filtersComponents}
          </div>

          {/* Courses Section */}
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

        {/* Mobile Filters */}
        <div className="lg:hidden">
          <div className="flex flex-col sm:flex-row justify-between gap-3 absolute -top-15 start-2 end-2">
            <p className="text-lg ms-1">
              {t("resultsFound", { count: data?.length || 0 })}
            </p>
            <div className="flex gap-2 justify-between">
              <button
                className="p-2 hover:bg-gray-200 rounded duration-100 cursor-pointer border border-gray-100 md:border-none"
                onClick={toggleMobile}
              >
                <Filter size={20} stroke="#1f2b40" />
              </button>
              <SortDropdown />
            </div>
          </div>

          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black/40 z-10 transition-opacity duration-300 ${
              isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={toggleMobile}
          />

          <aside
            className={`z-50 bg-white border-l-[#d1d1d1] w-4/5 px-4 py-4 flex flex-col max-w-lg h-screen overflow-y-auto fixed top-0 start-0 transition-transform duration-300 ease-in-out shadow-2xl
              ${
                isMobileOpen
                  ? "translate-x-0"
                  : local === "ar"
                  ? "translate-x-full"
                  : "-translate-x-full"
              }
            `}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-2">
              <button
                onClick={toggleMobile}
                className="cursor-pointer p-2 hover:bg-gray-100 duration-100 rounded"
              >
                <X size={18} stroke="#1f2b40" />
              </button>
            </div>

            <div className="mt-4 flex justify-between items-center border-b border-b-[#d1d1d1] pb-4">
              <p className="text-xl text-[#1f2b40]">{t("filtersTitle")}</p>
              <MainBtn onClick={resetFilters}>{t("clearAll")}</MainBtn>
            </div>

            <div className="space-y-5 mt-4">{filtersComponents}</div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default CoursesContent;
