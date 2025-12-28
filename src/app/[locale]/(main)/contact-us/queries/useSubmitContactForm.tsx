// features/contact/_api/useSubmitContactForm.ts
import api, { Api } from "@/_lib/api/api";
import { useMutation } from "@tanstack/react-query";
import type { ContactPayload } from "../_schema/ContactSchema";

const useSubmitContactForm = () => {
  return useMutation({
    mutationKey: [Api.routes.site.contact_us],
    mutationFn: async (payload: ContactPayload) => {
      const res = await api.post(Api.routes.site.contact_us, payload);
      return res?.data;
    },
  });
};

export default useSubmitContactForm;
