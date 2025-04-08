"use client";

import ModalBox from "@/components/ModalBox";
import Spinner from "@/components/Spinner";
import UserWithFollowButtonCard from "@/components/UserCardWithFollowButton";
import {
  fetchPostLikes,
  TLikeUsers,
} from "@/lib/drizzle/queries/posts/fetchPostLikes";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { useFeedPostContext } from "./Context";

export default function ModalPostLovers() {
  const { post } = useFeedPostContext();

  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [users, setUsers] = useState<TLikeUsers[]>([]);

  const { data } = useSession();

  const fetchLovers = async () => {
    if (!post) return;
    startTransition(async () => {
      const response = await fetchPostLikes({
        postId: post.id,
        authUserId: data?.user.id,
      });
      if (response.data) {
        setUsers(response.data);
      }
    });
  };

  if (!post || post.sumLikes === 0) return null;

  return (
    <>
      <button
        onClick={async () => {
          setOpen(true);
          await fetchLovers();
        }}
        className="space-x-1 text-sm font-semibold"
      >
        <span>{post.sumLikes}</span>
        <span>{post.sumLikes > 1 ? "likes" : "like"}</span>
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="bg-background/30 fixed inset-0 backdrop-blur-xs" />
        <div className="fixed inset-0 flex items-center justify-center px-4 py-10">
          <DialogPanel className="flex w-full max-w-sm items-center justify-center">
            <ModalBox title="Likes">
              {isPending ? (
                <div className="flex items-center justify-center py-4">
                  <Spinner className="w-6" />
                </div>
              ) : (
                users.map((user) => (
                  <UserWithFollowButtonCard
                    sessionUserId={data?.user.id ?? ""}
                    key={user.id}
                    user={user}
                  />
                ))
              )}
            </ModalBox>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
