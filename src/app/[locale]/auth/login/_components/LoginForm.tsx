"use client";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { LoginPayload } from "../login.types";

const LoginForm = () => {
    const [credentials, setCredentials] = useState<LoginPayload>({
        email: "",
        password: ""
    });

    function onChange(key: keyof LoginPayload, value: LoginPayload[typeof key]) {
        setCredentials(old => ({
            ...old,
            [key]: value
        }));
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const credentials = formData.entries().reduce((curr, next) => {
            curr[next[0] as keyof LoginPayload] = next[1] as LoginPayload[keyof LoginPayload];
            return curr
        }, {} as LoginPayload);

        const result = await signIn("credentials", {
            redirect: false,
            ...credentials
        });
        
        if(result?.ok) {
            console.log("OK!!!");
        } else {
            console.log("NOt OK!!!");
        }
    }

    return (
        <form className="flex flex-col gap-2 border p-2 border-black rounded-lg max-w-lg w-full py-10 px-6" onSubmit={handleSubmit}>
            <input name="email" placeholder="Enter Your Email" type="email" value={credentials.email} onChange={(e) => onChange("email", e.target.value)} />
            <input name="password" placeholder="Enter Your Password" type="password" value={credentials.password} onChange={(e) => onChange("password", e.target.value)} />
            <button className="bg-black text-white font-bold">
                Login
            </button>
        </form>
    );
}

export default LoginForm;