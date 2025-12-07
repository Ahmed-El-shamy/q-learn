"use client";

import MainInput from "@/_components/common/inputs/mainInput/MainInput";
import Link from "next/link";
import { useLocale } from "next-intl";
import AuthBtn from "@/_components/common/buttons/AuthBtn";
import PhoneInput from "@/_components/common/inputs/PhoneInput/PhoneInput";
import useRegister from "../_hooks/UseRegister";
import { Controller } from "react-hook-form";

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

  const local = useLocale();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 border p-2 border-black rounded-lg max-w-lg w-full py-10 px-6"
    >
      <MainInput
        placeholder="Enter Your First Name"
        error={errors.firstName?.message}
        {...register("firstName")}
      />

      <MainInput
        placeholder="Enter Your Last Name"
        error={errors.lastName?.message}
        {...register("lastName")}
      />

      <MainInput
        type="email"
        placeholder="Enter Your Email"
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
        error={errors.password?.message}
        {...register("password")}
      />

      <MainInput
        type="password"
        placeholder="Enter Your Confirm Password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <AuthBtn text="Sign Up" />

      <Link href={`/${local}/auth/login`} className="ml-auto">
        Already have account?
      </Link>
    </form>
  );
};

export default RegisterForm;
