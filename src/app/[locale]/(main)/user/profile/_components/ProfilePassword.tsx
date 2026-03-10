"use client";

import React, { useState } from "react";
import MainBtn from "@/_components/common/buttons/MainBtn";
import MainInput from "@/_components/common/inputs/mainInput/MainInput";
import { Lock, Eye, EyeOff } from "lucide-react";
import useChangePassword from "../_hooks/useChangePassword";
import { useTranslations } from "next-intl";

const ProfilePassword = () => {
  const { methods, handleSubmit, canSubmit, isPending } = useChangePassword();
  const {
    register,
    formState: { errors },
  } = methods;

  const t = useTranslations();

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mt-10 pb-8 rounded-xl border border-gray-300 shadow"
    >
      <div className="flex gap-3 p-8 border-b border-b-gray-300 bg-gray-100/50">
        <div className="flex justify-center items-center shrink-0 w-14 h-14 rounded-full bg-green-400 text-white">
          <Lock size={30} />
        </div>
        <div>
          <h2 className="font-bold text-xl">{t("profile.change-password.title")}</h2>
          <p className="capitalize text-sm">
            {t("profile.change-password.description")}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-8 py-4">
          <MainInput
            type="password"
            label="label.current-password"
            required
            {...register("currentPassword")}
            error={errors.currentPassword?.message}
          />

          <MainInput
            type="password"
            label="label.new-password"
            required
            {...register("newPassword")}
            error={errors.newPassword?.message}
          />

          <MainInput
            type="password"
            label="label.password-confirmation"
            required
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
      </div>

      <div className="px-8 mt-4">
        <MainBtn
          title={isPending ? "Changing..." : "Change Password"}
          disabled={!canSubmit}
        >
          {t("label.save")}
          </MainBtn>
      </div>
    </form>
  );
};

export default ProfilePassword;
