import React from "react";
import OTPFrom from "./_components/OTPFrom";

const page = () => {
  return (
    <div className="w-full p-4 flex flex-col gap-2">
      <div className="max-w-lg w-full">
        <OTPFrom />
      </div>
    </div>
  );
};

export default page;
