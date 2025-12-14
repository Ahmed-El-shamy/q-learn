"use client";

import AuthBtn from "@/_components/common/buttons/AuthBtn";
import MainInput from "@/_components/common/inputs/mainInput/MainInput";
import useResetPassword from "../_hook/useResetPassword";
import MainBtn from "@/_components/common/buttons/MainBtn";
const ResetPasswordForm = () => {
  const {
    methods: {
      control,
      register,
      formState: { errors },
      watch,
    },
    handleSubmit,
  } = useResetPassword();

  return (
    <>
      <h2 className="text-2xl md:text-xl lg:text-3xl font-bold">
        Please create a new password to continue
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full mt-5">
        <MainInput
          type="password"
          placeholder="Enter Your New Password"
          {...register("password")}
          error={errors.password?.message}
        />

        <MainInput
          type="password"
          placeholder="Enter Your Confirm New Password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        {/* <AuthBtn text="Reset Password" classname="mt-4" /> */}
        <MainBtn title="Reset Password" className="mt-4" size={"large"} />
      </form>
    </>
  );
};

export default ResetPasswordForm;
