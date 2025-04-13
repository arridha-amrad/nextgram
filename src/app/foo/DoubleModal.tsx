"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import SecondDialog from "./SecondDialog";

export default function NestedDialogs() {
  const [isFirstOpen, setIsFirstOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);

  return (
    <div className="p-4">
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white"
        onClick={() => setIsFirstOpen(true)}
      >
        Open First Dialog
      </button>

      {/* First Dialog */}
      <Dialog
        open={isFirstOpen}
        onClose={() => setIsFirstOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white p-6 shadow-lg">
            <Dialog.Title className="text-lg font-bold">
              First Dialog
            </Dialog.Title>
            <Dialog.Description className="mb-4 text-sm">
              This is the first dialog.
            </Dialog.Description>

            <button
              onClick={() => setIsSecondOpen(true)}
              className="rounded bg-green-500 px-4 py-2 text-white"
            >
              Open Nested Dialog
            </button>

            <button
              onClick={() => setIsFirstOpen(false)}
              className="ml-2 rounded bg-gray-200 px-4 py-2"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Nested (Second) Dialog */}
      <SecondDialog isSecondOpen={true} setIsSecondOpen={setIsSecondOpen} />
    </div>
  );
}
