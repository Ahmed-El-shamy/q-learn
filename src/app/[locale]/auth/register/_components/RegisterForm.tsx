"use client";

import MainInput from "@/_components/common/inputs/mainInput/MainInput";
import { useLocale } from "next-intl";
import AuthBtn from "@/_components/common/buttons/AuthBtn";
import PhoneInput from "@/_components/common/inputs/PhoneInput/PhoneInput";
import useRegister from "../_hooks/UseRegister";
import { Controller } from "react-hook-form";
import { Link } from "@/i18n/navigation";
import MainBtn from "@/_components/common/buttons/MainBtn";
import MainSelect from "@/_components/common/inputs/main-select-input/MainSelect";
import DateInput from "@/_components/common/inputs/date-input/DateInputs";

const roleOptions = [
  { id: 1, name: "Instructor" },
  { id: 2, name: "User" },
];

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

        <Controller 
          name="birthDate"
          control={control}
          render={({ field }) => (
            <DateInput
              label="birth-date"
              name={field.name}
              onChange={val => field.onChange(val)}
              currentValue={field.value}
              error={errors?.[field.name]?.message}
            />
          )}
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

        {/* <AuthBtn text="Register" classname="mt-4" /> */}
        <MainBtn title="Register" className="mt-4" size={"large"} />

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
