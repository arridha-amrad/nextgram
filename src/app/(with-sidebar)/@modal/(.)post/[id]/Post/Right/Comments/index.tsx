"use client";

import MySpinner from "@/components/Spinner";
import { loadMoreComments } from "@/lib/api/comments";
import { showToast } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useState } from "react";
import { usePostStore } from "../../store";
import Comment from "./Comment";

const Comments = () => {
  const comments = usePostStore((store) => store.comments);
  const hasMoreComment = usePostStore((store) => store.hasMoreComment);
  const addComments = usePostStore((store) => store.addComments);
  const lastCommentDate = usePostStore((store) => store.lastCommentDate);

  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    try {
      const result = await loadMoreComments(id as string, lastCommentDate);
      addComments(result);
    } catch (err) {
      console.log(err);
      showToast("Failed to load more comments", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full space-y-2">
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>

      {comments.length > 0 && hasMoreComment && (
        <button
          disabled={loading}
          onClick={loadMore}
          className="border-skin-border text-skin-muted relative flex w-full items-center justify-center border py-2"
        >
          load more
          {loading && (
            <div className="bg-background/50 absolute inset-0 flex items-center justify-center">
              <MySpinner />
            </div>
          )}
        </button>
      )}
    </>
  );
};

export default Comments;
