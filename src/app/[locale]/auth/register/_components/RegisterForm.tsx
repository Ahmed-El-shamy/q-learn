"use client";

import MainInput from "@/_components/common/inputs/mainInput/MainInput";
import { useLocale } from "next-intl";
import AuthBtn from "@/_components/common/buttons/AuthBtn";
import PhoneInput from "@/_components/common/inputs/PhoneInput/PhoneInput";
import useRegister from "../_hooks/UseRegister";
import { Controller } from "react-hook-form";
import { Link } from "@/i18n/navigation";

const RegisterForm = () => {
  const {
    methods: {
      control,
      register,
      formState: { errors },
      watch,
    },
    handleSubmit,
  } = useRegister();

  return (
    <>
      <h2 className="text-2xl md:text-xl lg:text-3xl font-bold">
        Welcome! Please create your account
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full mt-5">
        <MainInput
          placeholder="Enter Your First Name"
          required
          error={errors.firstName?.message}
          {...register("firstName")}
        />

        <MainInput
          placeholder="Enter Your Last Name"
          required
          error={errors.lastName?.message}
          {...register("lastName")}
        />

        <MainInput
          type="email"
          placeholder="Enter Your Email"
          required
          error={errors.email?.message}
          {...register("email")}
        />

        <Controller
          name="phoneNumber"
          control={control}
          render={({ field, fieldState }) => (
            <PhoneInput
              placeholder="Enter Your Phone Number"
              {...field}
              error={fieldState.error?.message}
            />
          )}
        />

        <MainInput
          type="password"
          placeholder="Enter Your Password"
          required
          error={errors.password?.message}
          {...register("password")}
        />

        <MainInput
          type="password"
          placeholder="Enter Your Confirm Password"
          required
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <AuthBtn text="Register" classname="mt-4" />

        <p className="text-center">
          You have already an account?{" "}
          <Link href={`/auth/login`} className="text-[#77c8fe]">
            Login
          </Link>
        </p>
      </form>
    </>
  );
};

export default RegisterForm;
