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
                "h-[500px] min-h-[70vh]",
                step === "makeCaption" ? "aspect-auto" : "aspect-square",
              )}
            >
              {step === "isSubmitting" && (
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

              {step === "isSubmitted" && (
                <div className="flex h-full w-full items-center justify-center gap-3">
                  <div className="size-[100px]">
                    <Image
                      src="/post-submitted.gif"
                      width={100}
                      height={100}
                      alt="submitted"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h2 className="text-3xl font-light">
                    You post has been shared
                  </h2>
                </div>
              )}

              {step === "pick" && preview.length === 0 ? (
                <Picker />
              ) : (
                <Preview height={height} width={height} />
              )}

              {step === "makeCaption" && (
                <section
                  className="flex h-full gap-2 transition-all duration-300 ease-linear"
                  style={{ width: height + 384 }}
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
