import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordPayload,
  ResetPasswordSchema,
} from "../_schema/ResetPasswordSchema";

const useResetPassword = () => {
  const methods = useForm<ResetPasswordPayload>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onChange",
  });

  async function handleSubmit(payload: ResetPasswordPayload) {
    if (payload.password && payload.confirmPassword) {
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

export default useResetPassword;
