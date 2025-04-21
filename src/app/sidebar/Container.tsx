"use client";

import useClickOutside from "@/hooks/useClickOutside";
import { usePathname } from "next/navigation";
import { useSidebarContext } from "./Context";
import { cn } from "@/lib/utils";
import SecondarySidebar from "./SecondarySidebar";
import { page } from "@/lib/pages";
import { autoUpdate, offset, shift, useFloating } from "@floating-ui/react";
import { ReactNode } from "react";
import useEscapePressed from "@/hooks/useEscapePressed";

type Props = {
  children: ReactNode;
};

function Container({ children }: Props) {
  const pathname = usePathname();

  const {
    closeSecondarySidebar,
    isSmallSidebar,
    isNotificationsOpen,
    isSearchOpen,
  } = useSidebarContext();

  const { refs, floatingStyles } = useFloating({
    placement: "right-end",
    strategy: "fixed",
    middleware: [offset(0), shift()],
    whileElementsMounted: autoUpdate,
  });

  const clickOutsideRef = useClickOutside(() => {
    closeSecondarySidebar();
  });
  useEscapePressed(
    () => closeSecondarySidebar(),
    isNotificationsOpen || isSearchOpen,
  );
  return (
    <div
      ref={clickOutsideRef}
      className={cn(
        "sticky top-0 hidden h-screen md:block",
        pathname === page.inbox ? "w-fit" : "w-fit lg:w-72",
      )}
    >
      <aside
        ref={refs.setReference}
        className={cn("min-h-screen w-fit overflow-hidden")}
      >
        <SecondarySidebar
          setFloating={refs.setFloating}
          floatingStyles={floatingStyles}
        />
        <div
          className={cn(
            "custom-scrollbar flex h-screen w-fit flex-col overflow-y-auto pr-4 pl-1",
            isSmallSidebar ? "border-foreground/20 border-r" : "",
          )}
        >
          {children}
        </div>
      </aside>
    </div>
  );
}

export default Container;
