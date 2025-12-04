"use client";
import AuthBtn from "@/_components/common/buttons/AuthBtn";
import MainInput from "@/_components/common/inputs/mainInput/MainInput";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ForgetPasswordForm = () => {
    const [form, setForm] = useState({
        email: ""
    });
    const router = useRouter();
    const locale = useLocale();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.replace(`/${locale}/auth/otp`);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 border p-2 border-black rounded-lg max-w-lg w-full py-10 px-6"
        >
            <MainInput
                type="email"
                name="email"
                placeholder="Enter Your Email"
                required
                value={form.email}
                onChange={(e) => setForm({email: e.target.value})}
            />

            <AuthBtn text="Send OTP" />
        </form>
    )
}

export default ForgetPasswordForm;