import api, { Api } from "@/_lib/api/api";
import { Instructor } from "@/types/instructor.types";
import { queryOptions } from "@tanstack/react-query";

export const instructorsOptions = () =>
  queryOptions({
    queryKey: [Api?.routes?.site?.instructors],
    queryFn: async () => {
      const res = await api.get(Api?.routes?.site?.instructors);
      return res?.data as Instructor[];
    },

    staleTime: 60_000,
  });
