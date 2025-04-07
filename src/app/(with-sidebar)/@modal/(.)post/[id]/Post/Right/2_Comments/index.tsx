"use client";

import Comment from "./Comment";
import MySpinner from "@/components/Spinner";
import { loadMoreComments } from "@/lib/actions/comment";
import { useParams, usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { useCommentsStore } from "../../store";
import { showToast } from "@/lib/utils";

const Comments = () => {
  const comments = useCommentsStore((store) => store.comments);
  const hasMore = useCommentsStore((store) => store.hasMore);
  const addComments = useCommentsStore((store) => store.addComments);
  const cDate = useCommentsStore((store) => store.cDate);

  const { id } = useParams();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  const loadMore = () => {
    startTransition(async () => {
      const result = await loadMoreComments.bind(
        null,
        pathname,
      )({
        postId: id as string,
        date: new Date(cDate),
      });
      if (result?.serverError) {
        showToast(result.serverError, "error");
      }
      if (result?.data) {
        addComments(result.data);
      }
    });
  };

  return (
    <>
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}

      {comments.length > 0 && hasMore && (
        <button
          disabled={isPending}
          onClick={loadMore}
          className="border-skin-border text-skin-muted relative flex w-full items-center justify-center border py-2"
        >
          load more
          {isPending && (
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
