"use client";

import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";
import ModalActionOptions from "@/components/ModalActionOptions";
import PostHeaderOptions from "@/components/PostHeaderOptions";
import { formatDistanceToNowStrict } from "date-fns";
import { useEffect, useState } from "react";
import { useFeedPostContext } from "./Context";
import Link from "next/link";
import { page } from "@/lib/pages";

function Header() {
  const [open, setOpen] = useState(false);
  const { post } = useFeedPostContext();

  const [date, setDate] = useState("");

  useEffect(() => {
    if (post?.createdAt) {
      setDate(formatDistanceToNowStrict(post.createdAt, { addSuffix: true }));
    }
  }, [post?.createdAt]);

  if (!post) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <AvatarWithStoryIndicator
        isStoryExists
        isStoryWatched
        size={32}
        avatarUrl={post.avatar}
      />
      <div className="flex-1">
        <div className="flex items-center gap-1">
          <Link
            href={page.profile(post.username)}
            className="text-sm font-bold"
          >
            {post.username}
          </Link>
          <span>·</span>
          <h3 className="text-foreground/70 text-sm">{date}</h3>
        </div>
        <p className="text-xs">{post.location}</p>
      </div>
      <button onClick={() => setOpen(true)}>
        <svg
          aria-label="Options"
          fill="currentColor"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <title>Options</title>
          <circle cx="12" cy="12" r="1.5"></circle>
          <circle cx="6" cy="12" r="1.5"></circle>
          <circle cx="18" cy="12" r="1.5"></circle>
        </svg>
      </button>
      <ModalActionOptions open={open} setOpen={setOpen}>
        <PostHeaderOptions close={() => setOpen(false)} />
      </ModalActionOptions>
    </div>
  );
}

export default Header;
