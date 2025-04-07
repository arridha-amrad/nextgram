"use client";

import { useEffect, useState, useTransition } from "react";
import Button from "@/components/core/Button";
import { signOut } from "next-auth/react";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Modal from "@/components/core/ModalWrapper";
import { className } from "../styles";
import { page } from "@/lib/pages";

const ModalLogout = () => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const closeModal = () => {
    if (isPending) return;
    setOpen(false);
  };

  const router = useRouter();

  useEffect(() => {
    if (open) {
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }
  }, [open]);

  const logout = async () => {
    startTransition(async () => {
      await signOut({ redirect: false });
      router.replace(page.login, { scroll: false });
    });
  };
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-[50px] w-full items-center justify-center gap-4 xl:w-fit xl:justify-start xl:py-2"
      >
        <div className={className.iconContainer}>
          <ArrowRightStartOnRectangleIcon />
        </div>
        <span className="hidden xl:inline">Logout</span>
      </button>
      {open && (
        <Modal closeModal={closeModal}>
          <div className="border-skin-border bg-background relative max-w-sm overflow-hidden rounded-md border">
            <section className="border-skin-border border-b p-4">
              <h1 className="text-center text-xl font-semibold">Logout</h1>
            </section>
            <p className="text-skin-muted px-4 py-8 text-center text-sm">
              This action will clear your session. You need to relogin again to
              use this app. Are you sure?
            </p>
            <section className="flex justify-end gap-3 p-4">
              <button
                onClick={closeModal}
                className="border-skin-border w-24 rounded-md border px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <Button
                isLoading={isPending}
                onClick={logout}
                className="w-24 px-4 text-sm"
              >
                Yes
              </Button>
            </section>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ModalLogout;
