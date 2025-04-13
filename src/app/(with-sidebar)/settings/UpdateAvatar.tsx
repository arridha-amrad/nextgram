"use client";

import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";
import { useUpdateSession } from "@/hooks/useUpdateSession";
import { updateAvatar } from "@/lib/actions/user";
import { showToast } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";
import { usePathname } from "next/navigation";
import { useRef, useState, ChangeEvent } from "react";
import MySpinner from "@/components/Spinner";

type Props = {
  avatarUrl?: string | null;
  username: string;
  name: string;
};

function UpdateAvatar({ avatarUrl, name, username }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pathname = usePathname();

  const [currAvatar, setCurrAvatar] = useState(avatarUrl);

  const { execute, isPending, hasSucceeded, result } = useAction(
    updateAvatar.bind(null, pathname),
    {
      onError: () => {
        showToast("something went wrong", "error");
      },
    },
  );

  useUpdateSession(hasSucceeded, result.data);

  const formRef = useRef<HTMLFormElement | null>(null);

  const onChangeFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size <= 1000 * 1000) {
        const url = URL.createObjectURL(file);
        setCurrAvatar(url);
        formRef.current?.requestSubmit();
      } else {
        showToast("File too big. 1MB is allowed", "error");
      }
    }
  };

  return (
    <form
      ref={formRef}
      action={execute}
      className="bg-bg-secondary flex h-[88px] w-full items-center rounded-xl px-6"
    >
      <input
        disabled={isPending}
        accept="image/*"
        name="image"
        onChange={onChangeFileInput}
        hidden
        ref={inputRef}
        type="file"
        className="h-full w-full"
      />
      <div className="flex flex-1 items-center gap-4">
        <div className="relative h-full w-fit">
          <AvatarWithStoryIndicator
            isStoryExists
            isStoryWatched={false}
            size={56}
            avatarUrl={currAvatar}
          />
          {isPending && (
            <div className="absolute inset-0 z-20 flex items-center justify-center rounded-full bg-black/50">
              <MySpinner />
            </div>
          )}
        </div>
        <div className="text-sm">
          <h1 className="font-bold">{username}</h1>
          <p className="text-foreground/50">{name}</p>
        </div>
      </div>
      <button
        onClick={() => inputRef.current?.click()}
        disabled={isPending}
        type="button"
        className="bg-skin-primary rounded-lg px-6 py-1.5 text-sm font-semibold"
      >
        Change Photo
      </button>
    </form>
  );
}

export default UpdateAvatar;
