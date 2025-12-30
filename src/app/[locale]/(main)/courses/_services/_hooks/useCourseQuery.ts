import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Course, CourseFilters, SortBy } from "../../_types/courses.types";
import { getCourseById, getCourses } from "../../_quires/course.api";
import { Api } from "@/_lib/api/api";

type UseCourseQueryProps = {
  filters?: CourseFilters;
  sort?: SortBy | string;
};

export const useCourseQuery = ({ filters, sort }: UseCourseQueryProps) => {
  return useQuery({
    queryKey: [Api.routes.site.courses, { filters, sort }],
    queryFn: () => {
      const formattedFilters: any = { ...filters };
      Object.keys(formattedFilters).forEach((key) => {
        if (Array.isArray(formattedFilters[key])) {
          const values = formattedFilters[key];
          delete formattedFilters[key];
          formattedFilters[`${key}[]`] = values;
        }
      });

      return getCourses({
        ...formattedFilters,
        ...(sort && { sort_by: sort }),
      });
    },
    placeholderData: keepPreviousData,
  });
};

export const useCourseByIdQuery = (id: string) => {
  return useQuery<Course>({
    queryKey: [`${Api.routes.site.courses}/${id}`],
    queryFn: () => getCourseById(id),
    enabled: !!id,
  });
};
