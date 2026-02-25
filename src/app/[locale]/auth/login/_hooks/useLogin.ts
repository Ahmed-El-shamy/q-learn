import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginPayload } from "../_schema/loginSchema";
import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import toastErrorMessage from "@/_lib/api/toastErrorMessage";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { getSession } from "next-auth/react";
const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations();
  const methods = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: async (LoginPayload: LoginPayload) => {
      return await signIn("credentials", {
        redirect: false,
        ...LoginPayload,
      });
    },
    onSuccess: async (response) => {
      if (response?.ok) {
        const redirectUrl = searchParams.get("redirect_url");
        const session = await getSession();
        console.log("session is", session);
        const role = (session?.user as any)?.type;
        if (redirectUrl) {
          router.push(redirectUrl);
        } else if (role !== "individual") {
          router.push("/instructor/dashboard");
        } else {
          router.push("/");
        }

        toast.success(t("messages.authentication_success"));
      } else {
        toast.error(t("messages.authentication_fail"));
        methods.setError("email", {
          message: "validation.email-password-incorrect",
        });
        methods.setError("password", {
          message: "validation.email-password-incorrect",
        });
        methods.setError("root", {
          message: "validation.email-password-incorrect",
        });
      }
    },
    onError: (err: unknown) => toastErrorMessage(err),
  });

  async function handleSubmit(payload: LoginPayload) {
    await mutation.mutateAsync(payload);
  }

  return {
    methods,
    handleSubmit: methods.handleSubmit(handleSubmit),
    mutation,
  };
};

export default useLogin;
