import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

type Props = {
  isPending: boolean;
};

export default function LogoutDialog({ isPending }: Props) {
  return (
    <Dialog
      id="alert-dialog-headless-portal-root"
      role="alertdialog"
      onClose={() => {}}
      open={isPending}
      className="relative z-[999]"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/80" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="bg-bg-secondary w-full max-w-sm rounded-xl">
          <DialogTitle as="div" className="flex items-center justify-center">
            <div className="w-full space-y-2 py-5 text-center">
              <h1 className="text-xl font-light">Discard post?</h1>
              <p className="text-foreground/70 text-sm">
                If you leave, your edits won&apos;t be saved.
              </p>
            </div>
          </DialogTitle>
          <hr className="border-foreground/10" />
          <div className="py-4">
            <h1 className="animate-pulse text-center text-sm font-light">
              Preparing your logout...
            </h1>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
