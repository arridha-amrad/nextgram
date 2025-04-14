"use client";

import ModalUsers from "@/components/ModalUsers";
import { getLikes } from "@/lib/api/posts";
import { TLikeUsers } from "@/lib/drizzle/queries/posts/fetchPostLikes";
import { showToast } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useFeedPostContext } from "./Context";

export default function ModalPostLovers() {
  const { post } = useFeedPostContext();

  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<TLikeUsers[]>([]);
  const [loading, setLoading] = useState(false);

  const { data } = useSession();

  const fetchLovers = async () => {
    if (!post) return;
    setLoading(true);
    try {
      const data = await getLikes({
        date: new Date(),
        page: 1,
        postId: post.id,
      });
      setUsers(data.data);
    } catch {
      showToast("Failed to fetch likes", "error");
    } finally {
      setLoading(false);
    }
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
      <ModalUsers
        isLoading={loading}
        open={open}
        setOpen={setOpen}
        title="Likes"
        userId={data?.user.id ?? ""}
        users={users}
      />
    </>
  );
}
