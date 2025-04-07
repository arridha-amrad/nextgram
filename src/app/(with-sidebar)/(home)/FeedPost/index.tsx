"use client";

import { cn } from "@/lib/utils";
import { memo } from "react";
import type { FeedPost as TFeedPost } from "../store";
import PostHeader from "./1_Header";
import Carousel from "./Carousel";
import SomeActions from "./3_SomeActions";
import TotalLikes from "./4_TotalLikes";
import Description from "./5_Description";
import TotalComments from "./6_TotalComments";
import Comments from "./7_Comments";
import CommentForm from "./8_CommentForm";
import { FeedPostProvider } from "./Context";
import Header from "./Header";

type Props = {
  post: TFeedPost;
};

const FeedPost = memo(({ post }: Props) => {
  const urls = post.urls.map((u) => u.url);

  return (
    <FeedPostProvider feedPost={post}>
      <article className="w-full space-y-2 pb-14">
        <Header />
        <Carousel />
        <SomeActions post={post} />
        <TotalLikes post={post} />
        <Description post={post} />
        <TotalComments post={post} />
        <Comments comments={post.comments} />
        <CommentForm postId={post.id} />
      </article>
    </FeedPostProvider>
  );
});

export default FeedPost;
