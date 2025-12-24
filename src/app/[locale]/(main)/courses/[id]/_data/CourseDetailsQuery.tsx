import api, { Api } from "@/_lib/api/api";
import { queryOptions } from "@tanstack/react-query";
import { CourseDetails, Instructor, Review } from "../../_types/course.types";
import { CourseQA } from "../course-details.types";

const CourseDetailsQuery = (id: number | string) => queryOptions({
    queryKey: [Api.routes.site.courses, id],
    enabled: Boolean(id),
    queryFn: async () => {
        const response = await api.get<CourseDetails>(`${Api.routes.site.courses}/${id}`);
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

export const courseReviewsQuery = (id: string) => queryOptions({
    queryKey: [Api.routes.site.reviews, id],
    queryFn: async () => {
        const response = await api.get<Review[]>(`${Api.routes.site.reviews}/${id}`);
        return response?.data;
    },
});

export const courseQAQuery = (id: string) => queryOptions({
    queryKey: [Api.routes.site.courses_qa, id],
    queryFn: async () => {
        const response = await api.get<CourseQA[]>(`${Api.routes.site.courses_qa}/${id}`);
        return response?.data;
    },
});

export default CourseDetailsQuery;