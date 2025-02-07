"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";
import MySpinner from "../Spinner";

type Props = {
  children: ReactNode;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, isLoading = false, ...props }: Props) => {
  return (
    <button
      {...props}
      disabled={isLoading}
      className={cn(
        "bg-skin-primary flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-2 text-sm leading-5 font-medium text-white transition-all duration-200 ease-linear disabled:brightness-125",
        props.className,
      )}
    >
      {isLoading ? <MySpinner className="w-5" /> : children}
    </button>
  );
};

export default Button;
