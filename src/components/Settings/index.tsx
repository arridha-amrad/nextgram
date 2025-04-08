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
        <SettingsIcon />
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

const SettingsIcon = () => (
  <svg
    aria-label="Options"
    fill="currentColor"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <title>Options</title>
    <circle
      cx="12"
      cy="12"
      fill="none"
      r="8.635"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></circle>
    <path
      d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
    ></path>
  </svg>
);
