import { useTranslations } from "next-intl";
import { useCoursesFilters } from "../_services/CourseFilterProvider";

const options = [
    "is_featured",
    "is_trending"
] as const;

const BooleanFilters = () => {
    const {
        filters,
        handleChangeFilters
    } = useCoursesFilters();
    const t = useTranslations();

    function handleToggle(key: typeof options[number]) {
        if(!filters[key]) {
            handleChangeFilters(key, !filters[key], true);
            return;
        }

        handleChangeFilters(key, undefined, true);
    }

    return (
        <div className="border border-[#d1d1d1] min-h-20 max-h-80 p-4 flex flex-col">
            <h2 className="text-xl text-[#202e3b] shrink-0">{t("filters.offers")}</h2>

            <div className="mt-5 flex-1 overflow-y-auto pe-3 space-y-4 pb-5">
                {options.map((option) => (
                    <label
                        key={option}
                        className="custom-checkbox-container group cursor-pointer flex items-center gap-3"
                    >
                        <input
                            type="checkbox"
                            checked={!!filters?.[option]}
                            onChange={() => handleToggle(option)}
                            name="skill-web-dev"
                        />

                        <span className="custom-checkmark"></span>

                        <span
                            className="text-[#202e3b] transition-all duration-300
                group-hover:bg-linear-to-r group-hover:from-[#00C950] group-hover:to-[#007A33] group-hover:bg-clip-text group-hover:text-transparent"
                        >
                            {t(`filters.${option}`)}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export default BooleanFilters;