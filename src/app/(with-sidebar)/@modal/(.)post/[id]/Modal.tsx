"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { usePostStore } from "./Post/store";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
};

const Modal = ({ children }: Props) => {
  const router = useRouter();
  const setReplySetter = usePostStore((store) => store.setReplySetter);
  const pathname = usePathname();

  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!pathname.startsWith("/post")) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [pathname]);

  const closeModal = () => {
    setOpen(false);
    setReplySetter(null);
    router.back();
  };

  const { theme } = useTheme();

  return (
    <Dialog open={open} onClose={closeModal} className="relative z-50">
      <DialogBackdrop
        className={cn(
          "fixed inset-0 backdrop-blur-sm",
          theme === "dark" ? "bg-background/50" : "bg-foreground/50",
        )}
      />
      <div className="fixed inset-0 flex items-center justify-center">
        <DialogPanel className="w-max">{children}</DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
