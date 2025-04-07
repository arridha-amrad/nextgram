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
        "text-skin-muted hover:text-skin-base flex h-12 items-center gap-3 rounded-md px-4",
        href === pathname && "bg-skin-primary/50 text-skin-base",
      )}
    >
      {children}
      <span className="text-sm">{label}</span>
    </Link>
  );
}
