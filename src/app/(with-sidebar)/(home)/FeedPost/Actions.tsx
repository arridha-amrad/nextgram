"use client";

import { likePost as likeFeedPost } from "@/lib/actions/post";
import { usePathname } from "next/navigation";
import { useFeedPostContext } from "./Context";
import { showToast } from "@/lib/utils";
import { useRouter } from "nextjs-toploader/app";
import { page } from "@/lib/pages";
import { HeartEmptyPostIcon, HeartRedPostIcon } from "@/icons/HeartIcon";
import CommentIcon from "@/icons/CommentIcon";
import ShareIcon from "@/icons/ShareIcon";
import { BookMarkFilledIcon, BookmarkIcon } from "@/icons/BookMarkIcon";
import { bookmarkFeedPost } from "@/handlers/post";
import { useFeedPostStore } from "@/lib/stores/feedPostStore";

function Actions() {
  const pathname = usePathname();
  const { post } = useFeedPostContext();

  const like = useFeedPostStore((store) => store.likePost);
  const likePost = async () => {
    if (!post) return;
    like(post.id);
    const result = await likeFeedPost.bind(null, pathname)({ postId: post.id });
    if (result?.serverError) {
      showToast(result.serverError, "error");
      like(post.id); // cancel previous like
    }
  };

  const bookMarkPost = useFeedPostStore((store) => store.savePost);

  const router = useRouter();

  return (
    <section className="flex items-center justify-between px-2 py-2">
      <div className="flex items-center gap-4">
        <button onClick={likePost}>
          {post?.isLiked ? <HeartRedPostIcon /> : <HeartEmptyPostIcon />}
        </button>
        <button
          onClick={() => {
            if (!post) return;
            router.push(page.postDetail(post.id), { scroll: false });
          }}
          className="size-6"
        >
          <CommentIcon />
        </button>
        <button className="size-6">
          <ShareIcon />
        </button>
      </div>
      <button
        onClick={async () => {
          if (!post) return;
          await bookmarkFeedPost(post.id, pathname, () =>
            bookMarkPost(post.id),
          );
        }}
        className="size-6"
      >
        {post?.isSaved ? <BookMarkFilledIcon /> : <BookmarkIcon />}
      </button>
    </section>
  );
}

export default Actions;
