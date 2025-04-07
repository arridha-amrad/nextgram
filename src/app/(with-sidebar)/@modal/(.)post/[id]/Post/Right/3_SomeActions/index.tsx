import { useFeedPosts } from "@/app/(auth)/(home)/store";
import ButtonLike from "@/components/ButtonLike";
import { savePost as sp } from "@/lib/actions/post";
import { showToast } from "@/lib/utils";
import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
import BookmarkFilledIcon from "@heroicons/react/24/solid/BookmarkIcon";
import { usePathname } from "next/navigation";
import { useCommentsStore } from "../../store";
import { useOptimistic, useState, useTransition } from "react";

type Props = {
  likePost: VoidFunction;
  isLiked: boolean;
  isSaved: boolean;
  postId: string;
};

function SomeActions({ likePost, isLiked, postId, isSaved }: Props) {
  const toggleFocusToCommentForm = useCommentsStore(
    (store) => store.toggleFocusToCommentForm,
  );
  const bookMarkPost = useFeedPosts((store) => store.savePost);
  const pathname = usePathname();

  const [saved, setSaved] = useState(isSaved);
  const [optimisticSaved, setOptimisticSaved] = useOptimistic(saved);
  const [_, startTransition] = useTransition();

  const savePost = async () => {
    startTransition(async () => {
      setOptimisticSaved((val) => !val);
      const result = await sp.bind(null, pathname)({ postId });
      if (result?.serverError) {
        showToast(result.serverError, "error");
        bookMarkPost(postId);
      }
      if (result?.data) {
        setSaved((val) => !val);
        bookMarkPost(postId);
        showToast(result.data, "success");
      }
    });
  };

  return (
    <div className="flex h-[60px] items-center px-4">
      <div className="flex-1 space-x-4">
        <ButtonLike callback={likePost} isLike={isLiked} size="normal" />
        <button onClick={toggleFocusToCommentForm}>
          <ChatBubbleOvalLeftIcon className="aspect-square w-7 -scale-x-100" />
        </button>
      </div>
      <div className="pt-0.5">
        <button onClick={savePost}>
          {optimisticSaved ? (
            <BookmarkFilledIcon className="aspect-square w-7" />
          ) : (
            <BookmarkIcon className="aspect-square w-7" />
          )}
        </button>
      </div>
    </div>
  );
}

export default SomeActions;
