"use client";
import MainInput from "@/_components/common/inputs/mainInput/MainInput";
import useForgetPassword from "../_hook/useForgetPassword";
import { Mail } from "lucide-react";
import MainBtn from "@/_components/common/buttons/MainBtn";
import { useTranslations } from "next-intl";

export interface ForgetPasswordPayload {
  email: string;
}

const ForgetPasswordForm = () => {
  const t = useTranslations("auth.forgetPassword");
  const { methods, handleSubmit, sendOtpMutation } = useForgetPassword();
  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <>
      <h2 className="text-2xl md:text-xl lg:text-3xl font-bold">
        {t("title")}
      </h2>

      <form
        className="flex flex-col gap-4 w-full mt-5"
        onSubmit={handleSubmit}
      >
        <MainInput
          required
          type="email"
          Icon={Mail}
          error={errors.email?.message}
          {...register("email")}
        />

        <MainBtn
          type="submit"
          containerClassName="mt-4"
          isLoading={sendOtpMutation.isPending}
          disabled={sendOtpMutation.isPending}
        >
          {t("sendOtp")}
        </MainBtn>
      </form>
    </>
  );
};

export default ForgetPasswordForm;
