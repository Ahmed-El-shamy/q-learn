"use client";
import { useTranslations } from "next-intl";
import { useCoursesFilters } from "../_services/CourseFilterProvider";
import Rate from "./Rate";

const RatingFilter = () => {
  const { filters, handleChangeFilters } = useCoursesFilters();
  const t = useTranslations("filters");

  const handleToggle = (value: number) => {
    const currentSelected = filters.rating || [];

    const isAlreadySelected = currentSelected.includes(value);

    const newValues = isAlreadySelected
      ? currentSelected.filter((v) => v !== value)
      : [...currentSelected, value];
    handleChangeFilters("rating", newValues, true);
  };

  return (
    <div className="border border-[#d1d1d1] p-4 flex flex-col">
      <h2 className="text-xl text-[#202e3b] shrink-0">{t("rating")}</h2>

      <div className="mt-5 flex-1 space-y-4 pe-3 pb-5">
        {[...Array(5)].map((_, i) => {
          const rateValue = 5 - i;
          return (
            <label
              key={i}
              className="custom-checkbox-container group cursor-pointer flex items-center gap-3"
            >
              <input
                type="checkbox"
                checked={filters.rating?.includes(rateValue) || false}
                onChange={() => handleToggle(rateValue)}
                name="skill-web-dev"
              />

              <span className="custom-checkmark"></span>

              <span
                className="text-sm text-[#202e3b] transition-all duration-300
                group-hover:bg-linear-to-r group-hover:from-[#00C950] group-hover:to-[#007A33] group-hover:bg-clip-text group-hover:text-transparent"
              >
                <Rate rate={rateValue} />
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default RatingFilter;
