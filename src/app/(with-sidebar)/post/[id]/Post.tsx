"use client";

import { TComment } from "@/lib/drizzle/queries/comments/fetchComments";
import { TPost } from "@/lib/drizzle/queries/posts/fetchPost";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Left from "../../@modal/(.)post/[id]/Post/Carousel";
import Right from "../../@modal/(.)post/[id]/Post/Right";
import { usePostStore } from "../../@modal/(.)post/[id]/Post/store";

type Props = {
  post: TPost;
  comments: TComment[];
};

function Post({ post, comments }: Props) {
  const init = usePostStore((state) => state.init);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    init(post, comments);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="bg-background overflow-hidden rounded-lg">
      <div className="group relative xl:flex">
        <Left />
        {isOpen ? (
          <>
            <div
              onClick={() => setIsOpen(false)}
              className="bg-background/70 absolute inset-0"
            />
            <div className="absolute top-0 right-0 bottom-0 flex">
              <Right />
            </div>
          </>
        ) : (
          <div className="absolute top-2 right-4 block opacity-0 group-hover:opacity-100 2xl:hidden">
            <button
              title="show content"
              className="bg-background/70 flex aspect-square w-10 items-center justify-center rounded-full"
              onClick={() => setIsOpen(true)}
            >
              <EyeIcon className="stroke-skin-base aspect-square w-5" />
            </button>
          </div>
        )}
        <div className="hidden 2xl:flex">
          <Right />
        </div>
      </div>
    </div>
  );
}

export default Post;
