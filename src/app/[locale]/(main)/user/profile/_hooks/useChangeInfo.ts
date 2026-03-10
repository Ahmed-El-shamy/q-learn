"use client";

import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangeUserInfo,
  ProfileInfoSchema,
} from "../_schema/ProfileInfoSchema";
import { User as UserType } from "@/types/user.types";
import useEditProfile from "../../_services/useEditProfile";

// لو عندك sonner:
import { toast } from "sonner";

function splitName(fullName?: string) {
  const parts = (fullName ?? "").trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" ") ?? "",
  };
}

const useChangeInfo = () => {
  const editProfile = useEditProfile();
  const { mutateAsync, isPending } = editProfile;

  const methods = useForm<ChangeUserInfo>({
    resolver: zodResolver(ProfileInfoSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const setInitialValuesFromUser = useCallback(
    (user?: UserType) => {
      const { firstName, lastName } = splitName(user?.name);

      methods.reset({
        firstName,
        lastName,
        email: user?.email ?? "",
        phone: user?.phone ?? "",
      });
    },
    [methods]
  );

  // ✅ لو عايز تمنع إرسال نفس البيانات بدون تغيير
  const canSubmit = useMemo(() => {
    const { isValid, isDirty } = methods.formState;
    return isValid && isDirty && !isPending;
  }, [methods.formState, isPending]);

  async function onSubmit(payload: ChangeUserInfo) {
    try {
      const data = await mutateAsync(payload);

      toast?.success?.(data?.message ?? "Profile updated successfully");

      // ✅ لو السيرفر رجّع user محدث: اعمل reset بيه
      // if (data?.user) {
      //   setInitialValuesFromUser(data.user);
      //   // واعتبر الفورم clean بعد حفظه
      //   methods.reset(methods.getValues());
      // } else {
      //   // لو مفيش user راجع، خلّي الفورم clean على القيم الحالية
      //   methods.reset(methods.getValues());
      // }
    } catch (err: any) {
      // ✅ Error handling بسيط (حسب axios)
      const msg =
        err?.response?.data?.message || err?.message || "Something went wrong";
      toast?.error?.(msg);
    }
  }

  return {
    methods,
    setInitialValuesFromUser,
    handleSubmit: methods.handleSubmit(onSubmit),
    isPending,
    canSubmit,
  };
};

export default useChangeInfo;
