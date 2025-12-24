"use client";

import React, { useEffect } from "react";
import MainInput from "@/_components/common/inputs/mainInput/MainInput";
import MainBtn from "@/_components/common/buttons/MainBtn";
import { User as UserType } from "@/types/user.types";
import useChangeInfo from "../_hooks/useChangeInfo";

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

  const {
    register,
    formState: { errors },
  } = methods;

  // ✅ لما user ييجي (async) املأ الفورم مرة واحدة/كل تحديث
  useEffect(() => {
    if (!user) return;
    setInitialValuesFromUser(user);
  }, [user, setInitialValuesFromUser]);
  console.log("canSubmit", canSubmit);
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full pb-8 rounded-xl border border-gray-300 shadow"
    >
      <div className="flex flex-col gap-5 px-8 py-4">
        <MainInput
          label="First Name"
          required
          {...register("firstName")}
          error={errors.firstName?.message}
        />

        <MainInput
          label="Last Name"
          required
          {...register("lastName")}
          error={errors.lastName?.message}
        />

        <MainInput
          type="email"
          label="Email"
          required
          {...register("email")}
          error={errors.email?.message}
        />

        <MainInput
          label="Phone"
          {...register("phone")}
          error={errors.phone?.message}
        />
      </div>

      <div className="px-8 mt-4">
        {/* ✅ مهم: الزرار يبقى submit */}
        <MainBtn
          title={isPending ? "Updating..." : "Update"}
          type="submit"
          disabled={!canSubmit}
        />
      </div>
    </form>
  );
};

export default ProfileInfo;
