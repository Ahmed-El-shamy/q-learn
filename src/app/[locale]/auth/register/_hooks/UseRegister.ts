import { useForm } from "react-hook-form";
import { RegisterPayload, RegisterSchema } from "../_schema/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import api, { Api } from "@/_lib/api/api";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";
import toastErrorMessage from "@/_lib/api/toastErrorMessage";

const useRegister = () => {
  const router = useRouter();
  const methods = useForm<RegisterPayload>({
    resolver: zodResolver(RegisterSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const registerMutation = useMutation({
    mutationKey: [Api.routes.auth.register],
    mutationFn: async (payload: RegisterPayload) => {
      const response = await api.post(Api.routes.auth.register, {
        ...payload,
        name: `${payload.firstName} ${payload.lastName}`,
        account_type: payload.type === "user" ? "individual" : undefined,
        auth_method: "email",
      });
      return response;
    },
    onSuccess: (response) => {
      toast.success(response?.message);
      router.push("/auth/login");
    },
    onError: (err: unknown) => {
      toastErrorMessage(err);
    },
    throwOnError: false,
  });

  async function handleSubmit(payload: RegisterPayload) {
    await registerMutation.mutateAsync(payload);
  }

  return {
    methods,
    handleSubmit: methods.handleSubmit(handleSubmit),
    registerMutation,
  };
};
export default useRegister;
