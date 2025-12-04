import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginPayload } from "../_schema/loginSchema";

const useLogin = () => {
    const methods = useForm<LoginPayload>({
        resolver: zodResolver(loginSchema)
    });

    function handleSubmit() {

    }

    return {
        methods,
    } 
}

export default useLogin;