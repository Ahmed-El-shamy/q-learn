"use client";

import MainInput from "@/_components/common/inputs/mainInput/MainInput";
import PhoneInput from "@/_components/common/inputs/PhoneInput/PhoneInput";
import useRegister from "../_hooks/UseRegister";
import { Controller } from "react-hook-form";
import { Link } from "@/i18n/navigation";
import MainBtn from "@/_components/common/buttons/MainBtn";
import MainSelect from "@/_components/common/inputs/main-select-input/MainSelect";
import DateInput from "@/_components/common/inputs/date-input/DateInput";
import { useTranslations } from "next-intl";

const RegisterForm = () => {
  const {
    methods: {
      control,
      register,
      formState: { errors },
    },
    handleSubmit,
    registerMutation,
  } = useRegister();

  const t = useTranslations();

  const roleOptions = [
    { id: "instructor", name: t("auth.register.userType.instructor") },
    { id: "user", name: t("auth.register.userType.user") },
  ];

  return (
    <>
      <h2 className="text-2xl md:text-xl lg:text-3xl font-bold">
        {t("auth.register.title")}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full mt-5">
        <MainInput
          placeholder="placeholder.firstName"
          required
          error={errors.firstName?.message}
          {...register("firstName")}
        />

        <MainInput
          placeholder="placeholder.lastName"
          required
          error={errors.lastName?.message}
          {...register("lastName")}
        />

        <MainInput
          type="email"
          placeholder="placeholder.email"
          required
          error={errors.email?.message}
          {...register("email")}
        />

        <Controller
          name="phoneNumber"
          control={control}
          render={({ field, fieldState }) => (
            <PhoneInput
              placeholder="placeholder.phone"
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
              name={field.name}
              placeholder="placeholder.birthdate"
              onChange={(val) => field.onChange(val)}
              currentValue={field.value}
              error={errors?.[field.name]?.message}
              required
            />
          )}
        />

        <Controller
          name="type"
          control={control}
          render={({ field, fieldState }) => (
            <MainSelect
              placeholder={"placeholder.userType"}
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
          placeholder="placeholder.password"
          required
          error={errors.password?.message}
          {...register("password")}
        />

        <MainInput
          type="password"
          placeholder="placeholder.passwordConfirmation"
          required
          error={errors.password_confirmation?.message}
          {...register("password_confirmation")}
        />

        {/* <AuthBtn text="Register" classname="mt-4" /> */}
        <MainBtn
          isLoading={registerMutation.isPending}
          containerClassName="mt-4"
          size={"large"}
        >
          {t("auth.register.button")}
        </MainBtn>

        <p className="text-center">
          {t("auth.register.already-have-an-account")}{" "}
          <Link href={`/auth/login`} className="text-[#77c8fe]">
            {t("auth.login.login")}
          </Link>
        </p>
      </form>
    </>
  );
};

export default RegisterForm;
