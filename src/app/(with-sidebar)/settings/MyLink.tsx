"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  label: string;
};

export default function MyLink({ href, children, label }: Props) {
  const pathname = usePathname();
  return (
    <Link
      style={{ width: 320 - 70 }}
      href={href}
      className={cn(
        "flex h-12 items-center gap-3 rounded-xl px-4 text-sm",
        href === pathname && "bg-bg-secondary text-skin-base",
      )}
    >
      {children}
      <span className="text-sm">{label}</span>
    </Link>
  );
}
