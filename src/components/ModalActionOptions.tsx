import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Dispatch, ReactNode, SetStateAction } from "react";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

export default function ModalActionOptions({ open, setOpen, children }: Props) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="fixed inset-0 flex w-screen items-center justify-center p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      transition
    >
      <DialogBackdrop className="bg-background/70 fixed inset-0" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="bg-bg-secondary relative flex w-full max-w-sm flex-col rounded-xl">
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
