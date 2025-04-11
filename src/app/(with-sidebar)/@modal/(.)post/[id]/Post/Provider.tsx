"use client";

import { ReactNode, useEffect } from "react";
import { usePostStore } from "./store";
import { TPost } from "@/lib/drizzle/queries/posts/fetchPost";

type Props = {
  children: ReactNode;
  post: TPost;
};

function PostProvider({ children, post }: Props) {
  const setPost = usePostStore((store) => store.setPost);

  useEffect(() => {
    setPost(post);
  }, []);

  return children;
}

export default PostProvider;
