"use client";

import { HTMLAttributes, TextareaHTMLAttributes } from "react";

type Props = {
  label: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = ({ label, ...props }: Props) => {
  return (
    <textarea
      name="asf"
      {...props}
      id={props.id}
      className="mt-2 w-full resize-none rounded-lg border-transparent bg-skin-input align-top shadow-xs focus:border-transparent focus:ring-3 focus:ring-skin-primary sm:text-sm"
      rows={5}
    ></textarea>
  );
};

export default Textarea;
