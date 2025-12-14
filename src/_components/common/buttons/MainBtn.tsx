import React, { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "@/utils/cn";

interface MainBtnProps
  extends Omit<ComponentProps<"button">, "disabled">,
    VariantProps<typeof buttonVariants> {
  className?: string;
  title?: string;
  children?: ReactNode;
}

const buttonVariants = cva(
  "px-6 py-4 capitalize duration-500 font-bold rounded border cursor-pointer",
  {
    variants: {
      variant: {
        main: "main-background text-white border-purple-500 bg-[length:200%_100%] bg-left hover:bg-right",
        secondary:
          "bg-gray-100 text-gray-800 border-gray-200 hover:bg-white hover:border-purple-500",
        outlined:
          "bg-transparent border border border-purple-500 text-purple-500",
      },
      size: {
        small: "py-1 px-3 text-sm",
        medium: "py-2 px-6 text-base",
        large: "py-3 px-8 text-lg",
      },
      disabled: {
        true: "pointer-events-none",
        false: null,
      },
    },
    defaultVariants: {
      variant: "main",
    },
  }
);

const MainBtn = ({
  className,
  title,
  children,
  variant = "main",
  size = "medium",
  disabled = false,
  ...props
}: MainBtnProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, disabled, className }))}
      disabled={disabled as boolean}
      {...props}
    >
      {title}
      {children}
    </button>
  );
};

export default MainBtn;
