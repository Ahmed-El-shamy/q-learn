"use client";
import { Search } from "lucide-react";
import { useCoursesFilters } from "../../courses/_services/CourseFilterProvider";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const SearchFilter = () => {
  const { filters, handleChangeFilters } = useCoursesFilters();
  const [value, setValue] = useState(filters.search || "");
  const t = useTranslations("filters");

  const filterHandlerRef = useRef(handleChangeFilters);
  useEffect(() => {
    filterHandlerRef.current = handleChangeFilters;
  }, [handleChangeFilters]);

  useEffect(() => {
    setValue(filters.search || "");
  }, [filters.search]);

  useEffect(() => {
    if (value === (filters.search || "")) return;

    const timer = setTimeout(() => {
      filterHandlerRef.current("search", value, false);
    }, 500);

    return () => clearTimeout(timer);
  }, [value, filters.search]);

  return (
    <div className="relative w-full">
      <Search size={20} stroke="#656a7b" className="absolute top-4.5 start-4" />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pe-4 ps-11 py-4 text-[#373737] placeholder:text-[#373737] placeholder:text-sm border border-[#d1d1d1] w-full outline-0"
        placeholder={`${t("search")}...`}
      />
    </div>
  );
};

export default SearchFilter;
