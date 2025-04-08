"use client";

import { useFeedPosts } from "../store";
import {
  likePost as likeFeedPost,
  savePost as savedFeedPost,
} from "@/lib/actions/post";
import { usePathname } from "next/navigation";
import { useFeedPostContext } from "./Context";
import { showToast } from "@/lib/utils";

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
    if (result?.data) {
      showToast(result.data, "success");
    }
  };

  return (
    <section className="flex items-center justify-between py-2">
      <div className="flex items-center gap-4">
        <button onClick={likePost} className="size-6">
          {post?.isLiked ? (
            <svg
              className="fill-rose-600"
              aria-label="Unlike"
              fill="currentColor"
              height="24"
              role="img"
              viewBox="0 0 48 48"
              width="24"
            >
              <title>Unlike</title>
              <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
            </svg>
          ) : (
            <svg
              aria-label="Suka"
              fill="currentColor"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <title>Like</title>
              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
            </svg>
          )}
        </button>
        <button className="size-6">
          <svg
            aria-label="Komentari"
            fill="currentColor"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <title>Komentari</title>
            <path
              d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>
        </button>
        <button className="size-6">
          <svg
            aria-label="Bagikan"
            fill="currentColor"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <title>Bagikan</title>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="22"
              x2="9.218"
              y1="3"
              y2="10.083"
            ></line>
            <polygon
              fill="none"
              points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
              stroke="currentColor"
              strokeLinejoin="round"
              strokeWidth="2"
            ></polygon>
          </svg>
        </button>
      </div>
      <button onClick={savePost} className="size-6">
        <svg
          aria-label="Simpan"
          fill="currentColor"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <title>Simpan</title>
          <polygon
            fill="none"
            points="20 21 12 13.44 4 21 4 3 20 3 20 21"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          ></polygon>
        </svg>
      </button>
    </section>
  );
}

export default Actions;
