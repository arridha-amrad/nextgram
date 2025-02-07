"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
};

export default function ModalBox({ title, children }: Props) {
  return (
    <div className="border-skin-border bg-background relative w-full max-w-sm rounded-lg border">
      <div className="border-skin-border relative space-x-2 border-b py-3 text-center">
        <h1 className="font-semibold tracking-wide">{title}</h1>
      </div>
      <div className="max-h-[500px] w-full max-w-sm overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
