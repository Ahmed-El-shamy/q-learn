"use client";

import MainInput from "@/_components/common/inputs/mainInput/MainInput";
import useResetPassword from "../_hook/useResetPassword";
import MainBtn from "@/_components/common/buttons/MainBtn";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";

const ResetPasswordForm = () => {
  const t = useTranslations("auth.resetPassword");
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const {
    methods: {
      register,
      formState: { errors },
    },
    handleSubmit,
    resetPasswordMutation,
  } = useResetPassword({ email });

  if (!email) {
    return (
      <>
        <h2 className="text-2xl md:text-xl lg:text-3xl font-bold">
          {t("title")}
        </h2>
        <p className="mt-4 text-red-600">{t("emailRequired")}</p>
        <MainBtn
          type="button"
          containerClassName="mt-4"
          onClick={() => router.replace("/auth/forget-password")}
        >
          {t("backToForgetPassword")}
        </MainBtn>
      </>
    );
  }

  return (
    <>
      <h2 className="text-2xl md:text-xl lg:text-3xl font-bold">
        {t("title")}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full mt-5">
        <MainInput
          type="password"
          placeholder="auth.resetPassword.newPasswordPlaceholder"
          {...register("password")}
          error={errors.password?.message}
        />

        <MainInput
          type="password"
          placeholder="auth.resetPassword.confirmPasswordPlaceholder"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <MainBtn
          type="submit"
          size="large"
          containerClassName="mt-4"
          isLoading={resetPasswordMutation.isPending}
          disabled={resetPasswordMutation.isPending}
        >
          {t("button")}
        </MainBtn>
      </form>
    </>
  );
};

export default ResetPasswordForm;
