import React, { Suspense } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import LanguageSwitcher from "@/_components/lang/LanguageSwitcher";
import AuthLogo from "./_components/AuthLogo";

const LOGO_WIDTH = 160;
const LOGO_HEIGHT = 40;

function AuthLogoFallback() {
  return (
    <div
      className="animate-pulse rounded bg-gray-200"
      style={{ width: LOGO_WIDTH, height: LOGO_HEIGHT }}
      aria-hidden
    />
  );
}

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const t = await getTranslations("auth");

  return (
    <div className="flex flex-col md:flex-row min-h-screen px-10 bg-white">
      <div className="flex-1 bg-white flex flex-col justify-center text-[#373737]">
        <div className="w-full max-w-md flex flex-col gap-8 py-8">
          <div className="flex items-center justify-between w-full">
            <Suspense fallback={<AuthLogoFallback />}>
              <AuthLogo />
            </Suspense>
            <LanguageSwitcher />
          </div>
          <div className="w-full">{children}</div>
        </div>
      </div>

      <div className="flex-1 hidden md:flex flex-col justify-center items-center mt-10">
        <h2 className="md:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-[#202e3b] text-center ">
          {t("layout.welcomeTitle")}
        </h2>
        <Image
          src="/images/auth/login.svg"
          alt={t("layout.loginImageAlt")}
          width={500}
          height={500}
          className="py-8 object-contain"
        />
      </div>

      {/* <div className="flex-1 hidden bg-black text-white md:flex justify-center items-center">
        <div className="bg-white/10 backdrop-blur-lg w-[80%] h-[80%] border border-white rounded-lg p-8 flex flex-col items-center justify-center">
          <Image
            src="/logo-placeholder.jpg"
            alt="Logo"
            width={120}
            height={120}
            className="py-8 object-contain"
          />
          <div className="text-center space-y-4 max-w-md">
            <h2 className="text-3xl font-bold mb-4">
              Welcome to Qutell E-Learning
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              Transform your learning journey with our comprehensive online
              education platform. Access courses, track your progress, and
              achieve your goals.
            </p>
            <p className="text-base text-white/80 mt-6">
              Join thousands of students already learning with us. Start your
              educational adventure today!
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AuthLayout;
