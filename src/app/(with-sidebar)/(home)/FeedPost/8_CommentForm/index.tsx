"use client";

import Spinner from "@/components/Spinner";
import { cn } from "@/lib/utils";
import { useAction } from "next-safe-action/hooks";
import { useTheme } from "next-themes";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { create } from "@/lib/actions/comment";
import { useFeedPosts } from "../../store";
import { usePathname } from "next/navigation";

type Props = {
  postId: string;
};

export default function FeedPostCommentForm({ postId }: Props) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [message, setMessage] = useState("");
  const { theme } = useTheme();
  const pathname = usePathname();

  const { addComment } = useFeedPosts();

  const action = create.bind(null, postId, pathname);
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
      <form action={execute} className="relative" ref={formRef}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name="message"
          type="text"
          className="bg-background placeholder:text-skin-muted focus:border-skin-base border-b-skin-border w-full flex-1 border-b px-0 py-2 pr-10 text-sm outline-0 transition-colors duration-200 ease-linear"
          placeholder="Add a comment..."
        />
        <div className="absolute top-0 right-0">
          <button
            disabled={!message}
            className={cn(
              "p-1 text-sm",
              !message
                ? "text-skin-muted"
                : "text-skin-inverted cursor-pointer font-semibold",
            )}
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </fieldset>
  );
}
