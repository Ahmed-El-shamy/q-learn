"use client";
import { useTranslations } from "next-intl";
import { useCoursesFilters } from "../_services/CourseFilterProvider";

const PriceTypeFilter = () => {
  const { filters, handleChangeFilters } = useCoursesFilters();
  const t = useTranslations("filters");

  const priceTypes = [
    { label: "Paid", value: "false" },
    { label: "Free", value: "true" },
  ];

  const handleToggle = (value: string) => {
    const currentSelected = (filters.is_free || []).map(String);

    const newValues = currentSelected.includes(value)
      ? currentSelected.filter((v) => v !== value)
      : [...currentSelected, value];

    handleChangeFilters("is_free", newValues);
  };

  return (
    <div className="border border-[#d1d1d1] p-4 flex flex-col">
      <h2 className="text-xl text-[#202e3b] shrink-0">{t("price type")}</h2>

      <div className="mt-5 flex-1 space-y-4 pb-5">
        {priceTypes.map((type) => (
          <label
            key={type.label}
            className="custom-checkbox-container group cursor-pointer flex items-center gap-3"
          >
            <input
              type="checkbox"
              checked={(filters.is_free || [])
                .map(String)
                .includes(String(type.value))}
              onChange={() => {
                handleToggle(type.value);
              }}
              name="skill-web-dev"
            />

            <span className="custom-checkmark"></span>

            <span
              className="text-[#202e3b] transition-all duration-300
                group-hover:bg-linear-to-r group-hover:from-[#660afb] group-hover:to-[#b633ff] group-hover:bg-clip-text group-hover:text-transparent"
            >
              {type.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PriceTypeFilter;
