"use client";

import { useMemo } from "react";
import { useCourseQuery } from "../_services/_hooks/useCourseQuery";
import { useCoursesFilters } from "../_services/CourseFilterProvider";
import { Instructor } from "../_types/courses.types";
import { useTranslations } from "next-intl";

const InstructorsFilter = () => {
  const { filters, sortBy, handleChangeFilters } = useCoursesFilters();
  const { data } = useCourseQuery({ filters: {}, sort: sortBy });
  const t = useTranslations("filters");

  const instructors = useMemo(() => {
    if (!data) return [];

    const allInstructors = data
      .map((course) => course.instructor)
      .filter(Boolean) as Instructor[];

    const uniqueInstructors = Array.from(
      new Map(allInstructors.map((inst) => [inst.user.id, inst])).values()
    );

    return uniqueInstructors;
  }, [data]);

  const handleToggle = (id: number) => {
    const currentSelected = filters.instructor || [];
    const stringId = String(id);

    const newValues = currentSelected.includes(stringId)
      ? currentSelected.filter((v) => v !== stringId)
      : [...currentSelected, stringId];

    handleChangeFilters("instructor", newValues);
  };

  return (
    <div className="border border-[#d1d1d1] p-4 min-h-20 max-h-80 flex flex-col">
      <h2 className="text-xl text-[#202e3b] shrink-0">{t("instructor")}</h2>

      <div className="mt-5 flex-1 overflow-y-auto pe-3 space-y-4 pb-5">
        {instructors.map((instructor, i) => {
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
