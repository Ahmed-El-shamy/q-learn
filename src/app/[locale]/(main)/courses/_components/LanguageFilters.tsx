import { useCoursesFilters } from "../_services/CourseFilterProvider";
import { useTranslations } from "next-intl";

const languagesOptions = [
    "en",
    "ar",
];

const LanguageFilter = () => {
  const { filters, handleChangeFilters } = useCoursesFilters();
  const t = useTranslations();

  const handleToggle = (value: string) => {
    const currentSelected = filters.languages;
    if (value && currentSelected !== value) {
      handleChangeFilters("languages", value, true);
    }
  };

  return (
    <div className="border border-[#d1d1d1] min-h-20 max-h-80 p-4 flex flex-col">
      <h2 className="text-xl text-[#202e3b] shrink-0">{t("language.language")}</h2>

      <div className="mt-5 flex-1 overflow-y-auto pe-3 space-y-4 pb-5">
        {languagesOptions.map((option) => (
          <label
            key={option}
            className="custom-checkbox-container group cursor-pointer flex items-center gap-3"
          >
            <input
              type="checkbox"
              checked={filters.languages === option}
              onChange={() => handleToggle(option)}
              name="skill-web-dev"
            />

            <span className="custom-checkmark"></span>

            <span
              className="text-[#202e3b] transition-all duration-300
                group-hover:bg-linear-to-r group-hover:from-[#00C950] group-hover:to-[#007A33] group-hover:bg-clip-text group-hover:text-transparent"
            >
              {t(`language.${option}`)}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default LanguageFilter;