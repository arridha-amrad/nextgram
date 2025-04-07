"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { TTab } from ".";

type Props = {
  tab: TTab;
  username: string;
};

export default function Tab({
  tab: { fillIcon, href, icon, name },
  username,
}: Props) {
  const pathname = usePathname();
  const target = href === "" ? `/${username}` : `/${username}/${href}`;
  const isActive = target === pathname;

  return (
    <div className="relative p-4" key={name}>
      {isActive && (
        <div className="bg-skin-muted absolute top-0 left-0 h-1 w-full rounded" />
      )}
      <Link
        scroll={false}
        className={cn(
          isActive ? "font-bold" : "text-skin-muted font-normal",
          "flex gap-2",
        )}
        href={target}
      >
        {isActive ? fillIcon : icon}
        {name}
      </Link>
    </div>
  );
}
