"use client";

import { TComment } from "@/lib/drizzle/queries/comments/fetchComments";
import { TPost } from "@/lib/drizzle/queries/posts/fetchPost";
import { useEffect } from "react";
import Carousel from "./Carousel";
import Right from "./Right";
import { usePostStore } from "./store";

type Props = {
  post: TPost;
  comments: TComment[];
};

function Post({ post, comments }: Props) {
  const init = usePostStore((store) => store.init);

  useEffect(() => {
    init(post, comments);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex overflow-hidden rounded-lg">
      <Carousel />
      <Right />
    </div>
  );
}

export default Post;
