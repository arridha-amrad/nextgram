"use client";

import { cn } from "@/lib/utils";
import { Field, Input, Label } from "@headlessui/react";
import { ChangeEventHandler, HTMLInputTypeAttribute, useState } from "react";

type Props = {
  error?: string;
  name: string;
  label: string;
  value: string;
  type: HTMLInputTypeAttribute;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export default function InputWithFloatingLabel({
  label,
  onChange,
  type,
  name,
  value,
  error,
}: Props) {
  const [inputType, setInputType] = useState(type);
  return (
    <Field className="relative w-full space-y-2">
      <div className="relative w-full">
        <Label
          className={cn(
            "text-skin-muted absolute top-1/2 left-4 -translate-y-1/2 text-sm transition-all duration-75 ease-in select-none",
            !!value && "top-[14px] left-3 text-xs tracking-wide",
          )}
        >
          {label}
        </Label>
        <Input
          name={name}
          value={value}
          onChange={onChange}
          type={inputType}
          className={cn(
            "bg-background ring-skin-primary border-skin-elevated-separator h-12 w-full rounded-lg border pl-3 outline-hidden focus:ring-2",
            !!value && "pt-3 text-sm font-medium",
            type === "password"
              ? "pr-12 tracking-wider"
              : "pr-3 tracking-normal",
          )}
        />
        {type === "password" && !!value && (
          <div className="absolute top-1/2 right-0 -translate-y-1/2">
            <button
              type="button"
              onClick={() => {
                setInputType((val) => (val === "text" ? "password" : "text"));
              }}
              className="px-2 py-1 text-sm outline-0"
            >
              {inputType === "text" ? "hide" : "show"}
            </button>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </Field>
  );
}
