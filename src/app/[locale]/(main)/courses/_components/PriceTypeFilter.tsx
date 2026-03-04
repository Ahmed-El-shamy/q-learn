"use client";
import { useTranslations } from "next-intl";
import { useCoursesFilters } from "../_services/CourseFilterProvider";

const PriceTypeFilter = () => {
  const { filters, handleChangeFilters } = useCoursesFilters();
  const t = useTranslations("filters");
  const tPrice = useTranslations("priceType");

  const priceTypes = [
    { label: tPrice("paid"), value: "false" },
    { label: tPrice("free"), value: "true" },
  ];

  const handleToggle = (value: string) => {
    // * Why are we mapping over the array ?
    const currentSelected = (filters.is_free || []).map(String);

    const newValues = currentSelected.includes(value)
      ? currentSelected.filter((v) => v !== value)
      : [...currentSelected, value];

    handleChangeFilters("is_free", newValues, true);
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
                group-hover:bg-linear-to-r group-hover:from-[#00C950] group-hover:to-[#007A33] group-hover:bg-clip-text group-hover:text-transparent"
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
