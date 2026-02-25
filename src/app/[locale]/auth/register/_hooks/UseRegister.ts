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
        account_type: payload.type === "user" ? "individual" : "company",
        auth_method: "email",
      });
      return response;
    },
    /*************  ✨ Windsurf Command ⭐  *************/
    /**
 * onSuccess: (response) => {
 *   toast.success(response?.message);
 *   if () router.push("/auth/login");
 * }
/*******  b826d2dc-c757-48fd-9a1d-588b5f339635  *******/
    onSuccess: (response, variables) => {
      toast.success(response?.message);
      if (variables.type === "instructor") {
        router.push("/auth/login?redirect_url=/instructor/dashboard");
      } else {
        router.push("/auth/login");
      }
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
