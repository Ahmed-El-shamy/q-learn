import React from "react";

interface MainBtnProps {
  className?: string;
  title: string;
}
const MainBtn = ({ className, title }: MainBtnProps) => {
  return (
    <button
      className={`px-6 py-4 rounded-full text-white bg-[#425073] capitalize duration-300 cursor-pointer hover:bg-[#1f2b40] ${className}`}
    >
      {title}
    </button>
  );
};

export default MainBtn;
