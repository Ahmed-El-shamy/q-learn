import React, { useMemo } from "react";
import { useCoursesFilters } from "../_services/CourseFilterProvider";
import { useCourseQuery } from "../_services/_hooks/useCourseQuery";
import { useTranslations } from "next-intl";

const LevelFilter = () => {
  const { filters, sortBy, handleChangeFilters } = useCoursesFilters();
  const { data } = useCourseQuery({ filters: {}, sort: sortBy });
  const t = useTranslations("filters");

  const levels = useMemo(() => {
    if (!data) return [];
    const level = data.map((course) => course.level);
    return Array.from(new Set(level));
  }, [data]);

  const handleToggle = (value: string) => {
    const currentSelected = filters.level || [];
    const newValues = currentSelected.includes(value)
      ? currentSelected.filter((v) => v !== value)
      : [...currentSelected, value];

    handleChangeFilters("level", newValues);
  };

  return (
    <div className="border border-[#d1d1d1] min-h-20 max-h-80 p-4 flex flex-col">
      <h2 className="text-xl text-[#202e3b] shrink-0">{t("level")}</h2>

      <div className="mt-5 flex-1 overflow-y-auto pe-3 space-y-4 pb-5">
        {levels.map((level, i) => (
          <label
            key={i}
            className="custom-checkbox-container group cursor-pointer flex items-center gap-3"
          >
            <input
              type="checkbox"
              checked={(filters.level || []).includes(level)}
              onChange={() => handleToggle(level)}
              name="skill-web-dev"
            />

            <span className="custom-checkmark"></span>

            <span
              className="text-[#202e3b] transition-all duration-300
                group-hover:bg-linear-to-r group-hover:from-[#660afb] group-hover:to-[#b633ff] group-hover:bg-clip-text group-hover:text-transparent"
            >
              {level}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default LevelFilter;
