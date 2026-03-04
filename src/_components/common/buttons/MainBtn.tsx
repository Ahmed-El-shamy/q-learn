import { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "@/utils/cn";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { LoaderCircle } from "lucide-react";

interface MainBtnProps
  extends Omit<ComponentProps<"button">, "disabled">,
  VariantProps<typeof buttonVariants> {
  className?: string;
  children?: ReactNode;
  isLoading?: boolean;
  containerClassName?: string;
}

const buttonVariants = cva(
  "px-6 py-4 capitalize duration-500 font-bold rounded border cursor-pointer grid grid-cols-1 grid-rows-1",
  {
    variants: {
      variant: {
        main: "main-background text-white border-green-600 bg-[length:200%_100%] bg-left hover:bg-right",
        secondary:
          "bg-gray-100 text-gray-800 border-gray-200 hover:bg-white hover:border-green-600",
        outlined:
          "bg-transparent border border border-green-600 text-green-700",
      },
      size: {
        small: "py-1 px-3 text-sm",
        medium: "py-2 px-6 text-base",
        large: "py-3 px-8 text-lg",
      },
      disabled: {
        true: "pointer-events-none opacity-60 cursor-not-allowed",
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
  containerClassName,
  children,
  variant = "main",
  size = "medium",
  disabled = false,
  isLoading = false,
  ...props
}: MainBtnProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, disabled, className: containerClassName }), {
        "pointer-events-none cursor-not-allowed": isLoading
      })}
      disabled={disabled as boolean}
      {...props}
    >
      <div className="grid grid-rows-1 grid-cols-1">
        {
          isLoading && (
            <span className="row-start-1 col-start-1 flex justify-center items-center">
              <LoaderCircle size={25} className="text-white animate-spin" />
            </span>
          )
        }
        <div
          className={twMerge(clsx("col-start-1 select-none col-end-1 row-start-1 row-end-1 col-span-1 row-span-1", className, {
            "invisible": isLoading
          }))}
        >
          {
            children
          }
        </div>
      </div>
    </button>
  );
};

export default MainBtn;
