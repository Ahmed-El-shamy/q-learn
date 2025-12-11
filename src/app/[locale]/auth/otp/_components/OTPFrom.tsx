"use client";

import AuthBtn from "@/_components/common/buttons/AuthBtn";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

const OTPFrom = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const router = useRouter();
  const local = useLocale();

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
      alert("Please Enter all 6 digits in otp");
      return;
    }

    const code = otp.join("");
    console.log("Entered OTP: ", code);
    router.replace(`/${local}/auth/reset-password`);
  };

  return (
    <>
      <h2 className="text-2xl md:text-xl lg:text-3xl font-bold">
        Please enter the verification code to continue
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full mt-5">
        <h2 className="text-2xl font-bold text-center">Enter OTP</h2>
        <p className="text-gray-600 text-center">
          We sent a 6-digit code to your email
        </p>

        <div className="flex justify-between gap-2">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-16 h-16 text-center text-2xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <AuthBtn text="Verify OTP" classname="mt-4" />

        <p className="text-center">
          Didn't receive code?{" "}
          <Link href={""} className="text-[#77c8fe]">
            Resend
          </Link>
        </p>
      </form>
    </>
  );
};

export default OTPFrom;
