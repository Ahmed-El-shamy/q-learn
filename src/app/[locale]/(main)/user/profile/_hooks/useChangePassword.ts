"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangeUserPassword,
  ProfilePasswordSchema,
} from "../_schema/ProfilePasswordSchema";
import { toast } from "sonner";
import useChangePasswordApi from "../../_services/useChangePassword";
function buildChangePasswordFormData(payload: ChangeUserPassword) {
  const fd = new FormData();
  fd.append("current_password", payload.currentPassword);
  fd.append("new_password", payload.newPassword);
  fd.append("new_password_confirmation", payload.confirmPassword);
  return fd;
}

const useChangePassword = () => {
  const { mutateAsync, isPending } = useChangePasswordApi();

  const methods = useForm<ChangeUserPassword>({
    resolver: zodResolver(ProfilePasswordSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    formState: { isDirty, isValid },
    reset,
  } = methods;

  const canSubmit = useMemo(
    () => isDirty && isValid && !isPending,
    [isDirty, isValid, isPending]
  );

  const onSubmit = async (payload: ChangeUserPassword) => {
    try {
      const body = {
        current_password: payload.currentPassword,
        new_password: payload.newPassword,
        new_password_confirmation: payload.confirmPassword,
      };

      console.log("body being sent:", body); // ✅

      const data = await mutateAsync(body);

      toast.success(data?.message ?? "Password changed successfully");

      reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to change password";
      toast.error(msg);
    }
  };


  return {
    methods,
    handleSubmit: methods.handleSubmit(onSubmit),
    isPending,
    canSubmit,
  };
};

export default useChangePassword;
