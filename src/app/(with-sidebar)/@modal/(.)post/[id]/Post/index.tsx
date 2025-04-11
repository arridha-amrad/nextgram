"use client";

import { TPost } from "@/lib/drizzle/queries/posts/fetchPost";
import Carousel from "./Carousel";
import Right from "./Right";
import { TComment } from "@/lib/drizzle/queries/comments/fetchComments";
import { usePostStore } from "./store";
import { useEffect } from "react";

type Props = {
  post: TPost;
  comments: TComment[];
};

function Post({ post, comments }: Props) {
  const setComments = usePostStore((state) => state.setComments);
  const setTotal = usePostStore((state) => state.setTotal);

  useEffect(() => {
    setComments(comments);
    setTotal(post.sumComments);
  }, []);

  return (
    <div className="flex overflow-hidden rounded-lg">
      <Carousel />
      <Right />
    </div>
  );
}

export default Post;
