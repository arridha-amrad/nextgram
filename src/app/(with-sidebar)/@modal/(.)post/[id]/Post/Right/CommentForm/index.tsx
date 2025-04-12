import { useFeedPosts } from "@/app/(with-sidebar)/(home)/store";
import MySpinner from "@/components/Spinner";
import { create as createComment } from "@/lib/actions/comment";
import { create as createReply } from "@/lib/actions/reply";
import { cn, showToast } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { usePostStore } from "../../store";
import Emoji from "./Emoji";

const CommentForm = () => {
  const post = usePostStore((store) => store.post);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [message, setMessage] = useState("");

  const pathname = usePathname();

  const addCommentToFeedPosts = useFeedPosts((store) => store.addComment);

  const replyTarget = usePostStore((store) => store.replyTarget);
  const setReplySetter = usePostStore((store) => store.setReplySetter);
  const isFocusToCommentForm = usePostStore(
    (store) => store.isFocusToCommentForm,
  );
  const toggleFocusToCommentForm = usePostStore(
    (store) => store.toggleFocusToCommentForm,
  );
  const addComment = usePostStore((store) => store.addComment);
  const addReply = usePostStore((store) => store.addReply);

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

  const inputRef = useRef<HTMLInputElement>(null);
  const cursorPositionRef = useRef<number>(0);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const handleCursorPosition = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const position = e.currentTarget.selectionStart;
    cursorPositionRef.current = position ?? 0;
  };

  const { execute: executeCreateComment, isPending: isPendingCreateComment } =
    useAction(createComment.bind(null, post?.id ?? "", pathname), {
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
            postId: post?.id ?? "",
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

  if (!post) return null;

  return (
    <fieldset disabled={isLoading}>
      <form
        ref={formRef}
        action={replyTarget ? executeCreateReply : executeCreateComment}
        className="relative flex h-full items-center overflow-hidden px-4"
      >
        <Emoji
          cursorPosition={cursorPositionRef}
          inputRef={inputRef}
          setText={setMessage}
        />
        <input
          autoFocus
          ref={inputRef}
          value={message}
          onBlur={toggleFocusToCommentForm}
          onChange={handleChange}
          name="message"
          type="text"
          placeholder="Add comment..."
          className="bg-background h-12 w-full flex-1 px-4 pr-10 text-sm outline-0"
          onClick={handleCursorPosition}
          onKeyUp={handleCursorPosition}
        />
        <div className="absolute top-1 right-1 bottom-1">
          <button
            disabled={message.length === 0}
            type="submit"
            className={cn(
              "bg-background h-full px-2 text-sm",
              message.length > 0 ? "text-skin-primary" : "text-foreground/20",
            )}
          >
            Post
          </button>
        </div>
        {isLoading && (
          <div className="bg-background/50 absolute inset-0 flex items-center justify-center">
            <MySpinner />
          </div>
        )}
      </form>
    </fieldset>
  );
};

export default CommentForm;
