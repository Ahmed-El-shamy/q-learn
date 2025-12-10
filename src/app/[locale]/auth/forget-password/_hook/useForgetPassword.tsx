"use client";

import { useForm } from "react-hook-form";
import {
  ForgetPasswordPayload,
  forgetPasswordSchema,
} from "../_schema/forgetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const useForgetPassword = () => {
  const methods = useForm<ForgetPasswordPayload>({
    resolver: zodResolver(forgetPasswordSchema),
    mode: "onChange",
  });

  const handleSubmit = methods.handleSubmit(
    (payload: ForgetPasswordPayload) => {
      console.log("Email submitted: ", payload.email);
    }
  );
  return { methods, handleSubmit };
};

export default useForgetPassword;
