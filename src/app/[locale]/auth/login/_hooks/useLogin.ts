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

const useLogin = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const t = useTranslations();
    const methods = useForm<LoginPayload>({
        resolver: zodResolver(loginSchema),
        mode: "onSubmit",
        reValidateMode: "onChange"
    });

    const mutation = useMutation({
        mutationFn: async (LoginPayload: LoginPayload) => {
            return (await signIn("credentials", {
                redirect: false,
                ...LoginPayload,
            }))
        },
        onSuccess: (response) => {
            if(response?.ok) {
               router.push(searchParams.get("redirect_url") || "/");
               toast.success(t("messages.authentication_success"));
            } else {
                toast.error(t("messages.authentication_fail"));
                methods.setError("email", {message: "validation.email-password-incorrect"});
                methods.setError("password", {message: "validation.email-password-incorrect"});
                methods.setError("root", {message: "validation.email-password-incorrect"});
            }
        },
        onError: (err: unknown) => toastErrorMessage(err)
    });

    async function handleSubmit(payload: LoginPayload) {
        await mutation.mutateAsync(payload);
    }

    return {
        methods,
        handleSubmit: methods.handleSubmit(handleSubmit),
        mutation
    } 
}

export default useLogin;