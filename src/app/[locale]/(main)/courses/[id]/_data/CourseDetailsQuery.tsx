import api, { Api } from "@/_lib/api/api";
import { queryOptions } from "@tanstack/react-query";
import { Course, Instructor } from "../../_types/course.types";

const CourseDetailsQuery = (id: number | string) => queryOptions({
    queryKey: [Api.routes.site.courses, id],
    enabled: Boolean(id),
    queryFn: async () => {
        const response = await api.get<Course>(`${Api.routes.site.courses}/${id}`);
        return response?.data;
    }, 
});

export const courseInstructorQuery = (id: string) => queryOptions({
    queryKey: [Api.routes.site.courses, id, "instructor"],
    queryFn: async () => {
        const response = await api.get<Instructor>(`${Api.routes.site.courses}/${id}/instructor`)
        return response?.data;
    },
});

export default CourseDetailsQuery;