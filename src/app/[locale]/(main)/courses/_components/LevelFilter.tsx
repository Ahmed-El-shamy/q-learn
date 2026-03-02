import React from "react";
import { useCoursesFilters } from "../_services/CourseFilterProvider";
import { useCourseQuery } from "../_services/_hooks/useCourseQuery";
import { useTranslations } from "next-intl";

const LEVEL_OPTIONS = [
  { labelKey: "beginner" as const, value: "beginner" },
  { labelKey: "intermediate" as const, value: "intermediate" },
  { labelKey: "advanced" as const, value: "advanced" },
  { labelKey: "professional" as const, value: "pro" },
] as const;

const LevelFilter = () => {
  const { filters, handleChangeFilters } = useCoursesFilters();
  const t = useTranslations("filters");
  const tLevel = useTranslations("levels");

  const handleToggle = (value: string) => {
    const currentSelected = filters.level || [];
    const newValues = currentSelected.includes(value)
      ? currentSelected.filter((v) => v !== value)
      : [...currentSelected, value];

    handleChangeFilters("level", newValues, true);
  };

  return (
    <div className="border border-[#d1d1d1] min-h-20 max-h-80 p-4 flex flex-col">
      <h2 className="text-xl text-[#202e3b] shrink-0">{t("level")}</h2>

      <div className="mt-5 flex-1 overflow-y-auto pe-3 space-y-4 pb-5">
        {LEVEL_OPTIONS.map((option) => (
          <label
            key={option.value}
            className="custom-checkbox-container group cursor-pointer flex items-center gap-3"
          >
            <input
              type="checkbox"
              checked={(filters.level || []).includes(option.value)}
              onChange={() => handleToggle(option.value)}
              name="skill-web-dev"
            />

            <span className="custom-checkmark"></span>

            <span
              className="text-[#202e3b] transition-all duration-300
                group-hover:bg-linear-to-r group-hover:from-[#660afb] group-hover:to-[#b633ff] group-hover:bg-clip-text group-hover:text-transparent"
            >
              {tLevel(option.labelKey)}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default LevelFilter;
