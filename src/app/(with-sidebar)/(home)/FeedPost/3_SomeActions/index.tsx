import ButtonLike from "@/components/ButtonLike";
import {
  likePost as likeFeedPost,
  savePost as savedFeedPost,
} from "@/lib/actions/post";
import { TFeedPost } from "@/lib/drizzle/queries/posts/fetchFeedPosts";
import { showToast } from "@/lib/utils";
import BookmarkIcon from "@heroicons/react/24/outline/BookmarkIcon";
import BookmarkFilledIcon from "@heroicons/react/24/solid/BookmarkIcon";
import ChatBubbleOvalLeftIcon from "@heroicons/react/24/outline/ChatBubbleOvalLeftIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFeedPosts } from "../../store";

type Props = {
  post: TFeedPost;
};

export default function FeedPostSomeActions({ post }: Props) {
  const pathname = usePathname();
  const like = useFeedPosts((store) => store.likePost);
  const bookMarkPost = useFeedPosts((store) => store.savePost);

  const likePost = async () => {
    like(post.id);
    const result = await likeFeedPost.bind(null, pathname)({ postId: post.id });
    if (result?.serverError) {
      showToast(result.serverError, "error");
      like(post.id); // cancel previous like
    }
  };

  const savePost = async () => {
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
    <div className="flex w-full items-center">
      <div className="flex flex-1 items-center gap-4">
        <ButtonLike callback={likePost} isLike={post.isLiked} />
        <Link scroll={false} href={`/post/${post.id}`}>
          <ChatBubbleOvalLeftIcon className="block aspect-square w-7 -scale-x-100" />
        </Link>
      </div>
      <button onClick={savePost}>
        {post.isSaved ? (
          <BookmarkFilledIcon className="aspect-square w-7" />
        ) : (
          <BookmarkIcon className="aspect-square w-7" />
        )}
      </button>
    </div>
  );
}
