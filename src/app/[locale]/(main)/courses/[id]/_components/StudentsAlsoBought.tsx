import { useTranslations } from "next-intl";
import { useCourseQuery } from "../../_services/_hooks/useCourseQuery";
import { useParams } from "next/navigation";
import TableSkeleton from "@/_components/common/loaders/skeltons/TableSkeleton";
import { useQuery } from "@tanstack/react-query";
import CourseDetailsQuery from "../_data/CourseDetailsQuery";
import CourseTableItem from "./CourseTableItem";

const StudentsAlsoBought = () => {
  const t = useTranslations("courses");
  const { id } = useParams();
  const { data: course } = useQuery({
    ...CourseDetailsQuery(id as string),
    refetchOnMount: false
  });

  const category = course?.category?.id;


  const { data: relatedCourses, isLoading } = useCourseQuery({
    filters: category ? { category_id: [category] } : undefined,
  });

  return (
    <section className="flex flex-col gap-4 sm:gap-5 md:gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary">
          {t("Students Also Bought")}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600">
          {t("More courses you might like")}
        </p>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-full">
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <div className="flex flex-col gap-3 sm:gap-4">
              {relatedCourses?.map((course) => (
                <CourseTableItem key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StudentsAlsoBought;
