import React from "react";
import Image from "next/image";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen px-10">
      <div className="flex-1 bg-white flex flex-col text-[#373737]">
        <Link prefetch={false} href="/">
          <Image
            src="/logo-placeholder.jpg"
            alt="Logo"
            width={160}
            height={40}
            className="py-8 object-contain"
          />
        </Link>
        {children}
      </div>

      <div className="flex-1 hidden md:flex flex-col justify-center items-center mt-10">
        <h2 className="md:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-[#202e3b] text-center ">
          Welcome to Qutell Learning Management System
        </h2>
        <Image
          src="/images/auth/login.svg"
          alt="Login image"
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
