"use client";

import { FloatingPortal } from "@floating-ui/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { useSidebarContext } from "../Context";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";

type Props = {
  setFloating: (node: HTMLElement | null) => void;
  floatingStyles: React.CSSProperties;
};

export default function SecondarySidebar({
  setFloating,
  floatingStyles,
}: Props) {
  const { isSearchOpen, isNotificationsOpen, closeSecondarySidebar } =
    useSidebarContext();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeSecondarySidebar();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeSecondarySidebar]);

  return (
    <AnimatePresence key="secondary-sidebar">
      {(isSearchOpen || isNotificationsOpen) && (
        <FloatingPortal>
          <div ref={setFloating} style={floatingStyles}>
            <motion.div
              key="secondary-sidebar"
              initial={{ x: -50, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="border-skin-elevated-separator bg-background relative h-screen w-[400px] overflow-y-auto border-r px-8"
              >
                <div className="flex h-25 items-center">
                  <h1 className="text-2xl font-bold">
                    {isNotificationsOpen ? "Notifications" : "Search"}
                  </h1>
                </div>
                {isSearchOpen && (
                  <div className="relative">
                    <SearchInput />
                    <div className="mt-4" />
                    <SearchResult />
                  </div>
                )}
                {isNotificationsOpen && (
                  <div className="relative">
                    <div>Notification Open</div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </FloatingPortal>
      )}
    </AnimatePresence>
  );
}
