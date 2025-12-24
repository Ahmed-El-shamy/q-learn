import { Link } from "@/i18n/navigation";
import { Clock3, GraduationCap, Star, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Rate from "../../_components/Rate";
import { FC } from "react";
import { CourseCategory } from "../../_types/course.types";

interface Props {
  title: string;
  description: string;
  instructor: string;
  students: number;
  rating: number;
  hours: string | number;
  category: CourseCategory;
}

const CourseHero: FC<Props> = ({
  title,
  description,
  students: studentsCount,
  instructor,
  hours,
  rating,
  category
}) => {
  const t = useTranslations("courses");

  return (
    <div className="w-full bg-[url('/images/courses/course-hero.jpg')] relative py-22 text-white">
      <div className="absolute top-0 left-0 h-full w-full bg-black/60" />
      <div className="max-w-[600px] md:max-w-[800px] lg:max-w-[1400px] px-2 md:px-8 mx-auto relative z-10">
        <div className="w-full lg:w-2/3 flex flex-col gap-2">
          <p className="text-xs sm:text-sm md:text-base">Course / Course Details</p>
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
            {title}
          </h1>
          <p className="text-sm text-white">
            {description}
          </p>
          <div className="py-4 sm:py-6 md:py-8 flex items-center gap-2 sm:gap-4">
            <Link
              href={`/courses/?filter-category=${category.id}`}
              className="underline text-white text-xs sm:text-sm md:text-base"
            >
              {
                category.name
              }
            </Link>

          </div>
          <div className="flex items-center flex-wrap gap-2 sm:gap-4">
            <div className="bg-primary p-1.5 sm:p-2 flex items-center gap-1.5 sm:gap-2 rounded">
              <div className="flex justify-center items-center rounded-full bg-gray-100 p-1.5 sm:p-2">
                <User className="text-gray-700" size={16} />
              </div>
              <p className="text-xs sm:text-sm md:text-base">{instructor}</p>
            </div>
            <div className="bg-white p-1.5 sm:p-2 flex items-center gap-1.5 sm:gap-2 rounded text-black">
              <GraduationCap size={16} className="sm:w-5 sm:h-5" />
              <p className="text-xs sm:text-sm md:text-base">{studentsCount}</p>
              <p className="text-xs sm:text-sm md:text-base">{t("students")}</p>
            </div>
            <div className="bg-white p-1.5 sm:p-2 flex items-center gap-1.5 sm:gap-2 rounded text-black">
              <Clock3 size={16} className="sm:w-5 sm:h-5" />
              <p className="text-xs sm:text-sm md:text-base">{t("duration.h", {hours: hours})}</p>
              <p className="text-xs sm:text-sm md:text-base">{t("duration.duration", { defaultMessage: "Duration" })}</p>
            </div>
            <div className="bg-white p-1.5 sm:p-2 flex items-center gap-1.5 sm:gap-2 rounded text-black">
              <Rate rate={rating} />
              <p className="font-semibold text-primary pt-px text-xs sm:text-sm md:text-base">{rating.toFixed(1)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHero;
