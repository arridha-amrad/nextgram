"use client";

import MySpinner from "@/components/Spinner";
import { loadMoreComments } from "@/lib/actions/comment";
import { showToast } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import { useTransition } from "react";
import { usePostStore } from "../../store";
import Comment from "./Comment";

const Comments = () => {
  const comments = usePostStore((store) => store.comments);
  const hasMore = usePostStore((store) => store.hasMore);
  const addComments = usePostStore((store) => store.addComments);
  const cDate = usePostStore((store) => store.cDate);

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
      <div className="w-full space-y-2">
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>

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
