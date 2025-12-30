import { useQuery } from "@tanstack/react-query";
import { Category } from "../../_types/courses.types";
import { Api } from "@/_lib/api/api";
import { getCategories, getInstructors } from "../../_quires/filters.api";
import { Instructor } from "../../_types/course.types";

export const useCategoriesQuery = () => {
  return useQuery<Category[]>({
    queryKey: [`${Api.routes.site.list}/categories`],
    queryFn: getCategories,
  });
};

export const useInstructorsQuery = () => {
  return useQuery<Instructor[]>({
    queryKey: [`${Api.routes.site.list}/instructors`],
    queryFn: getInstructors,
  });
};
