import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginPayload } from "../_schema/loginSchema";
import { signIn } from "next-auth/react";

const useLogin = () => {
    const methods = useForm<LoginPayload>({
        resolver: zodResolver(loginSchema),
        mode: "onSubmit",
        reValidateMode: "onChange"
    });

    async function handleSubmit(payload: LoginPayload) {
        const result = await signIn("credentials", {
            redirect: false,
            ...payload,
        });

        if (result?.ok) {
            console.log("OK!!!");
        } else {
            console.log("NOt OK!!!");
        }
    }

    return {
        methods,
        handleSubmit: methods.handleSubmit(handleSubmit)
    } 
}

export default useLogin;