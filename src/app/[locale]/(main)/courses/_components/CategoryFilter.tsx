"use client";
import { useMemo } from "react";
import { useCourseQuery } from "../_services/_hooks/useCourseQuery";
import { useCoursesFilters } from "../_services/CourseFilterProvider";
import { useTranslations } from "next-intl";
const CategoryFilter = () => {
  const { filters, sortBy, handleChangeFilters } = useCoursesFilters();
  const { data } = useCourseQuery({ filters: {}, sort: sortBy });
  const t = useTranslations("filters");

  const categories = useMemo(() => {
    if (!data) return [];

    const allCats = data.map((course) => ({
      id: String(course.category.id),
      name: course.category.name,
    }));

    const uniqueCats = Array.from(
      new Map(allCats.map((item) => [item.id, item])).values()
    );

    return uniqueCats.sort((a, b) => Number(a.id) - Number(b.id));
  }, [data]);

  const handleToggle = (categoryId: string) => {
    const currentSelected = filters.category_id || [];
    const newValues = currentSelected.includes(categoryId)
      ? currentSelected.filter((v) => v !== categoryId)
      : [...currentSelected, categoryId];

    handleChangeFilters("category_id", newValues);
  };

  return (
    <div className="border border-[#d1d1d1] p-4 min-h-20 max-h-80 flex flex-col">
      <h2 className="text-xl text-[#202e3b] shrink-0">{t("category")}</h2>

      <div className="mt-5 flex-1 overflow-y-auto pe-3 space-y-4 pb-5">
        {categories.map((cat, i) => (
          <label
            key={cat.id}
            className="custom-checkbox-container group cursor-pointer flex items-center gap-3"
          >
            <input
              type="checkbox"
              checked={filters.category_id?.includes(cat.id) || false}
              onChange={() => handleToggle(cat.id)}
              name="skill-web-dev"
            />

            <span className="custom-checkmark"></span>

            <span
              className="text-[#202e3b] transition-all duration-300
                group-hover:bg-linear-to-r group-hover:from-[#660afb] group-hover:to-[#b633ff] group-hover:bg-clip-text group-hover:text-transparent"
            >
              {cat.name}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
