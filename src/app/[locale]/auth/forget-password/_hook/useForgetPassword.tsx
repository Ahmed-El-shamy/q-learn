"use client";

import { useForm } from "react-hook-form";
import {
  ForgetPasswordPayload,
  forgetPasswordSchema,
} from "../_schema/forgetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/i18n/navigation";
import { useMutation } from "@tanstack/react-query";
import api, { Api } from "@/_lib/api/api";
import toastErrorMessage from "@/_lib/api/toastErrorMessage";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const useForgetPassword = () => {
  const router = useRouter();
  const t = useTranslations("auth.forgetPassword");
  const methods = useForm<ForgetPasswordPayload>({
    resolver: zodResolver(forgetPasswordSchema),
    mode: "onChange",
  });

  const sendOtpMutation = useMutation({
    mutationKey: [Api.routes.auth.sendOtp],
    mutationFn: async (payload: ForgetPasswordPayload) => {
      const response = await api.post(Api.routes.auth.sendOtp, payload);
      return response;
    },
    onSuccess: (_data, variables) => {
      toast.success(t("otpSent"));
      router.push(`/auth/otp?email=${encodeURIComponent(variables.email)}`);
    },
    onError: (err: unknown) => {
      toastErrorMessage(err);
    },
    throwOnError: false,
  });

  const handleSubmit = methods.handleSubmit(
    async (payload: ForgetPasswordPayload) => {
      await sendOtpMutation.mutateAsync(payload);
    }
  );

  return { methods, handleSubmit, sendOtpMutation };
};

export default useForgetPassword;
