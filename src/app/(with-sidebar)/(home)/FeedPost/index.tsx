"use client";

import { memo } from "react";
import type { FeedPost as TFeedPost } from "../store";
import Actions from "./Actions";
import Carousel from "./Carousel";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import { FeedPostProvider } from "./Context";
import Description from "./Description";
import Header from "./Header";
import TotalComments from "./TotalComments";
import TotalLikes from "./TotalLikes";

type Props = {
  post: TFeedPost;
};

const FeedPost = memo(
  function FeedPost({ post }: Props) {
    return (
      <FeedPostProvider postId={post.id}>
        <article className="w-full space-y-2 pb-14">
          <Header />
          <Carousel />
          <Actions />
          <TotalLikes />
          <Description />
          <TotalComments />
          <Comments />
          <CommentForm />
        </article>
      </FeedPostProvider>
    );
  },
  (prev, next) => prev.post.id === next.post.id,
);

export default FeedPost;
