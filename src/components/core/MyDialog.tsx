"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";

type Props = {
  children: ReactNode;
  title: string;
  path: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function DialogContentWrapper({
  children,
  title,
  open,
  path,
  setOpen,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === path) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [pathname]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        router.back();
      }}
    >
      <DialogBackdrop className="bg-background/50 fixed inset-0 backdrop-blur-sm" />
      <div className="fixed inset-0 flex w-screen items-center justify-center py-10">
        <DialogPanel className="border-skin-border bg-background w-max rounded-lg border shadow">
          <div className="border-b-skin-border relative space-x-2 border-b py-3 text-center">
            <h1 className="font-semibold tracking-wide">{title}</h1>
          </div>
          <div className="max-h-[500px] overflow-y-auto">{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
