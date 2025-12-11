"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangeUserInfo,
  ProfileInfoSchema,
} from "../_schema/ProfileInfoSchema";

const useChangeInfo = () => {
  const methods = useForm<ChangeUserInfo>({
    resolver: zodResolver(ProfileInfoSchema),
    mode: "onChange",
  });

  async function handleSubmit(payload: ChangeUserInfo) {
    if (
      payload.firstName &&
      payload.lastName &&
      payload.email &&
      payload.phone
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

export default useChangeInfo;
