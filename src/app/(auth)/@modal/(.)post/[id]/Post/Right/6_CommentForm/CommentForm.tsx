import MySpinner from "@/components/Spinner";
import { create as createComment } from "@/lib/actions/comment";
import { create as createReply } from "@/lib/actions/reply";
import { TPost } from "@/lib/drizzle/queries/posts/fetchPost";
import { cn, showToast } from "@/lib/utils";
import mergeRefs from "merge-refs";
import { useAction } from "next-safe-action/hooks";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCommentsStore } from "../../store";
import { useFeedPosts } from "@/app/(auth)/(home)/store";

type Props = {
  post: TPost;
};

const CommentForm = ({ post }: Props) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [message, setMessage] = useState("");

  const pathname = usePathname();

  const addCommentToFeedPosts = useFeedPosts((store) => store.addComment);

  const replyTarget = useCommentsStore((store) => store.replyTarget);
  const setReplySetter = useCommentsStore((store) => store.setReplySetter);
  const isFocusToCommentForm = useCommentsStore(
    (store) => store.isFocusToCommentForm,
  );
  const toggleFocusToCommentForm = useCommentsStore(
    (store) => store.toggleFocusToCommentForm,
  );
  const addComment = useCommentsStore((store) => store.addComment);
  const addReply = useCommentsStore((store) => store.addReply);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (replyTarget?.commentId) {
      setMessage(`@${replyTarget?.username} `);
      inputRef.current?.focus();
    }
  }, [replyTarget?.commentId]);

  useEffect(() => {
    if (isFocusToCommentForm) {
      inputRef.current?.focus();
    }
  }, [isFocusToCommentForm]);

  useEffect(() => {
    if (message === "") {
      setReplySetter(null);
    }
  }, [message]);

  const { execute: executeCreateComment, isPending: isPendingCreateComment } =
    useAction(createComment.bind(null, post.id, pathname), {
      onError({ error }) {
        if (error) {
          if (error.serverError) {
            showToast(error.serverError, "error");
          }
          if (error.validationErrors) {
            const err = error.validationErrors.message?._errors;
            if (err) {
              showToast(err[0], "error");
            }
          }
        }
      },
      onSuccess({ data }) {
        if (data) {
          addComment(data);
          addCommentToFeedPosts({
            body: data.message,
            id: data.id,
            isLiked: false,
            postId: post.id,
            username: data.username,
          });
        }
        formRef.current?.reset();
        setMessage("");
      },
    });

  const { execute: executeCreateReply, isPending: isPendingCreateReply } =
    useAction(createReply.bind(null, replyTarget?.commentId ?? "", pathname), {
      onError({ error }) {
        if (error) {
          if (error.serverError) {
            showToast(error.serverError, "error");
          }
          if (error.validationErrors) {
            const err = error.validationErrors.message?._errors;
            if (err) {
              showToast(err[0], "error");
            }
          }
        }
      },
      onSuccess({ data }) {
        if (data) {
          addReply(data);
        }
        formRef.current?.reset();
        setMessage("");
      },
    });

  const isLoading = isPendingCreateReply || isPendingCreateComment;

  return (
    <fieldset disabled={isLoading}>
      <form
        ref={formRef}
        action={replyTarget ? executeCreateReply : executeCreateComment}
        className="relative flex h-full items-center overflow-hidden"
      >
        <div className="relative flex h-full w-full items-center gap-2">
          {isLoading && (
            <div className="bg-background/80 absolute inset-0 flex items-center justify-center">
              <MySpinner />
            </div>
          )}
          <div className="flex-1 p-1">
            <input
              autoFocus
              ref={mergeRefs(inputRef)}
              value={message}
              onBlur={toggleFocusToCommentForm}
              onChange={(e) => setMessage(e.target.value)}
              name="message"
              type="text"
              placeholder="Add comment..."
              className="bg-background ring-skin-primary h-12 w-full flex-1 border-0 px-4 pr-16 text-sm outline-0 focus:ring-2"
            />
          </div>
          <div className="absolute top-1 right-1 bottom-1">
            <button
              disabled={message.length === 0}
              type="submit"
              className={cn(
                "bg-background h-full px-2 text-sm",
                message.length > 0
                  ? "text-skin-inverted font-semibold"
                  : "text-skin-muted/50",
              )}
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </fieldset>
  );
};

export default CommentForm;
