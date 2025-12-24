"use client";

import { Filter, Menu, X } from "lucide-react";
import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import LevelFilter from "./LevelFilter";
import InstructorsFilter from "./InstructorsFilter";
import RatingFilter from "./RatingFilter";
import PriceSlider from "./PriceFilter";
import PriceFilter from "./PriceFilter";
import SortDropdown from "./SortDropDown";
import { useCourseQuery } from "../_services/_hooks/useCourseQuery";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useCoursesFilters } from "../_services/CourseFilterProvider";
import SearchFilter from "./SearchFilter";
import ModeFilter from "./ModeFilter";
import PriceTypeFilter from "./PriceTypeFilter";
import MainBtn from "@/_components/common/buttons/MainBtn";
import FilterSkelton from "./FilterSkelton";

const MobileFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const t = useTranslations("coursesPage");
  const local = useLocale();
  const { filters, sortBy, resetFilters } = useCoursesFilters();
  const { data, isLoading } = useCourseQuery({
    filters,
    sort: sortBy,
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between gap-3 absolute -top-15 start-2 end-2">
        <p className="text-lg ms-1">
          {t("resultsFound", { count: data?.length || 0 })}
        </p>

        <div className="flex justify-between">
          <button
            className="p-1 hover:bg-gray-200 rounded duration-100 cursor-pointer border border-gray-100 md:border-none"
            onClick={toggleMenu}
          >
            <Filter size={20} stroke="#1f2b40" />
          </button>

          <SortDropdown />
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`z-50 bg-white border-l-[#d1d1d1] w-4/5 px-4 py-4 flex flex-col max-w-lg h-screen overflow-y-auto fixed top-0 start-0 transition-transform duration-300 ease-in-out shadow-2xl
          ${
            isOpen
              ? "translate-x-0"
              : local === "ar"
              ? "translate-x-full"
              : "-translate-x-full"
          }
        `}
      >
        <div className="flex justify-end mb-2">
          <button
            onClick={toggleMenu}
            className="cursor-pointer p-1 hover:bg-gray-100 duration-100 rounded"
          >
            <X size={18} stroke="#1f2b40" />
          </button>
        </div>

        <div className="mt-4 flex justify-between items-centerborder-b border-b-[#d1d1d1] pb-4">
          <p className="text-xl text-[#1f2b40]">{t("filtersTitle")}</p>
          <MainBtn onClick={resetFilters}>{t("clearAll")}</MainBtn>
        </div>
        <div className="space-y-5">
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
      </aside>
    </>
  );
};

export default MobileFilters;
