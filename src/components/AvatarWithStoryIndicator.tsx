import { cn } from "@/lib/utils";
import Avatar from "./Avatar";
import { HTMLAttributes } from "react";

type Props = {
  isStoryExists: boolean;
  isStoryWatched: boolean;
  avatarUrl?: string | null;
  size: 24 | 32 | 44 | 56 | 77 | 150;
} & HTMLAttributes<HTMLDivElement>;

function AvatarWithStoryIndicator({
  avatarUrl,
  size,
  isStoryExists,
  isStoryWatched,
  ...props
}: Props) {
  return (
    <div className="relative flex size-max shrink-0 items-center justify-center p-0.5">
      {isStoryExists ? (
        isStoryWatched ? (
          <div className="bg-bg-secondary absolute inset-0 size-full rounded-full" />
        ) : (
          <div className="absolute inset-0 size-full rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600" />
        )
      ) : (
        <div />
      )}
      <div
        className={cn(
          "bg-background relative shrink-0 cursor-pointer rounded-full",
          isStoryExists ? (size === 150 ? "p-1.5" : "p-[3px]") : "",
          props.className,
        )}
      >
        <Avatar
          style={{ width: size, height: size }}
          url={avatarUrl ?? "/default.jpg"}
        />
      </div>
    </div>
  );
}

export default AvatarWithStoryIndicator;
