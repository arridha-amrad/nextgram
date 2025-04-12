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
  const setComments = usePostStore((store) => store.setComments);
  const setTotal = usePostStore((store) => store.setTotal);
  const setPost = usePostStore((store) => store.setPost);

  useEffect(() => {
    setPost(post);
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
