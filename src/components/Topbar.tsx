"use client";

import ButtonLink from "@/app/sidebar/ButtonLink";
import {
  Logo,
  NotificationsFilledIcon,
  NotificationsOutlinedIcon,
} from "@/app/sidebar/Icons";
import SearchInput from "@/app/sidebar/SecondarySidebar/SearchInput";
import SearchResult from "@/app/sidebar/SecondarySidebar/SearchResult";
import {
  autoUpdate,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

function TopBar() {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    placement: "bottom",
    middleware: [offset(10), shift()],
  });

  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getFloatingProps, getReferenceProps } = useInteractions([
    dismiss,
    role,
  ]);
  return (
    <div className="fixed inset-x-0 top-0 z-[999] block md:hidden">
      <div className="border-foreground/20 bg-background relative flex h-14 items-center gap-2 border-b px-4 py-2">
        <div className="flex-1">
          <Logo />
        </div>
        <div ref={refs.setReference} {...getReferenceProps()}>
          <SearchInput onFocus={() => setOpen(true)} />
          <AnimatePresence>
            {open && (
              <FloatingPortal>
                <div
                  ref={refs.setFloating}
                  style={floatingStyles}
                  {...getFloatingProps()}
                >
                  <div className="bg-bg-secondary block h-[500px] w-[400px] overflow-y-auto rounded-2xl p-4 md:hidden">
                    <SearchResult />
                  </div>
                </div>
              </FloatingPortal>
            )}
          </AnimatePresence>
        </div>
        <ButtonLink
          activeIcon={<NotificationsFilledIcon />}
          icon={<NotificationsOutlinedIcon />}
          callback={() => {}}
          label="Notifications"
        />
      </div>
    </div>
  );
}

export default TopBar;
