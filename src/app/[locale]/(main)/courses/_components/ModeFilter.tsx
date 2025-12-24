"use client";

import { useTranslations } from "next-intl";
import { useCoursesFilters } from "../_services/CourseFilterProvider";

const ModeFilter = () => {
  const { filters, handleChangeFilters } = useCoursesFilters();
  const t = useTranslations("filters");
  const mode = ["offline", "online"];

  const handleToggle = (value: string) => {
    const currentSelected = filters.mode || [];
    const newValues = currentSelected.includes(value)
      ? currentSelected.filter((v) => v !== value)
      : [...currentSelected, value];

    handleChangeFilters("mode", newValues);
  };

  return (
    <div className="border border-[#d1d1d1] min-h-20 max-h-80 p-4 flex flex-col">
      <h2 className="text-xl text-[#202e3b] shrink-0"> {t("mode")} </h2>

      <div className="mt-5 flex-1 overflow-y-auto pe-3 space-y-4 pb-5">
        {mode.map((mod, i) => (
          <label
            key={i}
            className="custom-checkbox-container group cursor-pointer flex items-center gap-3"
          >
            <input
              type="checkbox"
              checked={(filters.mode || []).includes(mod)}
              onChange={() => {
                handleToggle(mod);
              }}
              name="skill-web-dev"
            />

            <span className="custom-checkmark"></span>

            <span
              className="text-[#202e3b] transition-all duration-300 capitalize
                group-hover:bg-linear-to-r group-hover:from-[#660afb] group-hover:to-[#b633ff] group-hover:bg-clip-text group-hover:text-transparent"
            >
              {mod}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ModeFilter;
