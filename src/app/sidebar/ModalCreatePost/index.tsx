"use client";

import { cn } from "@/lib/utils";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { ReactNode, useState } from "react";
import useMeasure from "react-use-measure";
import ButtonLink from "../ButtonLink";
import { NewPostIcon } from "../Icons";
import { useCreatePost } from "./CreatePostContext";
import ModalTitle from "./ModalTitle";
import Picker from "./Picker";
import Preview from "./Preview";

type Props = {
  children: ReactNode;
};

const NewPostModal = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const { preview, step, isSubmitSuccessful, isSubmitting } = useCreatePost();
  const [ref, { height }] = useMeasure();

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <ButtonLink
        icon={<NewPostIcon />}
        callback={() => setOpen(true)}
        label="New Post"
      />

      <Dialog open={open} onClose={closeModal} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/70" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-bg-secondary overflow-hidden rounded-xl">
            <ModalTitle />
            <div
              ref={ref}
              className={cn(
                "aspect-square h-[500px] min-h-[70vh]",
                step >= 1 &&
                  !isSubmitting &&
                  !isSubmitSuccessful &&
                  "aspect-auto",
              )}
            >
              {isSubmitting && (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="size-[100px]">
                    <Image
                      src="/post-submitting.gif"
                      width={100}
                      height={100}
                      alt="submitting"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}
              {isSubmitSuccessful && (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="size-[100px]">
                    <Image
                      src="/post-submitted.gif"
                      width={100}
                      height={100}
                      alt="submitting"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}

              {!isSubmitting && !isSubmitSuccessful && preview.length === 0 ? (
                <Picker />
              ) : (
                <section
                  className="flex h-full gap-2 transition-all duration-300 ease-linear"
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
              className="flex aspect-square w-10 items-center justify-center"
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
