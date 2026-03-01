"use client";

import { useMutation } from "@tanstack/react-query";
import api, { Api } from "@/_lib/api/api";
import toastErrorMessage from "@/_lib/api/toastErrorMessage";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export type CheckOtpPayload = { email: string; code: string };
export type ResendOtpPayload = { email: string };

const useOtp = (email: string | null) => {
  const router = useRouter();
  const t = useTranslations("auth.otp");

  const checkOtpMutation = useMutation({
    mutationKey: [Api.routes.auth.checkOtp],
    mutationFn: async (payload: CheckOtpPayload) => {
      const response = await api.post(Api.routes.auth.checkOtp, payload);
      return response;
    },
    onSuccess: (_data, variables) => {
      toast.success(t("verified"));
      router.replace(
        `/auth/reset-password?email=${encodeURIComponent(variables.email)}`
      );
    },
    onError: (err: unknown) => {
      toastErrorMessage(err);
    },
    throwOnError: false,
  });

  const resendOtpMutation = useMutation({
    mutationKey: [Api.routes.auth.resendOtp],
    mutationFn: async (payload: ResendOtpPayload) => {
      const response = await api.post(Api.routes.auth.resendOtp, payload);
      return response;
    },
    onSuccess: () => {
      toast.success(t("resendSuccess"));
    },
    onError: (err: unknown) => {
      toastErrorMessage(err);
    },
    throwOnError: false,
  });

  const submitOtp = (code: string) => {
    if (!email) {
      toast.error(t("emailRequired"));
      return;
    }
    checkOtpMutation.mutate({ email, code });
  };

  const resendOtp = () => {
    if (!email) {
      toast.error(t("emailRequired"));
      return;
    }
    resendOtpMutation.mutate({ email });
  };

  return {
    submitOtp,
    resendOtp,
    checkOtpMutation,
    resendOtpMutation,
  };
};

export default useOtp;
