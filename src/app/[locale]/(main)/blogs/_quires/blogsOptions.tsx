import api, { Api } from "@/_lib/api/api";
import { queryOptions } from "@tanstack/react-query";
import type { Blog } from "../types/blog.types";
export const blogsOptions = () =>
  queryOptions({
    queryKey: [Api?.routes?.site?.blogs],
    queryFn: async () => {
      const res = await api.get(Api?.routes?.site?.blogs);
      return res?.data as Blog[];
    },

    staleTime: 60_000,
  });
