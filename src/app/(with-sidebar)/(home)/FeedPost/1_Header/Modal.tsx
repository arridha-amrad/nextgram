"use client";

import { Button, Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { useState, useTransition } from "react";
import { follow } from "@/lib/actions/follow";
import { savePost as addToFavorite } from "@/lib/actions/post";
import { usePathname, useRouter } from "next/navigation";
import { useFeedPosts } from "../../store";
import Spinner from "@/components/Spinner";

type Props = {
  userId: string;
  postId: string;
};

export default function Modal({ userId, postId }: Props) {
  let [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const markAsFavorite = useFeedPosts((store) => store.savePost);

  const router = useRouter();

  const pathname = usePathname();
  const unFollow = () => {
    startTransition(async () => {
      await follow.bind(null, pathname)({ followId: userId });
      router.refresh();
      setIsOpen(false);
    });
  };

  const savePost = async () => {
    await addToFavorite.bind(null, pathname)({ postId });
    markAsFavorite(postId);
    setIsOpen(false);
  };

  return (
    <fieldset disabled={isPending}>
      <button onClick={() => setIsOpen(true)}>
        <EllipsisHorizontalIcon className="text-skin-muted size-7" />
      </button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="bg-background/30 fixed inset-0 backdrop-blur" />
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <DialogPanel className="border-skin-border bg-background w-full max-w-sm rounded-lg border">
            <Button
              onClick={unFollow}
              className="relative h-12 w-full font-semibold text-red-500"
            >
              Unfollow
              {isPending && (
                <div className="absolute top-1/2 right-4 -translate-y-1/2">
                  <Spinner />
                </div>
              )}
            </Button>
            <hr className="bg-skin-border h-px w-full border-0" />
            <Button onClick={savePost} className="h-12 w-full">
              Add To Favorite
            </Button>
            <hr className="bg-skin-border h-px w-full border-0" />
            <Button onClick={() => setIsOpen(false)} className="h-12 w-full">
              Cancel
            </Button>
          </DialogPanel>
        </div>
      </Dialog>
    </fieldset>
  );
}
