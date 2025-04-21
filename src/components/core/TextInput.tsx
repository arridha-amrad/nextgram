"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

type Props = {
  errorMessage?: string;
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextInput = ({ label, errorMessage, ...props }: Props) => {
  return (
    <div>
      <label
        htmlFor={props.id}
        className={cn(
          "bg-bg-secondary relative block overflow-hidden rounded-xl px-2 pt-3 shadow-xs focus-within:ring-2",
          !!errorMessage ? "ring-red-400" : "focus-within:ring-skin-primary",
        )}
      >
        <input
          {...props}
          placeholder={label}
          className={cn(
            "peer bg-skin-input h-10 w-full border-0 p-2 placeholder-transparent focus:border-0 focus:outline-0 sm:text-sm",
          )}
        />

        <span
          className={cn(
            "text-foreground/50 absolute start-3 top-3 -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs",
          )}
        >
          {label}
        </span>
      </label>
      {errorMessage && (
        <small className="px-1 text-red-400">{errorMessage}</small>
      )}
    </div>
  );
};

export default TextInput;
