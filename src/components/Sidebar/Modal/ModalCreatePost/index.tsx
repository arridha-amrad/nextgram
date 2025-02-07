"use client";

import { cn } from "@/lib/utils";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ReactNode, useEffect, useState } from "react";
import useMeasure from "react-use-measure";
import { className } from "../../styles";
import { useCreatePost } from "./CreatePostContext";
import ModalTitle from "./ModalTitle";
import Picker from "./Picker";
import Preview from "./Preview";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

type Props = {
  children: ReactNode;
};

const NewPostModal = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const { preview, step, reset, isSubmitSuccessful } = useCreatePost();
  const [ref, { height }] = useMeasure();

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      closeModal();
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <>
      <button onClick={() => setOpen(true)} className={className.button}>
        <div className={className.iconContainer}>
          <PencilSquareIcon />
        </div>
        <span className="hidden xl:inline">New Post</span>
      </button>
      <Dialog open={open} onClose={closeModal} className="relative z-50">
        <DialogBackdrop className="bg-background/50 fixed inset-0 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-background border-skin-border border">
            <ModalTitle />
            <div
              ref={ref}
              className={cn(
                "aspect-square max-h-[500px] min-h-[70vh]",
                step >= 1 && "aspect-auto",
              )}
            >
              {preview.length === 0 ? (
                <Picker />
              ) : (
                <section
                  className="flex gap-2 transition-all duration-300 ease-linear"
                  style={{ width: step >= 1 ? height + 384 : height }}
                >
                  <Preview height={height} width={height} />
                  {children}
                </section>
              )}
            </div>
          </DialogPanel>
          <div className="fixed top-5 right-5">
            <button
              onClick={closeModal}
              className="border-skin-border relative flex aspect-square w-10 items-center justify-center rounded-full border"
            >
              <XMarkIcon className="aspect-square w-7 stroke-white" />
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default NewPostModal;
