"use client";

import { FormEvent, useState } from "react";
import { RegisterPayload } from "../register.types";
import MainInput from "@/_components/common/inputs/mainInput/MainInput";
import Link from "next/link";
import { useLocale } from "next-intl";
import AuthBtn from "@/_components/common/buttons/AuthBtn";
import PhoneInput from "@/_components/common/inputs/PhoneInput/PhoneInput";

const RegisterForm = () => {
  const [form, setForm] = useState<RegisterPayload>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const local = useLocale();

  function onChange(
    key: keyof RegisterPayload,
    value: RegisterPayload[typeof key]
  ) {
    setForm((old) => ({
      ...old,
      [key]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const payload = formData.entries().reduce((curr, next) => {
      curr[next[0] as keyof RegisterPayload] =
        next[1] as RegisterPayload[keyof RegisterPayload];
      return curr;
    }, {} as RegisterPayload);

    try {
      const result = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await result.json();

      if (result.ok) {
        console.log("Registered Successfully", data);
      } else {
        console.log("Register Faild", data);
      }
    } catch (err) {
      console.log("Error", err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 border p-2 border-black rounded-lg max-w-lg w-full py-10 px-6"
    >
      <MainInput
        type="text"
        name="firstName"
        placeholder="Enter Your First Name"
        value={form.firstName}
        onChange={(e) => onChange("firstName", e.target.value)}
      />

      <MainInput
        type="text"
        name="lastName"
        placeholder="Enter Your Last Name"
        value={form.lastName}
        onChange={(e) => onChange("lastName", e.target.value)}
      />

      <MainInput
        type="email"
        name="email"
        placeholder="Enter Your Email"
        value={form.email}
        onChange={(e) => onChange("email", e.target.value)}
      />

      <PhoneInput
        type="text"
        name="phoneNumber"
        value={form.phoneNumber}
        onChange={(e) => onChange("phoneNumber", e.target.value)}
        placeholder="Enter Your Phone Number"
      />

      <MainInput
        type="password"
        name="password"
        placeholder="Enter Your Password"
        value={form.password}
        onChange={(e) => onChange("password", e.target.value)}
      />

      <MainInput
        type="password"
        name="confirmPassword"
        placeholder="Enter Your Confirm Password"
        value={form.confirmPassword}
        onChange={(e) => onChange("confirmPassword", e.target.value)}
      />

      <AuthBtn text="Sign Up" />

      <Link href={`/${local}/auth/login`} className="ml-auto">
        Already have account?
      </Link>
    </form>
  );
};

export default RegisterForm;
