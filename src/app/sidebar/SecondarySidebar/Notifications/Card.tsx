"use client";

import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";
import { TNotification } from "@/lib/drizzle/queries/users/fetchUserNotifications";
import { page } from "@/lib/pages";
import { cn, rgbDataURL } from "@/lib/utils";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { HTMLAttributes, ReactNode, useEffect, useState } from "react";

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

  if (type === "like") {
    if (postId && !commentId && !replyId) {
      return (
        <NotificationCardContainer
          postId={postId}
          avatarUrl={actorAvatar}
          postImageUrl={postData ? postData[0].url : ""}
        >
          <div className="flex flex-1 flex-wrap items-center gap-x-1">
            <p className="font-medium">{actorUsername}</p>
            <p className="font-light">liked your post.</p>
            <p className="text-foreground/50 font-light">{timeAgo}</p>
          </div>
        </NotificationCardContainer>
      );
    }

    if (postId && commentId && !replyId) {
      return (
        <NotificationCardContainer
          postId={postId}
          avatarUrl={actorAvatar}
          postImageUrl={postData ? postData[0].url : ""}
        >
          <div className="flex flex-1 flex-wrap items-center gap-x-1">
            <p className="font-medium">{actorUsername}</p>
            <p className="font-light">liked your comment :</p>
            <p>{commentData}</p>
            <p className="text-foreground/50 font-light">{timeAgo}</p>
          </div>
        </NotificationCardContainer>
      );
    }
  }

  if (type === "comment") {
    return (
      <NotificationCardContainer
        postId={postId}
        avatarUrl={actorAvatar}
        postImageUrl={postData ? postData[0].url : ""}
      >
        <div className="flex flex-1 flex-wrap items-center gap-x-1">
          <p className="font-medium">{actorUsername}</p>
          <p className="font-light">commented :</p>
          <p>{commentData}</p>
          <p className="text-foreground/50 font-light">{timeAgo}</p>
        </div>
      </NotificationCardContainer>
    );
  }

  if (type === "reply") {
    return (
      <NotificationCardContainer
        postId={postId}
        avatarUrl={actorAvatar}
        postImageUrl={postData ? postData[0].url : ""}
      >
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
      </NotificationCardContainer>
    );
  }

  return null;
}

export default NotificationCard;

const NotificationCardContainer = ({
  postId,
  avatarUrl,
  children,
  postImageUrl,
  ...props
}: {
  postId: string;
  children: ReactNode;
  avatarUrl: string | null;
  postImageUrl: string;
} & HTMLAttributes<HTMLDivElement>) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(page.postDetail(postId))}
      className={cn(
        "hover:bg-foreground/5 flex cursor-pointer items-center gap-2 px-2 py-1 text-sm",
        props.className,
      )}
    >
      <AvatarWithStoryIndicator
        isStoryExists={false}
        isStoryWatched={false}
        size={44}
        avatarUrl={avatarUrl}
      />
      {children}
      <div className="size-[44px] shrink-0 overflow-hidden rounded-lg">
        <Image
          placeholder="blur"
          blurDataURL={rgbDataURL(60, 60, 60)}
          src={postImageUrl}
          alt="post data"
          width={100}
          height={100}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};
