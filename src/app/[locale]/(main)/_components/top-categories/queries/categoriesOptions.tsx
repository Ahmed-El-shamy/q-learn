import api, { Api } from "@/_lib/api/api";
import { CategoryBase } from "@/types/categories.types";
import { queryOptions } from "@tanstack/react-query";

export const categoriesOptions = () =>
  queryOptions({
    queryKey: [Api?.routes?.site?.topCategories],
    queryFn: async () => {
      const res = await api.get(Api?.routes?.site?.topCategories);
      return res?.data as CategoryBase[];
    },

    staleTime: 60_000,
  });
