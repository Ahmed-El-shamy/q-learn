import { useForm } from "react-hook-form";
import { RegisterPayload, RegisterSchema } from "../_schema/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import api, { Api } from "@/_lib/api/api";
import { useRouter } from "@/i18n/navigation";

const useRegister = () => {
  const router = useRouter();
  const methods = useForm<RegisterPayload>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  const registerMutation = useMutation({
    mutationKey: [Api.routes.auth.register],
    mutationFn: async (payload: RegisterPayload) => {
      const response = await api.post(Api.routes.auth.register, payload);
      return response?.data
    },
    onSuccess: (response) => {
      
    }
  })

  async function handleSubmit(payload: RegisterPayload) {
    await registerMutation.mutateAsync(payload);
  }

  return {
    methods,
    handleSubmit: methods.handleSubmit(handleSubmit),
  };
};
export default useRegister;
