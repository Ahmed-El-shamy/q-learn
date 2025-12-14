"use client";
import { User } from "lucide-react";
import useChangeInfo from "../_hooks/useChangeInfo";
import MainInput from "@/_components/common/inputs/mainInput/MainInput";
import MainBtn from "@/_components/common/buttons/MainBtn";

const ProfileInfo = () => {
  const {
    methods: {
      control,
      register,
      formState: { errors },
      watch,
    },
    handleSubmit,
  } = useChangeInfo();

  return (
    <div className="w-full pb-8 rounded-xl border border-gray-300 shadow">
      <div className="flex gap-3 p-8 border-b border-b-gray-300 bg-gray-100/50">
        <div className="flex justify-center items-center shrink-0 w-14 h-14 rounded-full bg-[#b633ff] text-white">
          <User size={35} />
        </div>
        <div>
          <h2 className="font-bold text-xl">Profile Information</h2>
          <p className="capitalize text-sm">
            Update your account information and email address
          </p>
        </div>
      </div>

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
          {...register("email")}
          required
          error={errors.email?.message}
        />
        <MainInput
          label="Phone"
          required
          {...register("phone")}
          error={errors.phone?.message}
        />
      </div>

      <div className="px-8 mt-4">
        <MainBtn title="Update" onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default ProfileInfo;
