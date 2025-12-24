import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Course, CourseFilters, SortBy } from "../../_types/courses.types";
import { useCourseApi } from "./useCourseApi";

type UseCourseQueryProps = {
  filters?: CourseFilters;
  sort?: SortBy | string;
};

export const useCourseQuery = ({ filters, sort }: UseCourseQueryProps) => {
  const { getCourses } = useCourseApi();

  return useQuery({
    queryKey: ["courses", filters, sort],
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
  const { getCourseById } = useCourseApi();

  return useQuery<Course>({
    queryKey: ["course", id],
    queryFn: () => getCourseById(id),
    enabled: !!id,
  });
};

// export const useCourseQuery = ({ filters, sort }: UseCourseQueryProps) => {
//   const { getCourses } = useCourseApi();

//   return useQuery({
//     queryKey: ["courses", filters, sort],
//     queryFn: () =>
//       getCourses({
//         ...filters,
//         ...(sort && { sort_by: sort }),
//       }),
//     placeholderData: keepPreviousData,
//   });
// };
