"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordPayload,
  ResetPasswordSchema,
} from "../_schema/ResetPasswordSchema";
import { useMutation } from "@tanstack/react-query";
import api, { Api } from "@/_lib/api/api";
import toastErrorMessage from "@/_lib/api/toastErrorMessage";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type UseResetPasswordOptions = { email: string | null };

const useResetPassword = (options: UseResetPasswordOptions) => {
  const { email } = options;
  const router = useRouter();
  const t = useTranslations("auth.resetPassword");

  const methods = useForm<ResetPasswordPayload>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onChange",
  });

  const resetPasswordMutation = useMutation({
    mutationKey: [Api.routes.auth.resetPassword],
    mutationFn: async (payload: ResetPasswordPayload) => {
      if (!email) throw new Error("Email is required");
      const response = await api.post(Api.routes.auth.resetPassword, {
        email,
        password: payload.password,
        password_confirmation: payload.confirmPassword,
      });
      return response;
    },
    onSuccess: () => {
      toast.success(t("success"));
      router.replace("/auth/login");
    },
    onError: (err: unknown) => {
      toastErrorMessage(err);
    },
    throwOnError: false,
  });

  async function handleSubmit(payload: ResetPasswordPayload) {
    if (!email) {
      toast.error(t("emailRequired"));
      return;
    }
    await resetPasswordMutation.mutateAsync(payload);
  }

  return {
    methods,
    handleSubmit: methods.handleSubmit(handleSubmit),
    resetPasswordMutation,
  };
};

export default useResetPassword;
