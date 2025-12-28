import { Api } from "@/_lib/api/api";
import { getSettings } from "@/_lib/server/getSettings";
import { queryOptions } from "@tanstack/react-query";

export const contactSettingsOptions = () =>
  queryOptions({
    queryKey: [Api?.routes?.site?.settings],
    queryFn: async () => {
      const data = await getSettings();
      return data;
    },

    staleTime: 60_000,
  });
