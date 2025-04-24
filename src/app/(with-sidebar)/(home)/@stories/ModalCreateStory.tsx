"use client";

import PostIcon from "@/icons/PostIconSvg";
import { cn, rgbDataURL, showToast } from "@/lib/utils";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import { ChangeEvent, JSX, useEffect, useRef, useState } from "react";

type Step = "pick" | "preview" | "submitting" | "submitted";

export default function ModalCreateStory() {
  const [step, setStep] = useState<Step>("pick");
  const [children, setChildren] = useState<JSX.Element | null>(null);

  const [isOpen, setIsOpen] = useState(true);
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const handleInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (!file) return;
    if (file[0].size > 1024 * 1000) {
      showToast("file too big, cannot exceed 1 MB", "error");
      return;
    }
    setStep("preview");
    setFile(file[0]);
    const url = URL.createObjectURL(file[0]);
    setPreview(url);
  };

  const handleSubmit = async () => {
    setStep("submitting");
    await new Promise((res) => setTimeout(res, 3000));
    setStep("submitted");
    showToast("Your story has been shared", "success");
  };

  useEffect(() => {
    const chooseContent = () => {
      let content = <></>;
      switch (step) {
        case "pick":
          content = (
            <div className="flex aspect-[4/5] h-full flex-col items-center justify-center gap-4">
              <PostIcon />
              <input
                onChange={handleInputFileChange}
                ref={inputFileRef}
                type="file"
                hidden
                accept="image/*"
              />
              <button
                onClick={() => inputFileRef.current?.click()}
                className="bg-skin-primary rounded-lg px-4 py-2 text-sm"
              >
                Select from computer
              </button>
            </div>
          );
          break;
        case "preview":
          content = (
            <div className="h-full w-full">
              <Image
                placeholder="blur"
                blurDataURL={rgbDataURL(60, 60, 60)}
                src={preview}
                alt="story image preview"
                width={800}
                height={1000}
                className="h-full w-full object-contain"
              />
            </div>
          );
          break;
        case "submitting":
          content = (
            <div className="flex aspect-[4/5] h-full w-full items-center justify-center">
              <div className="size-[120px]">
                <Image
                  placeholder="blur"
                  blurDataURL={rgbDataURL(60, 60, 60)}
                  src="/post-submitting.gif"
                  alt="story image preview"
                  width={800}
                  height={1000}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          );
          break;
        case "submitted":
          content = (
            <div className="flex aspect-[4/5] h-full w-full flex-col items-center justify-center gap-4">
              <div className="size-[120px]">
                <Image
                  placeholder="blur"
                  blurDataURL={rgbDataURL(60, 60, 60)}
                  src="/post-submitted.gif"
                  alt="story image preview"
                  width={800}
                  height={1000}
                  className="h-full w-full object-contain"
                />
              </div>
              <p>Your story has been shared</p>
            </div>
          );
        default:
          break;
      }
      return content;
    };
    setChildren(chooseContent());
    // eslint-disable-next-line
  }, [step]);

  return (
    <>
      <div onClick={() => setIsOpen(true)} className="">
        <div className="bg-bg-secondary border-foreground/30 flex size-[66px] shrink-0 items-center justify-center rounded-full border-2 border-dashed hover:cursor-pointer">
          <svg
            aria-label="New Story"
            className="fill-foreground/30"
            height="20"
            role="img"
            viewBox="0 0 24 24"
            width="20"
          >
            <title>New story</title>
            <path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path>
          </svg>
        </div>
        <p className="text-foreground/50 py-1 text-center text-xs">Add</p>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="bg-bg-secondary w-max rounded-xl transition-all duration-300 ease-linear">
            <div className="border-foreground/20 flex w-full items-center justify-between border-b px-4 py-4 text-sm">
              <button
                onClick={() => {
                  setStep("pick");
                  setPreview("");
                  setFile(null);
                }}
                className={cn(
                  "text-sm",
                  step === "preview" ? "visible" : "invisible",
                )}
              >
                back
              </button>
              <h1>Create new story</h1>
              <button
                onClick={handleSubmit}
                className={cn(
                  "text-sm",
                  step === "preview" ? "visible" : "invisible",
                )}
              >
                post
              </button>
            </div>
            <div className="h-[80vh] w-full">
              <div className="flex h-full w-max flex-col items-center justify-center gap-y-4">
                {children}
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
