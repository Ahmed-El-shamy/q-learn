"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangeUserPassword,
  ProfilePasswordSchema,
} from "../_schema/ProfilePasswordSchema";

const useChangePassword = () => {
  const methods = useForm<ChangeUserPassword>({
    resolver: zodResolver(ProfilePasswordSchema),
    mode: "onChange",
  });

  async function handleSubmit(payload: ChangeUserPassword) {
    if (
      payload.currentPassword &&
      payload.newPassword &&
      payload.confirmPassword
    ) {
      console.log("OK!!!");
    } else {
      console.log("Not OK!!!");
    }
  }

  return {
    methods,
    handleSubmit: methods.handleSubmit(handleSubmit),
  };
};

export default useChangePassword;
