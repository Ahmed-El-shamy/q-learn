"use client";

import MainInput from "@/_components/common/inputs/mainInput/MainInput";
import useLogin from "../_hooks/useLogin";
import { Lock, Mail } from "lucide-react";
import MainSelect from "@/_components/common/inputs/main-select-input/MainSelect";
import { Link } from "@/i18n/navigation";
import { Controller } from "react-hook-form";
import MainBtn from "@/_components/common/buttons/MainBtn";

const roleOptions = [
  { id: 1, name: "Instructor" },
  { id: 2, name: "User" },
];

const LoginForm = () => {
  const {
    methods: {
      register,
      control,
      formState: { errors },
    },
    handleSubmit,
  } = useLogin();

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

        <Controller
          name="role"
          control={control}
          render={({ field, fieldState }) => (
            <MainSelect
              placeholder={"auth.choose role"}
              options={roleOptions}
              value={field.value ?? null}
              onChange={(value) => field.onChange(value)}
              onBlur={field.onBlur}
              error={fieldState.error?.message ?? null}
            />
          )}
        />

        <div className="flex-between text-sm mt-5">
          <label className="custom-checkbox-container flex items-center gap-2">
            <input type="checkbox" name="skill-web-dev" />

            <span className="custom-checkmark cursor-pointer"></span>
            <span>Remember Me</span>
          </label>

          <Link href="/auth/forget-password" className="text-[#77c8fe] ">
            Forget Password?
          </Link>
        </div>

        <MainBtn type="submit" className="mt-4">
          Login
        </MainBtn>

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