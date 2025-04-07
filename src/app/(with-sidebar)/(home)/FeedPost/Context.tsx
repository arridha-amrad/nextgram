import { TFeedPost } from "@/lib/drizzle/queries/posts/fetchFeedPosts";
import { createContext, ReactNode, useContext, useState } from "react";

const Context = createContext<{
  post: TFeedPost | null;
}>({
  post: null,
});

export const FeedPostProvider = ({
  children,
  feedPost,
}: {
  children: ReactNode;
  feedPost: TFeedPost;
}) => {
  const [post] = useState<TFeedPost>(feedPost);
  return <Context value={{ post }}>{children}</Context>;
};

export const useFeedPostContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Component must be wrapped inside FeedPostProvider");
  }
  return context;
};
