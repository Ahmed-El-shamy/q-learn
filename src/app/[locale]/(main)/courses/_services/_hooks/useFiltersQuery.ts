import { useQuery } from "@tanstack/react-query";
import { Category } from "../../_types/courses.types";
import { Api } from "@/_lib/api/api";
import { getCategories, getInstructors } from "../../_quires/filters.api";
import { Instructor } from "../../_types/course.types";
import { useLocale } from "next-intl";

export const useCategoriesQuery = () => {
  const locale = useLocale();
  return useQuery<Category[]>({
    queryKey: [`${Api.routes.site.list}/categories`, locale],
    queryFn: getCategories,
  });
};

export const useInstructorsQuery = () => {
  const locale = useLocale();
  return useQuery<Instructor[]>({
    queryKey: [`${Api.routes.site.list}/instructors`, locale],
    queryFn: getInstructors,
  });
};
