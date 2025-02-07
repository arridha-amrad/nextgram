"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

type Props = {
  variant?: "floating" | "normal";
  errorMessage?: string;
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const TextInput = ({
  label,
  errorMessage,
  variant = "floating",
  ...props
}: Props) => {
  return variant === "floating" ? (
    <div>
      <label
        htmlFor={props.id}
        className={cn(
          "bg-skin-input focus-within:ring-skin-primary relative block overflow-hidden rounded-md border-[1px] px-2 pt-3 shadow-xs focus-within:ring-2",
          errorMessage ? "border-skin-error" : "border-skin-border",
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
            "text-skin-muted absolute start-3 top-3 -translate-y-1/2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs",
          )}
        >
          {label}
        </span>
      </label>
      {errorMessage && (
        <small className="text-skin-error px-1">{errorMessage}</small>
      )}
    </div>
  ) : (
    <div className="space-y-1.5">
      <label
        htmlFor={props.id}
        className="text-skin-base block text-sm font-medium"
      >
        {label}
      </label>
      <input
        {...props}
        className="border-skin-border bg-skin-input focus:ring-skin-primary ring-skin-fill w-full rounded-md border px-2 py-2 outline-hidden outline-0 focus:ring-2"
      />
      {errorMessage && (
        <small className="text-skin-error px-1">{errorMessage}</small>
      )}
    </div>
  );
};

export default TextInput;
