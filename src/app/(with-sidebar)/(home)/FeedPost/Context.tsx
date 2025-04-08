import { createContext, ReactNode, useContext, useState } from "react";
import { FeedPost, useFeedPosts } from "../store";

const Context = createContext<{
  post: FeedPost | null;
}>({
  post: null,
});

export const FeedPostProvider = ({
  children,
  postId,
}: {
  children: ReactNode;
  postId: string;
}) => {
  const feedPosts = useFeedPosts((store) => store.posts);
  const post = feedPosts.find((p) => p.id === postId);
  if (!post) return null;
  return <Context value={{ post }}>{children}</Context>;
};

export const useFeedPostContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Component must be wrapped inside FeedPostProvider");
  }
  return context;
};
