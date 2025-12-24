"use client";

import { useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";
import cn from "@/utils/cn";

interface AvatarProps {
  src: string;
  alt: string;
  size: number;
  className?: string;
}

const Avatar = ({ src, alt, size, className }: AvatarProps) => {
  const [isError, setIsError] = useState(false);

  // Check if className has width/height classes for responsive sizing
  const hasResponsiveSizing = className?.includes("w-") || className?.includes("h-");

  if (isError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-300 rounded-full",
          className
        )}
        style={hasResponsiveSizing ? undefined : { width: size, height: size }}
      >
        <User size={Math.round(size * 0.6)} className="text-gray-600" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("rounded-full object-cover", className)}
      onError={() => setIsError(true)}
    />
  );
};

export default Avatar;

