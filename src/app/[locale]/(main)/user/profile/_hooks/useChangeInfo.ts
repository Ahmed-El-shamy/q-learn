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

function buildFormData(payload: ChangeUserInfo) {
  const fd = new FormData();

  // ✅ لو الـ API عندك محتاج name واحد بدل first/last
  const name = `${payload.firstName ?? ""} ${payload.lastName ?? ""}`.trim();

  // ✅ ابعت بس اللي ليه قيمة
  const safeAppend = (key: string, value?: unknown) => {
    if (value === undefined || value === null) return;
    const v = String(value).trim();
    if (!v) return;
    fd.append(key, v);
  };

  safeAppend("name", name);

  // لو الـ backend بيتعامل مع email/phone منفصلين:
  safeAppend("email", payload.email);
  safeAppend("phone", payload.phone);

  // لو الـ backend بتاعك عايز firstName/lastName بدل name:
  // safeAppend("first_name", payload.firstName);
  // safeAppend("last_name", payload.lastName);

  return fd;
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
      // ✅ بناء FormData
      const formData = buildFormData(payload);

      // (اختياري) لو formData فاضي — متبعتش
      if ([...formData.keys()].length === 0) {
        toast?.error?.("No changes to update");
        return;
      }

      // ✅ نفذ الايديت
      const data = await mutateAsync(formData);

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
