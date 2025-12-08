"use client";
import { LucideIcon } from "lucide-react";
import { useCountUp } from "../../_hooks/useCountUp";
interface StatisticsCardProps {
  className?: string;
  bgColor: string;
  icon: LucideIcon;
  number: number;
  text: string;
}

const StatisticsCard = ({
  className,
  bgColor,
  icon: Icon,
  number,
  text,
}: StatisticsCardProps) => {
  const countUp = number !== undefined ? useCountUp(number) : null;
  return (
    <div className="bg-white rounded-2xl border border-[#cee8ff] p-10 text-[#425073]">
      <div
        className={`icon w-20 h-20 rounded-full flex items-center justify-center ${
          className || ""
        }`}
        style={{ backgroundColor: bgColor }}
      >
        <Icon color="white" size={40} />
      </div>
      {number !== undefined && (
        <h2 ref={countUp?.ref || null} className="font-bold text-3xl mt-5">
          {countUp?.count}+
        </h2>
      )}
      <p>{text}</p>
    </div>
  );
};

export default StatisticsCard;
