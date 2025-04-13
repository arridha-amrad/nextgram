"use client";

import MySpinner from "@/components/Spinner";
import { useUpdateSession } from "@/hooks/useUpdateSession";
import { updateAvatar } from "@/lib/actions/user";
import { showToast } from "@/lib/utils";
import { PhotoIcon } from "@heroicons/react/24/outline";
import mergeRefs from "merge-refs";
import { useAction } from "next-safe-action/hooks";
import { usePathname } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import AvatarWithStoryIndicator from "./AvatarWithStoryIndicator";

type Props = {
  avatar?: string | null;
};

const EditableAvatar = ({ avatar }: Props) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pathname = usePathname();

  const [currAvatar, setCurrAvatar] = useState(avatar);

  const { execute, isPending, hasSucceeded, result } = useAction(
    updateAvatar.bind(null, pathname),
    {
      onError: () => {
        showToast("something went wrong", "error");
      },
    },
  );

  useUpdateSession(hasSucceeded, result.data);

  const onChangeFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size <= 1000 * 1000) {
        const url = URL.createObjectURL(file);
        setCurrAvatar(url);
        btnRef.current?.click();
      } else {
        showToast("File too big. 1MB is allowed", "error");
      }
    }
  };

  return (
    <form
      action={execute}
      className="group relative size-[166px] cursor-pointer"
    >
      {isPending && (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-full bg-black/50">
          <MySpinner />
        </div>
      )}
      <div
        onClick={() => inputRef.current?.click()}
        className="absolute inset-0 z-10 flex items-center justify-center rounded-full bg-black/30 opacity-0 group-hover:opacity-100"
      >
        <PhotoIcon className="aspect-square w-7" />
        <input
          disabled={isPending}
          accept="image/*"
          name="image"
          onChange={onChangeFileInput}
          hidden
          ref={mergeRefs(inputRef)}
          type="file"
          className="h-full w-full"
        />
      </div>
      <AvatarWithStoryIndicator
        isStoryExists={true}
        isStoryWatched={false}
        size={150}
        avatarUrl={currAvatar}
      />
      <button hidden type="submit" ref={btnRef}></button>
    </form>
  );
};

export default EditableAvatar;
