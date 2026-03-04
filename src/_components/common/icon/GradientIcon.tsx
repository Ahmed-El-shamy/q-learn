"use client";
import React from "react";
import { LucideIcon } from "lucide-react";

interface GradientIconProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  Icon: LucideIcon;
  size?: number;
  gradientFrom?: string;
  gradientTo?: string;
  className?: string;
  stroke?: string;
  fill?: string;
}

const GradientIcon: React.FC<GradientIconProps> = ({
  onClick,
  Icon,
  size = 18,
  gradientFrom = "#00C950",
  gradientTo = "#007A33",
  className = "",
  stroke,
  fill,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center p-2 hover:bg-green-50 rounded-full cursor-pointer transition-colors ${className}`}
    >
      <svg width={size * 2} height={size * 2} viewBox="0 0 24 24">
        <defs>
          <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={gradientFrom} />
            <stop offset="100%" stopColor={gradientTo} />
          </linearGradient>
        </defs>
        <g transform={`translate(${(24 - size) / 2}, ${(24 - size) / 2})`}>
          <Icon
            stroke={stroke || "url(#iconGradient)"}
            fill={fill || "url(#iconGradient)"}
            size={size}
            className="cursor-pointer"
          />
        </g>
      </svg>
    </button>
  );
};

export default GradientIcon;
