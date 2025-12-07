import { useForm } from "react-hook-form";
import { RegisterPayload, RegisterSchema } from "../_schema/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const useRegister = () => {
  const methods = useForm<RegisterPayload>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  async function handleSubmit(payload: RegisterPayload) {
    if (payload.email && payload.password) {
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

export default useRegister;
