import { Dialog } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setIsSecondOpen: Dispatch<SetStateAction<boolean>>;
  isSecondOpen: boolean;
};

function SecondDialog({ isSecondOpen, setIsSecondOpen }: Props) {
  return (
    <Dialog
      open={isSecondOpen}
      onClose={() => setIsSecondOpen(false)}
      className="relative z-60"
    >
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="w-full max-w-sm rounded bg-white p-6 shadow-lg">
          <Dialog.Title className="text-lg font-bold">
            Nested Dialog
          </Dialog.Title>
          <Dialog.Description className="mb-4 text-sm">
            This dialog is opened from inside the first one.
          </Dialog.Description>

          <button
            onClick={() => setIsSecondOpen(false)}
            className="rounded bg-red-500 px-4 py-2 text-white"
          >
            Close Nested Dialog
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default SecondDialog;
