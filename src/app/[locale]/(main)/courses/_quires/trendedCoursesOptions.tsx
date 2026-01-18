import api, { Api } from "@/_lib/api/api";
import { queryOptions } from "@tanstack/react-query";
import { Course } from "../_types/course.types";

export const trendedCoursesOptions = () =>
  queryOptions({
    queryKey: [Api?.routes?.site?.courses],
    queryFn: async () => {
      const params = { is_trending: "true" };
      const res = await api.get(Api?.routes?.site?.courses, { params });
      return res?.data as Course[];
    },

    staleTime: 60_000,
  });
