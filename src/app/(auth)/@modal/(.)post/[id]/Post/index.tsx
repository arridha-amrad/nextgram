"use client";

import { TPost } from "@/lib/drizzle/queries/posts/fetchPost";
import Left from "./Left";
import Right from "./Right";
import { TComment } from "@/lib/drizzle/queries/comments/fetchComments";
import { useCommentsStore } from "./store";
import { useEffect } from "react";

type Props = {
  post: TPost;
  comments: TComment[];
};

function Post({ post, comments }: Props) {
  const setComments = useCommentsStore((state) => state.setComments);
  const setTotal = useCommentsStore((state) => state.setTotal);

  useEffect(() => {
    setComments(comments);
    setTotal(post.sumComments);
  }, []);

  return (
    <div className="border-skin-border bg-background relative flex h-[90vh] overflow-hidden rounded-lg border">
      <Left className="max-w-[700px]" urls={post.urls.map((u) => u.url)} />
      <Right post={post} />
    </div>
  );
}

export default Post;
