"use client";

import { useCoursesFilters } from "../_services/CourseFilterProvider";
import { useTranslations } from "next-intl";
import { useInstructorsQuery } from "../_services/_hooks/useFiltersQuery";
import FilterSkelton from "./FilterSkelton";

const InstructorsFilter = () => {
  const { filters, handleChangeFilters } = useCoursesFilters();
  const { data: instructors, isLoading, isFetching } = useInstructorsQuery();
  const t = useTranslations("filters");

  const handleToggle = (id: number) => {
    const currentSelected = filters.instructor || [];
    const stringId = String(id);

    const newValues = currentSelected.includes(stringId)
      ? currentSelected.filter((v) => v !== stringId)
      : [...currentSelected, stringId];

    handleChangeFilters("instructor", newValues, true);
  };

  if (isLoading || isFetching) {
    return <FilterSkelton />;
  }

  return (
    <div className="border border-[#d1d1d1] p-4 min-h-20 max-h-80 flex flex-col">
      <h2 className="text-xl text-[#202e3b] shrink-0">{t("instructor")}</h2>

      <div className="mt-5 flex-1 overflow-y-auto pe-3 space-y-4 pb-5">
        {instructors?.map((instructor, i) => {
          const isChecked =
            filters.instructor?.includes(String(instructor.user.id)) || false;
          return (
            <label
              key={i}
              className="custom-checkbox-container group cursor-pointer flex items-center gap-3"
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleToggle(instructor.user.id)}
                name="skill-web-dev"
              />

              <span className="custom-checkmark"></span>

              <span
                className="text-[#202e3b] transition-all duration-300
                group-hover:bg-linear-to-r group-hover:from-[#660afb] group-hover:to-[#b633ff] group-hover:bg-clip-text group-hover:text-transparent"
              >
                <span>{instructor.user.name}</span>
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default InstructorsFilter;
