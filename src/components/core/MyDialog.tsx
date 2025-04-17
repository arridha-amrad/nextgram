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
    // eslint-disable-next-line
  }, [pathname]);

  const handleClose = () => {
    setOpen(false);
    router.back();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogBackdrop className="bg-background/50 fixed inset-0 backdrop-blur-sm" />
      <div className="fixed inset-0 flex w-screen items-center justify-center py-10">
        <DialogPanel className="bg-bg-secondary w-max rounded-xl shadow">
          <div className="border-foreground/20 relative space-x-2 border-b py-3 text-center">
            <h1 className="font-medium">{title}</h1>
            <div className="absolute top-1/2 right-4 -translate-y-1/2">
              <button
                className="flex h-full items-center justify-center"
                onClick={handleClose}
              >
                <svg
                  aria-label="Close"
                  fill="currentColor"
                  height="18"
                  role="img"
                  viewBox="0 0 24 24"
                  width="18"
                >
                  <title>Close</title>
                  <polyline
                    fill="none"
                    points="20.643 3.357 12 12 3.353 20.647"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  ></polyline>
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    x1="20.649"
                    x2="3.354"
                    y1="20.649"
                    y2="3.354"
                  ></line>
                </svg>
              </button>
            </div>
          </div>
          <div className="relative w-full px-4 py-3">
            <input
              type="text"
              placeholder="Search"
              className="bg-foreground/10 w-full rounded-lg px-4 py-2 text-sm outline-0 placeholder:font-light"
            />
          </div>
          <div className="custom-scrollbar max-h-[300px] overflow-y-auto">
            {children}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
