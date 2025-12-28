// features/newsletter/_api/useSubmitNewsLetter.ts
import api, { Api } from "@/_lib/api/api";
import { useMutation } from "@tanstack/react-query";

type NewsLetterResponse = {
  status?: boolean;
  message?: string;
};

export function useSubmitNewsLetter() {
  return useMutation({
    mutationKey: [Api.routes.site.newsLetter],
    mutationFn: async (email: string) => {
      const res = await api.post(Api.routes.site.newsLetter, { email });
      return res?.data as NewsLetterResponse;
    },
  });
}
