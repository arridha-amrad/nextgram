"use client";

import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";
import ModalActionOptions from "@/components/ModalActionOptions";
import PostHeaderOptions from "@/components/PostHeaderOptions";
import { page } from "@/lib/pages";
import { useFeedPostStore } from "@/lib/stores/feedPostStore";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFeedPostContext } from "./Context";

function Header() {
  const [open, setOpen] = useState(false);
  const { post } = useFeedPostContext();

  const router = useRouter();

  const [date, setDate] = useState("");

  useEffect(() => {
    if (post?.createdAt) {
      setDate(formatDistanceToNowStrict(post.createdAt, { addSuffix: true }));
    }
  }, [post?.createdAt]);

  const bookMark = useFeedPostStore((store) => store.savePost);
  const removePost = useFeedPostStore((store) => store.removePost);

  const navigate = () => {
    if (!post) return;
    if (post.isUserStoryExists) {
      router.push(page.userStories(post.username));
    } else {
      router.push(page.profile(post.username));
    }
  };

  if (!post) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 px-2">
      <AvatarWithStoryIndicator
        onClick={navigate}
        isStoryExists={post.isUserStoryExists}
        isStoryWatched={false}
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
      <ModalActionOptions open={open} setOpen={setOpen}>
        <PostHeaderOptions
          isFollow={post.isUserFollowed}
          isFavorite={post.isSaved}
          followCallback={() => {
            removePost(post.id);
          }}
          bookMarkCallback={() => bookMark(post.id)}
          postId={post.id}
          postOwnerId={post.userId}
          close={() => setOpen(false)}
        />
      </ModalActionOptions>
    </div>
  );
}

export default Header;
