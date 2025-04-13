"use client";

import { Checkbox, Field, Label } from "@headlessui/react";

type Props = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const MyCheckbox = ({ label, checked, onChange }: Props) => {
  return (
    <Field className="flex items-center gap-2">
      <Checkbox
        checked={checked}
        onChange={onChange}
        className="group bg-skin-input border-skin-border data-[checked]:bg-skin-primary block size-4 rounded border"
      >
        <svg
          className="stroke-white opacity-0 group-data-[checked]:opacity-100"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3 8L6 11L11 3.5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Checkbox>
      <Label className="text-skin-muted text-sm">{label}</Label>
    </Field>
  );
};

export default MyCheckbox;
