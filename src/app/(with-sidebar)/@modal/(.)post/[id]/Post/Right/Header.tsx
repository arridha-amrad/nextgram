import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";
import Link from "next/link";
import { usePostStore } from "../store";
import ModalActionOptions from "@/components/ModalActionOptions";
import PostHeaderOptions from "@/components/PostHeaderOptions";
import { useState } from "react";

function PostHeader() {
  const post = usePostStore((store) => store.post);
  const [open, setOpen] = useState(false);
  const bookMark = usePostStore((store) => store.bookMarkPost);

  if (!post) return null;

  return (
    <section className="flex h-[70px] items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <AvatarWithStoryIndicator
          isStoryExists={false}
          isStoryWatched={false}
          size={32}
          avatarUrl={post.avatar}
        />
        <div className="w-full">
          <div className="line-clamp-1">
            <Link
              href={`/${post.username}`}
              className="block text-sm font-medium"
            >
              {post.username}
            </Link>
          </div>
          <p className="text-foreground/70 text-xs">{post.location}</p>
        </div>
      </div>
      <ModalActionOptions open={open} setOpen={setOpen}>
        <PostHeaderOptions
          isFavorite={post.isSaved}
          isFollow={post.isUserFollowed}
          followCallback={() => {}}
          bookMarkCallback={bookMark}
          postId={post.id}
          postOwnerId={post.userId}
          close={() => setOpen(false)}
        />
      </ModalActionOptions>
    </section>
  );
}

export default PostHeader;
