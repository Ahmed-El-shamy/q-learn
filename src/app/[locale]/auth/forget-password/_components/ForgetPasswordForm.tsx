"use client";
import AuthBtn from "@/_components/common/buttons/AuthBtn";
import MainInput from "@/_components/common/inputs/mainInput/MainInput";
import useForgetPassword from "../_hook/useForgetPassword";

export interface ForgetPasswordPayload {
  email: string;
}

const ForgetPasswordForm = () => {
  const { methods, handleSubmit } = useForgetPassword();
  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <div className="flex flex-col gap-20">
      <h2 className="text-2xl md:text-xl lg:text-3xl font-bold">
        Please enter your email to reset your password
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <MainInput
          type="email"
          {...register("email")}
          placeholder="Enter Your Email"
          error={errors.email?.message}
        />

        <AuthBtn text="Send OTP" />
      </form>
    </div>
  );
};

export default ForgetPasswordForm;
