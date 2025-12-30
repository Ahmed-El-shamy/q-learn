import api, { Api } from "@/_lib/api/api";
import { Course } from "../_types/courses.types";

export const getCourses = async (params?: Record<string, any>) => {
  const response = await api.get(Api.routes.site.courses, {
    params,
  });
  return response?.data as Course[];
};

export const getCourseById = async (id: string): Promise<Course> => {
  const response = await api.get<Course>(`${Api.routes.site.courses}/${id}`);
  if (!response?.data) throw new Error("Course not found");
  return response.data;
};
