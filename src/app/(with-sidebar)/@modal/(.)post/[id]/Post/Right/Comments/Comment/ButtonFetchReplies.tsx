"use client";

import MySpinner from "@/components/Spinner";
import { loadMoreReplies } from "@/lib/actions/reply";
import { showToast } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { usePostStore, Comment } from "../../../store";

type Props = {
  comment: Comment;
  setIsShowReplies: Dispatch<SetStateAction<boolean>>;
  isShowReplies: boolean;
};

const ButtonFetchReplies = ({
  comment,
  isShowReplies,
  setIsShowReplies,
}: Props) => {
  const setReplies = usePostStore((store) => store.setReplies);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  const fetchReplies = async () => {
    startTransition(async () => {
      const result = await loadMoreReplies.bind(
        null,
        pathname,
      )({
        commentId: comment.id,
        page,
      });
      if (result?.serverError) {
        showToast(result.serverError, "error");
      }
      if (result?.data) {
        if (result.data.length < 5) {
          setHasMore(false);
        }
        setPage((val) => val + 1);
        setReplies(result.data);
      }
    });
  };

  // When there are more replies available to fetch
  if (hasMore && comment.sumReplies - comment.replies.length > 0) {
    return (
      <div className="relative flex items-center gap-4 py-3">
        <div className="bg-foreground/50 h-0.5 w-[30px]" />
        <button
          onClick={fetchReplies}
          disabled={isPending}
          type="submit"
          className="text-foreground/50 text-xs font-medium"
        >
          View {comment.sumReplies - comment.replies.length}{" "}
          {page > 1 && "more"} replies
        </button>
        {isPending && (
          <div className="bg-background/80 absolute inset-0 flex items-center justify-center">
            <MySpinner />
          </div>
        )}
      </div>
    );
  }

  // when there is no replies to fetch
  return (
    <div className="flex items-center gap-4 py-3">
      <div className="h-0.5 w-[30px] bg-gray-500" />
      {isShowReplies ? (
        <button
          onClick={() => setIsShowReplies(false)}
          className="text-skin-muted text-xs font-semibold"
        >
          Hide replies
        </button>
      ) : (
        <button
          onClick={() => setIsShowReplies(true)}
          className="text-skin-muted text-xs font-semibold"
        >
          View {comment.sumReplies} replies
        </button>
      )}
    </div>
  );
};

export default ButtonFetchReplies;
