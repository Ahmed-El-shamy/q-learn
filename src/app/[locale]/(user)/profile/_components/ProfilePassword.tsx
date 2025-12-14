"use client";
import MainBtn from "@/_components/common/buttons/MainBtn";
import MainInput from "@/_components/common/inputs/mainInput/MainInput";
import { Lock } from "lucide-react";
import useChangePassword from "../_hooks/useChangePassword";

const ProfilePassword = () => {
  const {
    methods: {
      control,
      register,
      formState: { errors },
      watch,
    },
    handleSubmit,
  } = useChangePassword();

  return (
    <div className="w-full mt-10 pb-8 rounded-xl border border-gray-300 shadow">
      <div className="flex gap-3 p-8 border-b border-b-gray-300 bg-gray-100/50">
        <div className="flex justify-center items-center shrink-0 w-14 h-14 rounded-full bg-[#b633ff] text-white">
          <Lock size={30} />
        </div>
        <div>
          <h2 className="font-bold text-xl">Change Password</h2>
          <p className="capitalize text-sm">
            Ensure your account is using a long, random password to stay secure
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-8 py-4">
        <MainInput
          type="password"
          label="Current Password"
          required
          {...register("currentPassword")}
          error={errors.currentPassword?.message}
        />
        <MainInput
          type="password"
          label="New Password"
          required
          {...register("newPassword")}
          error={errors.newPassword?.message}
        />
        <MainInput
          type="password"
          label="Password Confirmation"
          required
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
      </div>

      <div className="px-8 mt-4">
        <MainBtn title="Change Password" />
      </div>
    </div>
  );
};

export default ProfilePassword;
