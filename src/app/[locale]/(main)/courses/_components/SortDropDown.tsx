"use client";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useCoursesFilters } from "../_services/CourseFilterProvider";
import { SortBy } from "../_types/courses.types";
import { useTranslations } from "next-intl";

const SortDropdown = () => {
  const { sortBy, setSortBy } = useCoursesFilters();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("sort");

  const options: SortBy[] = [
    "oldest",
    "latest",
    "lowest_rated",
    "most_rated",
    "price_lowest",
    "price_highest",
  ];

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderLabel = (opt: string) => {
    if (!opt) return t("label");
    return t(opt);
  };

  return (
    <div className="relative w-44" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 border border-[#d1d1d1] rounded-md flex justify-between items-center cursor-pointer"
      >
        <span className="text-[#202e3b]">{renderLabel(sortBy || "")}</span>
        <span
          className={`ms-2 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <ChevronDown size={18} />
        </span>
      </button>

      {isOpen && (
        <ul className="absolute start-0 w-full mt-1 border border-gray-300 rounded-md bg-white shadow-md z-100">
          {options.map((opt) => (
            <li
              key={opt}
              className={`p-2 capitalize cursor-pointer hover:bg-purple-100 ${
                sortBy === opt ? "bg-purple-200 font-semibold" : ""
              }`}
              onClick={() => {
                setSortBy(opt);
                setIsOpen(false);
              }}
            >
              {renderLabel(opt)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;
