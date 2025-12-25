import api, { Api } from "@/_lib/api/api";
import { queryOptions } from "@tanstack/react-query";
import { Blog } from "../_types/blogs.types";

// Query for fetching a list of blogs
export const blogsListQuery = (params?: Record<string, any>) => queryOptions({
  queryKey: [Api.routes.site.blogs, params],
  queryFn: async () => {
    const response = await api.get<Blog[]>(Api.routes.site.blogs, { params });
    return response?.data;
  },
});

// Query for fetching blog details by ID
export const blogDetailsQuery = (id: number | string) => queryOptions({
  queryKey: [Api.routes.site.blogs, id],
  enabled: Boolean(id),
  queryFn: async () => {
    const response = await api.get<Blog>(`${Api.routes.site.blogs}/${id}`);
    return response?.data;
  },
});

