"use client";

import MainInput from "@/_components/common/inputs/mainInput/MainInput";
import useLogin from "../_hooks/useLogin";
import { Lock, Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";
import MainBtn from "@/_components/common/buttons/MainBtn";
import { useTranslations } from "next-intl";

const LoginForm = () => {
  const t = useTranslations("auth.login");
  const {
    methods: {
      register,
      formState: { errors },
    },
    handleSubmit,
    mutation: {
      isPending
    }
  } = useLogin();

  return (
    <>
      <h2 className="text-2xl md:text-xl lg:text-3xl font-bold">
        {t("title")}
      </h2>

      <form className="flex flex-col gap-4 w-full mt-5" onSubmit={handleSubmit}>
        <MainInput
          placeholder="placeholder.enter-email"
          type="email"
          Icon={Mail}
          error={errors.email?.message}
          {...register("email")}
        />

        <MainInput
          placeholder="placeholder.enter-password"
          type="password"
          Icon={Lock}
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="flex-between text-sm mt-5">
          <label className="custom-checkbox-container flex items-center gap-2">
            <input type="checkbox" name="skill-web-dev" />

            <span className="custom-checkmark cursor-pointer"></span>
            <span>{t("rememberMe")}</span>
          </label>

          <Link href="/auth/forget-password" className="text-[#77c8fe] ">
            {t("forgetPassword")}
          </Link>
        </div>

        <MainBtn isLoading={isPending} type="submit" className="mt-4">
          {t("button")}
        </MainBtn>

        <p className="text-center">
          {t("dontHaveAccount")}{" "}
          <Link href={`/auth/register`} className="text-[#77c8fe]">
            {t("register")}
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginForm;