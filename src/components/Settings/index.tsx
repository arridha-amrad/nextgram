"use client";

import Modal from "@/components/core/ModalWrapper";
import { CogIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import Logout from "./Logout";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

const Settings = () => {
  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };
  const openModal = () => {
    setOpen(true);
  };
  return (
    <>
      <button onClick={openModal}>
        <CogIcon className="aspect-square w-6" />
      </button>
      <Dialog open={open} onClose={() => setOpen(false)} className="relative">
        <DialogBackdrop className="bg-background/50 fixed inset-0 backdrop-blur-sm" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="border-skin-border bg-background w-full max-w-sm">
            <div className="border-skin-border bg-background relative flex w-full flex-col rounded-md border">
              <Link href="/settings" className="py-3 text-center text-sm">
                Settings
              </Link>
              <div className="bg-skin-border h-px w-full" />
              <hr className="bg-skin-border h-px border-0" />
              <Link
                href="/settings/change-username"
                className="py-3 text-center text-sm"
              >
                Change Username
              </Link>
              <hr className="bg-skin-border h-px border-0" />

              <Link
                href="/settings/change-password"
                className="py-3 text-center text-sm"
              >
                Change Password
              </Link>
              <hr className="bg-skin-border h-px border-0" />

              <Logout />
              <hr className="bg-skin-border h-px border-0" />

              <button
                onClick={closeModal}
                className="cursor-pointer py-3 text-sm"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default Settings;
