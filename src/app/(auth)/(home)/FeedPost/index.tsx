"use client";

import { cn } from "@/lib/utils";
import { memo } from "react";
import type { FeedPost as TFeedPost } from "../store";
import PostHeader from "./1_Header";
import Carousel from "./2_Carousel";
import SomeActions from "./3_SomeActions";
import TotalLikes from "./4_TotalLikes";
import Description from "./5_Description";
import TotalComments from "./6_TotalComments";
import Comments from "./7_Comments";
import CommentForm from "./8_CommentForm";

type Props = {
  post: TFeedPost;
};

const FeedPost = memo(({ post }: Props) => {
  const urls = post.urls.map((u) => u.url);

  return (
    <article className={cn("w-full space-y-2 pb-14")}>
      <PostHeader post={post} />
      <Carousel urls={urls} />
      <SomeActions post={post} />
      <TotalLikes post={post} />
      <Description post={post} />
      <TotalComments post={post} />
      <Comments comments={post.comments} />
      <CommentForm postId={post.id} />
    </article>
  );
});

export default FeedPost;
