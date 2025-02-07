"use client";

import PhotoIcon from "@heroicons/react/20/solid/PhotoIcon";
import { ChangeEvent, useCallback, useRef } from "react";
import { useCreatePost } from "./CreatePostContext";
import Button from "@/components/core/Button";
import { cn } from "@/lib/utils";
import { useDropzone } from "react-dropzone";

const Picker = () => {
  const { setFiles, setPreview } = useCreatePost();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setPreview(acceptedFiles.map((file) => URL.createObjectURL(file)));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop as any,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const onChangeFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const myFiles = [...Array(files.length)].map((_, i) => files[i]);
      setFiles(myFiles);
      setPreview(myFiles.map((file) => URL.createObjectURL(file)));
    }
  };
  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-4",
        isDragActive && "animate-pulse border-4 border-dashed border-blue-500",
      )}
    >
      <PhotoIcon className="aspect-square w-24 stroke-1" />
      <h1>Drag photos here</h1>
      <input
        {...getInputProps()}
        onChange={onChangeFileInput}
        hidden
        multiple
        type="file"
        ref={fileInputRef}
      />
      <Button onClick={() => fileInputRef.current?.click()}>
        Select from computer
      </Button>
    </div>
  );
};

export default Picker;
