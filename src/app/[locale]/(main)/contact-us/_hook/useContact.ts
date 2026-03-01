// features/contact/_hook/useContact.ts
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import useSubmitContactForm from "../queries/useSubmitContactForm";
import { ContactPayload, ContactSchema } from "../_schema/ContactSchema";

type ApiFieldErrors = Record<string, string[] | string>;

function normalizeFieldErrors(err: unknown): ApiFieldErrors | null {

  const anyErr = err as any;
  return (
    anyErr?.response?.data?.errors ||
    anyErr?.response?.data?.data?.errors ||
    null
  );
}

const useContact = () => {
  const t = useTranslations("contact");
  const submitMutation = useSubmitContactForm();

  const methods = useForm<ContactPayload>({
    resolver: zodResolver(ContactSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "firstError",
    shouldFocusError: true,
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (payload: ContactPayload) => {
    if (submitMutation.isPending) return;

    try {
      await submitMutation.mutateAsync(payload);

      toast.success(t("toastSuccess"));
      methods.reset();
    } catch (err) {
      const fieldErrors = normalizeFieldErrors(err);
      if (fieldErrors) {
        Object.entries(fieldErrors).forEach(([key, value]) => {
          const msg = Array.isArray(value) ? value[0] : value;
          if (!msg) return;

          if (key in methods.getValues()) {
            methods.setError(key as keyof ContactPayload, {
              type: "server",
              message: msg,
            });
          }
        });

        toast.error(t("toastErrorFields"));
        return;
      }

      toast.error(t("toastErrorGeneric"));
    }
  };

  return {
    methods,
    onSubmit: methods.handleSubmit(onSubmit),
    isSubmitting: submitMutation.isPending,
  };
};

export default useContact;
