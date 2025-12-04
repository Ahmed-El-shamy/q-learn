"use client";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { LoginPayload } from "../login.types";
import AuthBtn from "@/_components/common/buttons/AuthBtn";
import MainInput from "@/_components/common/inputs/mainInput/MainInput";
import Link from "next/link";
import { useLocale } from "next-intl";
import useLogin from "../_hooks/useLogin";

const LoginForm = () => {
  const [credentials, setCredentials] = useState<LoginPayload>({
    email: "",
    password: "",
  });

  const {
    methods: {
      register,
      formState: {
        errors,
      },
      watch
    },
    handleSubmit
  } = useLogin();
  const local = useLocale();

  return (
    <form
      className="flex flex-col gap-4 border p-2 border-black rounded-lg w-full py-10 px-6"
      onSubmit={handleSubmit}
    >
      <MainInput
        placeholder="Enter Your Email"
        type="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <MainInput
        placeholder="Enter Your Password"
        type="password"
        error={errors.password?.message}
        {...register("password")}
      />

      <AuthBtn text="Login" />

      <Link href={`/${local}/auth/register`} className="ml-auto">
        Don't have account?
      </Link>
    </form>
  );
};

export default LoginForm;
