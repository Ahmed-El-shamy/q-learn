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
}

const GradientIcon: React.FC<GradientIconProps> = ({
  onClick,
  Icon,
  size = 18,
  gradientFrom = "#660afb",
  gradientTo = "#b633ff",
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 hover:bg-purple-50 rounded-full transition-colors ${className}`}
    >
      <svg width={size * 2} height={size * 2} viewBox="0 0 24 24">
        <defs>
          <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={gradientFrom} />
            <stop offset="100%" stopColor={gradientTo} />
          </linearGradient>
        </defs>
        <Icon
          stroke="url(#iconGradient)"
          fill="url(#iconGradient)"
          size={size}
        />
      </svg>
    </button>
  );
};

export default GradientIcon;
