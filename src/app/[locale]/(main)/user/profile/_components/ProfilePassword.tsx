"use client";

import React, { useState } from "react";
import MainBtn from "@/_components/common/buttons/MainBtn";
import MainInput from "@/_components/common/inputs/mainInput/MainInput";
import { Lock, Eye, EyeOff } from "lucide-react";
import useChangePassword from "../_hooks/useChangePassword";

const ProfilePassword = () => {
  const { methods, handleSubmit, canSubmit, isPending } = useChangePassword();
  const {
    register,
    formState: { errors },
  } = methods;

  const [show, setShow] = useState({
    current: false,
    next: false,
    confirm: false,
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mt-10 pb-8 rounded-xl border border-gray-300 shadow"
    >
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
        <div className="relative">
          <MainInput
            type={show.current ? "text" : "password"}
            label="Current Password"
            required
            {...register("currentPassword")}
            error={errors.currentPassword?.message}
          />
          <button
            type="button"
            onClick={() => setShow((s) => ({ ...s, current: !s.current }))}
            className="absolute right-3 top-[38px] text-gray-500"
            aria-label={show.current ? "Hide password" : "Show password"}
          >
            {show.current ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="relative">
          <MainInput
            type={show.next ? "text" : "password"}
            label="New Password"
            required
            {...register("newPassword")}
            error={errors.newPassword?.message}
          />
          <button
            type="button"
            onClick={() => setShow((s) => ({ ...s, next: !s.next }))}
            className="absolute right-3 top-[38px] text-gray-500"
            aria-label={show.next ? "Hide password" : "Show password"}
          >
            {show.next ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="relative">
          <MainInput
            type={show.confirm ? "text" : "password"}
            label="Password Confirmation"
            required
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
          <button
            type="button"
            onClick={() => setShow((s) => ({ ...s, confirm: !s.confirm }))}
            className="absolute right-3 top-[38px] text-gray-500"
            aria-label={show.confirm ? "Hide password" : "Show password"}
          >
            {show.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="px-8 mt-4">
        <MainBtn
          title={isPending ? "Changing..." : "Change Password"}
          type="submit"
          disabled={!canSubmit}
        />
      </div>
    </form>
  );
};

export default ProfilePassword;
