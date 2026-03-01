"use client";

import MainBtn from "@/_components/common/buttons/MainBtn";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import useOtp from "../_hook/useOtp";

const OTPFrom = () => {
  const t = useTranslations("auth.otp");
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  const { submitOtp, resendOtp, checkOtpMutation, resendOtpMutation } =
    useOtp(email);

  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value;
    if (/^\d?$/.test(val)) {
      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);

      if (val && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        prevInput?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        e.preventDefault();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        e.preventDefault();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isComplete = otp.every((digit) => digit !== "");
    if (!isComplete) {
      return;
    }

    const code = otp.join("");
    submitOtp(code);
  };

  if (!email) {
    return (
      <>
        <h2 className="text-2xl md:text-xl lg:text-3xl font-bold">
          {t("title")}
        </h2>
        <p className="mt-4 text-red-600">{t("emailRequired")}</p>
        <MainBtn
          type="button"
          containerClassName="mt-4"
          onClick={() => router.replace("/auth/forget-password")}
        >
          {t("backToForgetPassword")}
        </MainBtn>
      </>
    );
  }

  return (
    <>
      <h2 className="text-2xl md:text-xl lg:text-3xl font-bold">
        {t("title")}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full mt-5">
        <h2 className="text-2xl font-bold text-center">{t("enterOtp")}</h2>
        <p className="text-gray-600 text-center">{t("sentCodeToEmail")}</p>

        <div className="flex justify-between gap-2">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-16 h-16 text-center text-2xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <MainBtn
          type="submit"
          size="large"
          isLoading={checkOtpMutation.isPending}
          disabled={checkOtpMutation.isPending}
        >
          {t("verifyOtp")}
        </MainBtn>

        <p className="text-center">
          {t("didntReceiveCode")}{" "}
          <button
            type="button"
            onClick={() => resendOtp()}
            disabled={resendOtpMutation.isPending}
            className="text-[#77c8fe] hover:underline disabled:opacity-50"
          >
            {t("resend")}
          </button>
        </p>
      </form>
    </>
  );
};

export default OTPFrom;