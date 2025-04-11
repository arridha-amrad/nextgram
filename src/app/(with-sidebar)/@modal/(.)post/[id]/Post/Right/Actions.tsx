import { savePost as sp } from "@/lib/actions/post";
import { showToast } from "@/lib/utils";

import { useFeedPosts } from "@/app/(with-sidebar)/(home)/store";
import { BookmarkIcon, BookMarkFilledIcon } from "@/icons/BookMarkIcon";
import CommentIcon from "@/icons/CommentIcon";
import { HeartEmptyPostIcon, HeartRedPostIcon } from "@/icons/HeartIcon";
import { likePost as lp } from "@/lib/actions/post";
import { usePathname } from "next/navigation";
import { usePostStore } from "../store";
import ShareIcon from "@/icons/ShareIcon";

function SomeActions() {
  const post = usePostStore((store) => store.post);
  const likeDetailedPost = usePostStore((store) => store.likePost);
  const toggle = usePostStore((store) => store.toggleFocusToCommentForm);
  const bookMarkFeedPost = useFeedPosts((store) => store.savePost);
  const bookMarkPost = usePostStore((store) => store.bookMarkPost);

  const pathname = usePathname();

  const savePost = async () => {
    if (!post) return;
    bookMarkFeedPost(post.id);
    bookMarkPost();
    const result = await sp.bind(null, pathname)({ postId: post.id });
    if (result?.serverError) {
      showToast(result.serverError, "error");
      bookMarkFeedPost(post.id);
      bookMarkPost();
    }
    if (result?.data) {
      showToast(result.data, "success");
    }
  };

  const likeFeedPost = useFeedPosts((store) => store.likePost);
  const likePost = async () => {
    if (!post) return;
    likeFeedPost(post.id);
    likeDetailedPost();
    const result = await lp.bind(null, pathname)({ postId: post.id });
    if (result?.serverError) {
      showToast(result.serverError, "error");

      likeFeedPost(post.id);
      likeDetailedPost();
      // if error undo previous like
    }
  };

  if (!post) return null;

  return (
    <div className="flex h-[55px] items-center px-4">
      <div className="flex-1 space-x-4">
        <button type="button" onClick={likePost}>
          {post.isLiked ? <HeartRedPostIcon /> : <HeartEmptyPostIcon />}
        </button>
        <button type="button" onClick={toggle}>
          <CommentIcon />
        </button>
        <button type="button" onClick={() => {}}>
          <ShareIcon />
        </button>
      </div>
      <button type="button" onClick={savePost}>
        {post.isSaved ? <BookMarkFilledIcon /> : <BookmarkIcon />}
      </button>
    </div>
  );
}

export default SomeActions;
