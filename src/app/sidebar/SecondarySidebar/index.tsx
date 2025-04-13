"use client";

import { FloatingPortal } from "@floating-ui/react";
import { AnimatePresence, motion } from "motion/react";
import { useSidebarContext } from "../Context";
import Search from "./Search";

type Props = {
  setFloating: (node: HTMLElement | null) => void;
  floatingStyles: React.CSSProperties;
};

export default function SecondarySidebar({
  setFloating,
  floatingStyles,
}: Props) {
  const { isSearchOpen, isNotificationsOpen } = useSidebarContext();

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
                className="bg-background border-foreground/20 relative h-screen w-[400px] overflow-y-auto rounded-xl border-r"
              >
                <div className="flex h-25 items-center px-4">
                  <h1 className="text-2xl font-bold">
                    {isNotificationsOpen ? "Notifications" : "Search"}
                  </h1>
                </div>
                {isSearchOpen && <Search />}
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
