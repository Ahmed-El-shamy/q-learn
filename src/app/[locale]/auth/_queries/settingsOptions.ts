import { Api } from "@/_lib/api/api";
import type { Settings } from "@/types/settings.types";
import api from "@/_lib/api/api";
import { queryOptions } from "@tanstack/react-query";

export const settingsOptions = () =>
  queryOptions({
    queryKey: [Api.routes.site.settings],
    queryFn: async (): Promise<Settings> => {
      const res = await api.get(Api.routes.site.settings);
      return (res?.data as Settings) ?? ({} as Settings);
    },
    staleTime: 60_000,
  });
