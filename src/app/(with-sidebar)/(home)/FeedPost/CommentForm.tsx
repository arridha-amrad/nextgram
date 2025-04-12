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
  const inputRef = useRef<HTMLInputElement>(null);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleCursorPosition = (e: React.SyntheticEvent<HTMLInputElement>) => {
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
        className="border-foreground/20 -b relative h-full w-full border-b pb-4"
        ref={formRef}
      >
        <input
          ref={inputRef}
          value={message}
          onChange={handleChange}
          name="message"
          type="text"
          className="h-full w-full py-2 pr-16 text-sm outline-0"
          placeholder="Add a comment..."
          onClick={handleCursorPosition}
          onKeyUp={handleCursorPosition}
        />
        <div className="absolute top-0 right-2 flex h-full w-max items-start gap-2">
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
