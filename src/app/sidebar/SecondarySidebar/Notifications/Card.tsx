"use client";

import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";
import { TNotification } from "@/lib/drizzle/queries/users/fetchUserNotifications";
import { page } from "@/lib/pages";
import { cn, rgbDataURL } from "@/lib/utils";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";

type Props = {
  notification: TNotification;
};

function NotificationCard({
  notification: {
    actorAvatar,
    actorUsername,
    commentData,
    commentId,
    createdAt,
    postData,
    postId,
    replyData,
    replyId,
    type,
  },
}: Props) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    setTimeAgo(formatDistanceToNowStrict(createdAt));
  }, [createdAt]);

  const router = useRouter();

  let content = <></>;

  switch (type) {
    case "like":
      if (postId && !commentId && !replyId) {
        content = (
          <div className="flex flex-1 flex-wrap items-center gap-x-1">
            <p className="font-medium">{actorUsername}</p>
            <p className="font-light">liked your post.</p>
            <p className="text-foreground/50 font-light">{timeAgo}</p>
          </div>
        );
      }
      if (postId && commentId && !replyId) {
        content = (
          <div className="flex flex-1 flex-wrap items-center gap-x-1">
            <p className="font-medium">{actorUsername}</p>
            <p className="font-light">liked your comment :</p>
            <p>{commentData}</p>
            <p className="text-foreground/50 font-light">{timeAgo}</p>
          </div>
        );
      }
      break;
    case "comment":
      content = (
        <div className="flex flex-1 flex-wrap items-center gap-x-1">
          <p className="font-medium">{actorUsername}</p>
          <p className="font-light">commented :</p>
          <p>{commentData}</p>
          <p className="text-foreground/50 font-light">{timeAgo}</p>
        </div>
      );
      break;
    case "reply":
      content = (
        <div className="flex flex-1 flex-wrap items-center gap-x-1 pt-1">
          <p className="font-medium">{actorUsername}</p>
          <p className="font-light">commented :</p>
          <p className="space-x-1">
            {replyData?.split(" ").map((v, i) =>
              v.startsWith("@") ? (
                <Link
                  href={page.profile(v.slice(1))}
                  className="text-skin-primary"
                  key={i}
                >
                  {v}
                </Link>
              ) : (
                <span key={i}>&nbsp;{v}</span>
              ),
            )}
          </p>
          <p className="text-foreground/50 font-light">{timeAgo}</p>
        </div>
      );
    default:
      break;
  }

  return (
    <div
      onClick={() => {
        if (postId) {
          router.push(page.postDetail(postId));
        }
      }}
      className={cn(
        "hover:bg-foreground/5 flex cursor-pointer items-center gap-2 px-4 py-1 text-sm",
      )}
    >
      <AvatarWithStoryIndicator
        isStoryExists={false}
        isStoryWatched={false}
        size={44}
        avatarUrl={actorAvatar}
      />
      {content}
      {postData && (
        <div className="size-[44px] shrink-0 overflow-hidden rounded-lg">
          <Image
            placeholder="blur"
            blurDataURL={rgbDataURL(60, 60, 60)}
            src={postData ? postData[0].url : ""}
            alt="post data"
            width={100}
            height={100}
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </div>
  );
}

export default NotificationCard;
