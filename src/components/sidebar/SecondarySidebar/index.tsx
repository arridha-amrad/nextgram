"use client";

import { FloatingPortal } from "@floating-ui/react";
import { AnimatePresence, motion } from "motion/react";
import { useSidebarContext } from "../Context";
import Search from "./Search";
import Notifications from "./Notifications";
import { useTranslations } from "next-intl";

type Props = {
  setFloating: (node: HTMLElement | null) => void;
  floatingStyles: React.CSSProperties;
};

export default function SecondarySidebar({
  setFloating,
  floatingStyles,
}: Props) {
  const { isSearchOpen, isNotificationsOpen } = useSidebarContext();

  const t = useTranslations("SecondarySidebar");

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
                className="bg-background border-foreground/20 custom-scrollbar relative h-screen min-w-[400px] overflow-x-hidden overflow-y-auto rounded-xl border-r"
              >
                <div className="flex h-25 items-center px-4">
                  <h1 className="text-2xl font-bold">
                    {isNotificationsOpen ? t("notification") : t("search")}
                  </h1>
                </div>
                {isSearchOpen && <Search />}
                {isNotificationsOpen && <Notifications />}
              </div>
            </motion.div>
          </div>
        </FloatingPortal>
      )}
    </AnimatePresence>
  );
}
