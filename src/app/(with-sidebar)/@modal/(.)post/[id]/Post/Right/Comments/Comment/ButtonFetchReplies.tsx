"use client";

import MySpinner from "@/components/Spinner";
import { loadMoreReplies } from "@/lib/api/replies";
import {
  LIMIT_REPLIES,
  TReply,
} from "@/lib/drizzle/queries/replies/fetchReplies";
import { showToast } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";
import { Comment, usePostStore } from "../../../store";

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

  const [loading, setLoading] = useState(false);

  const fetchReplies = async () => {
    setLoading(true);
    try {
      const replies = (await loadMoreReplies({
        commentId: comment.id,
        page,
        postId: comment.postId,
      })) as TReply[];
      setPage((val) => (val += 1));
      if (replies.length < LIMIT_REPLIES) {
        setHasMore(false);
      }
      setReplies(replies);
    } catch (err) {
      console.log(err);
      showToast("Failed to fetch replies", "error");
    } finally {
      setLoading(false);
    }
  };

  // When there are more replies available to fetch
  if (hasMore && comment.sumReplies - comment.replies.length > 0) {
    return (
      <div className="relative flex items-center gap-4 py-3">
        <div className="bg-foreground/50 h-0.5 w-[30px]" />
        <button
          onClick={fetchReplies}
          disabled={loading}
          type="submit"
          className="text-foreground/50 text-xs font-medium"
        >
          View {comment.sumReplies - comment.replies.length}{" "}
          {page > 1 && "more"} replies
        </button>
        {loading && (
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
