"use client";

import { likePost as lp } from "@/lib/actions/post";
import { TPost } from "@/lib/drizzle/queries/posts/fetchPost";
import { showToast } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useOptimistic, useState, useTransition } from "react";
import Header from "./1_Header";
import Comments from "./2_Comments";
import Description from "./2_Description";
import SomeActions from "./3_SomeActions";
import Likes from "./4_TotalLikes";
import PostDate from "./5_Date";
import CommentForm from "./6_CommentForm";
import { useFeedPosts } from "@/app/(auth)/(home)/store";

type Props = {
  post: TPost;
};

const PostExpanded = ({ post }: Props) => {
  const likeFeedPost = useFeedPosts((store) => store.likePost);

  const [likeStatus, setLikeStatus] = useState({
    isLiked: post.isLiked,
    sumLikes: post.sumLikes,
  });

  const [optimistic, setOptimistic] = useOptimistic(likeStatus);

  const [_, startTransition] = useTransition();
  const pathname = usePathname();

  const likePost = () => {
    startTransition(async () => {
      setOptimistic((state) => ({
        isLiked: !state.isLiked,
        sumLikes: state.isLiked ? state.sumLikes - 1 : state.sumLikes + 1,
      }));
      likeFeedPost(post.id);
      const result = await lp.bind(null, pathname)({ postId: post.id });
      if (result?.serverError) {
        showToast(result.serverError, "error");
        likeFeedPost(post.id); // if error undo previous like
      }
      if (result?.data) {
        setLikeStatus((val) => ({
          isLiked: !val.isLiked,
          sumLikes: val.isLiked ? val.sumLikes - 1 : val.sumLikes + 1,
        }));
      }
    });
  };

  return (
    <div className="bg-background border-l-skin-border flex w-[500px] flex-col border-l">
      <Header post={post} />
      <section className="border-skin-border flex flex-1 basis-0 flex-col items-start overflow-y-auto border-t p-4">
        <Description post={post} />
        <Comments />
      </section>
      <hr className="bg-skin-border h-px w-full border-0" />
      <SomeActions
        isSaved={post.isSaved}
        postId={post.id}
        likePost={likePost}
        isLiked={optimistic.isLiked}
      />
      <Likes sumLikes={optimistic.sumLikes} />
      <PostDate post={post} />
      <CommentForm post={post} />
    </div>
  );
};

export default PostExpanded;
