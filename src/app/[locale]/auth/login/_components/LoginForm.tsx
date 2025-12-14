"use client";
import { FormEvent, useState } from "react";
import AuthBtn from "@/_components/common/buttons/AuthBtn";
import MainInput from "@/_components/common/inputs/mainInput/MainInput";

import { useLocale } from "next-intl";
import useLogin from "../_hooks/useLogin";
import { Lock, Mail } from "lucide-react";
import MainSelect from "@/_components/common/inputs/main-select-input/MainSelect";
import { Link } from "@/i18n/navigation";

const roleOptions = [
  { id: 1, name: "Instructor" },
  { id: 2, name: "User" },
];

const LoginForm = () => {
  const {
    methods: {
      register,
      formState: { errors },
      watch,
    },
    handleSubmit,
  } = useLogin();
  const local = useLocale();

  return (
    <>
      <h2 className="text-2xl md:text-xl lg:text-3xl font-bold">
        Welcome back. Please login to your account
      </h2>

      <form className="flex flex-col gap-4 w-full mt-5" onSubmit={handleSubmit}>
        <MainInput
          placeholder="Enter Your Email"
          type="email"
          Icon={Mail}
          error={errors.email?.message}
          {...register("email")}
        />

        <MainInput
          placeholder="Enter Your Password"
          type="password"
          Icon={Lock}
          error={errors.password?.message}
          {...register("password")}
        />

        <MainSelect placeholder="Choose Role" options={roleOptions} />

        <div className="flex-between text-sm mt-5">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="cursor-pointer w-4 h-4 -mt-1 accent-[#660afb] border-[#b633ff] border-2"
            />

            <span>Remember Me</span>
          </div>

          <Link href="/auth/forget-password" className="text-[#77c8fe] ">
            Forget Password?
          </Link>
        </div>

        <AuthBtn text="Login" classname="mt-4" />

        <p className="text-center">
          Don't have account?{" "}
          <Link href={`/auth/register`} className="text-[#77c8fe]">
            Register
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
