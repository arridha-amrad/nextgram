"use client";

import { useFeedPosts } from "../store";
import {
  likePost as likeFeedPost,
  savePost as savedFeedPost,
} from "@/lib/actions/post";
import { usePathname } from "next/navigation";
import { useFeedPostContext } from "./Context";
import { showToast } from "@/lib/utils";
import { useRouter } from "nextjs-toploader/app";
import { page } from "@/lib/pages";
import { HeartEmptyPostIcon, HeartRedPostIcon } from "@/icons/HeartIcon";
import CommentIcon from "@/icons/CommentIcon";
import ShareIcon from "@/icons/ShareIcon";
import { BookMarkFilledIcon, BookmarkIcon } from "@/icons/BookMarkIcon";

function Actions() {
  const pathname = usePathname();
  const { post } = useFeedPostContext();

  const like = useFeedPosts((store) => store.likePost);
  const likePost = async () => {
    if (!post) return;
    like(post.id);
    const result = await likeFeedPost.bind(null, pathname)({ postId: post.id });
    if (result?.serverError) {
      showToast(result.serverError, "error");
      like(post.id); // cancel previous like
    }
  };

  const bookMarkPost = useFeedPosts((store) => store.savePost);
  const savePost = async () => {
    if (!post) return;
    bookMarkPost(post.id);
    const result = await savedFeedPost.bind(
      null,
      pathname,
    )({ postId: post.id });
    if (result?.serverError) {
      showToast(result.serverError, "error");
      bookMarkPost(post.id);
    }
  };

  const router = useRouter();
  const navigateToPostDetail = () => {
    if (!post) return;
    router.push(page.postDetail(post.id), { scroll: false });
  };

  return (
    <section className="flex items-center justify-between py-2">
      <div className="flex items-center gap-4">
        <button onClick={likePost}>
          {post?.isLiked ? <HeartRedPostIcon /> : <HeartEmptyPostIcon />}
        </button>
        <button onClick={navigateToPostDetail} className="size-6">
          <CommentIcon />
        </button>
        <button className="size-6">
          <ShareIcon />
        </button>
      </div>
      <button onClick={savePost} className="size-6">
        {post?.isSaved ? <BookMarkFilledIcon /> : <BookmarkIcon />}
      </button>
    </section>
  );
}

export default Actions;
