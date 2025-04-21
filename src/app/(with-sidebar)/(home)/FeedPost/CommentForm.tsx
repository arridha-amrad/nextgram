"use client";

import Spinner from "@/components/Spinner";
import { create } from "@/lib/actions/comment";
import { useAction } from "next-safe-action/hooks";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useFeedPosts } from "../store";
import { useFeedPostContext } from "./Context";
import Emoji from "./Emoji";

export default function FeedPostCommentForm() {
  const { post } = useFeedPostContext();

  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const cursorPositionRef = useRef<number>(0);

  const formRef = useRef<HTMLFormElement | null>(null);
  const { theme } = useTheme();
  const pathname = usePathname();

  const { addComment } = useFeedPosts();

  const action = create.bind(null, post?.id ?? "", pathname);
  const { execute, isPending } = useAction(action, {
    onError: () => {
      toast.error("Something went wrong", { theme });
    },
    onSuccess: ({ data }) => {
      if (data) {
        addComment({
          body: data.message,
          id: data.id,
          isLiked: false,
          postId: data.postId,
          username: data.username,
        });
      }
      formRef.current?.reset();
      setMessage("");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleCursorPosition = (
    e: React.SyntheticEvent<HTMLTextAreaElement>,
  ) => {
    const position = e.currentTarget.selectionStart;
    cursorPositionRef.current = position ?? 0;
  };

  return (
    <fieldset className="relative" disabled={false}>
      {isPending && (
        <div className="bg-background/70 absolute inset-0 z-50 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <form
        action={execute}
        className="border-foreground/20 relative h-full w-full border-b"
        ref={formRef}
      >
        <textarea
          ref={inputRef}
          rows={2}
          value={message}
          onChange={handleChange}
          name="message"
          className="h-full w-full resize-none pt-2 pr-18 text-sm outline-0"
          placeholder="Add a comment..."
          onClick={handleCursorPosition}
          onKeyUp={handleCursorPosition}
        ></textarea>
        <div className="absolute top-1 right-0 flex h-full w-max items-start gap-2">
          {message && (
            <button
              type="submit"
              className="text-skin-primary pt-1 text-sm font-medium"
            >
              Send
            </button>
          )}
          <Emoji
            cursorPosition={cursorPositionRef}
            inputRef={inputRef}
            setText={setMessage}
          />
        </div>
      </form>
    </fieldset>
  );
}
