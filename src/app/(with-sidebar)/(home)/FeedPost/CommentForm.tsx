"use client";

import Spinner from "@/components/Spinner";
import { cn } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";
import { useTheme } from "next-themes";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { create } from "@/lib/actions/comment";
import { useFeedPosts } from "../store";
import { usePathname } from "next/navigation";
import Emoji from "./Emoji";
import { useFeedPostContext } from "./Context";

export default function FeedPostCommentForm() {
  const { post } = useFeedPostContext();

  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cursorPositionRef = useRef<number>(0);

  // eslint-disable-next-line
  const handleEmojiSelect = (emoji: any) => {
    const cursorPos = cursorPositionRef.current;
    const currentText = message;
    const newText =
      currentText.slice(0, cursorPos) +
      emoji.native +
      currentText.slice(cursorPos);
    setMessage(newText);
    // Move cursor after the inserted emoji
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.selectionStart = inputRef.current.selectionEnd =
          cursorPos + emoji.native.length;
        inputRef.current.focus();
      }
    }, 10);
  };

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

  return (
    <fieldset className="relative" disabled={false}>
      {isPending && (
        <div className="bg-background/70 absolute inset-0 z-50 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <form
        action={execute}
        className="border-foreground/20 relative h-full w-full border-b pb-4"
        ref={formRef}
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name="message"
          type="text"
          className="h-full w-full py-2 pr-16 text-sm outline-0"
          placeholder="Add a comment..."
          onClick={(e) => {
            cursorPositionRef.current = e.currentTarget.selectionStart ?? 0;
          }}
          onKeyUp={(e) => {
            cursorPositionRef.current = e.currentTarget.selectionStart ?? 0;
          }}
        />
        <div className="absolute top-0 right-0 flex h-full w-max items-center gap-2">
          {message && (
            <button
              type="submit"
              className="text-skin-primary text-sm font-medium"
            >
              Send
            </button>
          )}
          <Emoji onEmojiSelect={handleEmojiSelect} />
        </div>
      </form>
    </fieldset>
  );
}
