"use client";

import React, { useEffect } from "react";
import MainInput from "@/_components/common/inputs/mainInput/MainInput";
import MainBtn from "@/_components/common/buttons/MainBtn";
import { User as UserType } from "@/types/user.types";
import useChangeInfo from "../_hooks/useChangeInfo";
import { t } from "media-chrome";
import { useTranslations } from "next-intl";
import { Lock } from "lucide-react";

interface ProfileInfoProps {
  user: UserType;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  const {
    methods,
    handleSubmit,
    setInitialValuesFromUser,
    canSubmit,
    isPending,
  } = useChangeInfo();
  const t = useTranslations();

  const {
    register,
    formState: { errors },
  } = methods;

  // ✅ لما user ييجي (async) املأ الفورم مرة واحدة/كل تحديث
  useEffect(() => {
    if (!user) return;
    setInitialValuesFromUser(user);
  }, [user, setInitialValuesFromUser]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full pb-8 rounded-xl border border-gray-300 shadow"
    >
      <div className="flex gap-3 p-8 border-b border-b-gray-300 bg-gray-100/50">
        <div className="flex justify-center items-center shrink-0 w-14 h-14 rounded-full bg-green-400 text-white">
          <Lock size={30} />
        </div>
        <div>
          <h2 className="font-bold text-xl">{t("profile.title")}</h2>
          <p className="capitalize text-sm">
            {t("profile.description")}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-5 px-8 py-4">
        <MainInput
          label="label.first-name"
          required
          {...register("firstName")}
          error={errors.firstName?.message}
        />

        <MainInput
          label="label.last-name"
          required
          {...register("lastName")}
          error={errors.lastName?.message}
        />

        <MainInput
          type="email"
          label="label.email"
          required
          {...register("email")}
          error={errors.email?.message}
        />

        <MainInput
          label="label.phone"
          {...register("phone")}
          error={errors.phone?.message}
        />
      </div>

      <div className="px-8 mt-4">
        {/* ✅ مهم: الزرار يبقى submit */}
        <MainBtn
          title={isPending ? "Updating..." : "Update"}
          disabled={!canSubmit}
          isLoading={isPending}
        >
          {t("label.save")}
        </MainBtn>
      </div>
    </form>
  );
};

export default ProfileInfo;
