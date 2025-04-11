"use client";

import { page } from "@/lib/pages";
import { cn } from "@/lib/utils";
import { Button } from "@headlessui/react";
import { usePathname } from "next/navigation";
import { HTMLAttributes, ReactNode, Ref } from "react";
import { useSidebarContext } from "./Context";

type Props = {
  callback?: VoidFunction;
  activePath?: string;
  activeIcon?: ReactNode;
  icon: ReactNode;
  label: string;
  ref?: Ref<HTMLDivElement>;
} & HTMLAttributes<HTMLElement>;

export default function ButtonLink({
  activeIcon,
  callback,
  activePath,
  icon,
  label,
  ref,
  ...props
}: Props) {
  const { isSmallSidebar, isNotificationsOpen, isSearchOpen } =
    useSidebarContext();
  const pathname = usePathname();
  const isActive = pathname === activePath;

  const isApplySmallSidebar = isSmallSidebar || pathname === page.inbox;

  const currentIcon = () => {
    if (activeIcon) {
      if (label === "Search") {
        return isSearchOpen ? activeIcon : icon;
      }
      if (label === "Notifications") {
        return isNotificationsOpen ? activeIcon : icon;
      }
      return isActive ? activeIcon : icon;
    }
    return icon;
  };

  return (
    <div
      onClick={callback}
      className={cn(
        "flex w-max cursor-pointer items-center rounded-lg hover:bg-neutral-500/20",
      )}
      {...props}
      tabIndex={0}
      ref={ref}
    >
      <Button
        className={cn(
          "ring-skin-muted flex aspect-square h-12 w-fit cursor-pointer items-center justify-center rounded-lg",
        )}
      >
        {currentIcon()}
      </Button>
      {!isApplySmallSidebar && (
        <span
          className={cn(
            "hidden pr-4 pl-2 select-none lg:block",
            isActive ? "font-normal" : "font-light",
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}
