"use client";

import { cn } from "@/lib/utils";
import { useCreatePost } from "./CreatePostContext";

const ModalTitle = () => {
  const { step, setStep, preview } = useCreatePost();
  return (
    <div
      className={cn(
        "border-skin-border bg-background flex h-[50px] w-full items-center justify-center border-b px-4",
        preview.length > 0 && "justify-between",
      )}
    >
      <button
        onClick={() => setStep((val) => (val -= 1))}
        className={cn(
          "text-skin-inverted invisible font-semibold",
          step > 0 && "visible",
        )}
      >
        Back
      </button>
      <h1 className="text-sm font-semibold">Create new post</h1>
      <button
        onClick={() => setStep((val) => (val += 1))}
        className={cn(
          "text-skin-inverted font-semibold",
          preview.length === 0 && "invisible",
          step > 0 && "invisible",
        )}
      >
        Next
      </button>
    </div>
  );
};

export default ModalTitle;
