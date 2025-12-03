"use client";

import AuthBtn from "@/_components/common/buttons/AuthBtn";
import MainInput from "@/_components/common/inputs/mainInput/MainInput";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ResetPasswordForm = () => {
  const router = useRouter();
  const local = useLocale();

  const [form, setForm] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const onChange = (
    key: "newPassword" | "confirmNewPassword",
    value: string
  ) => {
    setForm((old) => ({
      ...old,
      [key]: value,
    }));
  };

  const handleSupmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmNewPassword) {
      console.log("Password don't match !");
      return;
    }
    router.push(`/${local}/auth/login`);
  };

  return (
    <form
      onSubmit={handleSupmit}
      className="flex flex-col gap-4 border p-2 border-black rounded-lg max-w-lg w-full py-10 px-6"
    >
      <MainInput
        type="password"
        name="password"
        placeholder="Enter Your New Password"
        value={form.newPassword}
        onChange={(e) => onChange("newPassword", e.target.value)}
      />

      <MainInput
        type="password"
        name="confirmPassword"
        placeholder="Enter Your Confirm New Password"
        value={form.confirmNewPassword}
        onChange={(e) => onChange("confirmNewPassword", e.target.value)}
      />

      <AuthBtn text="Reset Password" />
    </form>
  );
};

export default ResetPasswordForm;
