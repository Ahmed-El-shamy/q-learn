import api, { Api } from "@/_lib/api/api";
import { Category } from "../_types/courses.types";
import { Instructor } from "../_types/course.types";

export const getCategories = async () => {
  const response = await api.get(`${Api.routes.site.list}/categories`);
  return response?.data as Category[];
};

export const getInstructors = async () => {
  const response = await api.get(`${Api.routes.site.list}/instructors`);
  return response?.data as Instructor[];
};
