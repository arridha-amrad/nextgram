"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";
import Spinner from "../Spinner";

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
        "bg-skin-primary relative flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md px-3 text-sm leading-5 font-medium transition-all duration-200 ease-linear disabled:brightness-125",
        props.className,
        isLoading ? "text-transparent" : "text-foreground",
      )}
    >
      {children}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner className="size-5" />
        </div>
      )}
    </button>
  );
};

export default Button;
