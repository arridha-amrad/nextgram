"use client";

import ModalBox from "@/components/ModalBox";
import Spinner from "@/components/Spinner";
import UserWithFollowButtonCard from "@/components/UserCardWithFollowButton";
import { TFeedPost } from "@/lib/drizzle/queries/posts/fetchFeedPosts";
import {
  fetchPostLikes,
  TLikeUsers,
} from "@/lib/drizzle/queries/posts/fetchPostLikes";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";

type Props = {
  post: TFeedPost;
};

export default function ModalPostLovers({ post }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [users, setUsers] = useState<TLikeUsers[]>([]);

  const { data } = useSession();

  const fetchLovers = async () => {
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

  if (post.sumLikes === 0) return null;

  return (
    <>
      <button
        onClick={async () => {
          setOpen(true);
          await fetchLovers();
        }}
        className="space-x-1"
      >
        <span className="font-semibold">{post.sumLikes}</span>
        <span className="text-sm">{post.sumLikes > 1 ? "likes" : "like"}</span>
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
