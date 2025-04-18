"use client";

import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";
import { TNotification } from "@/lib/drizzle/queries/users/fetchUserNotifications";
import { rgbDataURL } from "@/lib/utils";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  notification: TNotification;
};

function NotificationCard({ notification }: Props) {
  const { postId, commentId } = notification;
  const [timeAgo, setTimeAgo] = useState("");

  let typeMessage = "";
  switch (notification.type) {
    case "comment":
      typeMessage = "commented";
      break;
    case "follow":
      typeMessage = "follow request";
      break;
    case "like":
      typeMessage = `like your ${postId ? "post" : commentId ? "comment" : "reply"}`;
      break;
    case "reply":
      typeMessage = "replied";
      break;
    case "save":
      typeMessage = "saved";
      break;
    default:
      break;
  }

  useEffect(() => {
    setTimeAgo(formatDistanceToNowStrict(notification.createdAt));
  }, [notification.createdAt]);

  const postImage = notification.postData && notification.postData[0].url;
  const commentData = notification.commentData;
  const replyData = notification.replyData;

  return (
    <div className="flex items-center gap-2 text-sm">
      <AvatarWithStoryIndicator
        isStoryExists
        isStoryWatched
        size={44}
        avatarUrl={notification.actorAvatar}
      />
      <div className="flex-1 gap-2">
        <span className="line-clamp-1">
          <span className="font-medium">{notification.actorUsername}</span>
          <span className="font-light">&nbsp;{typeMessage}.</span>&nbsp;
        </span>
        <p className="text-foreground/50 text-xs font-light">{timeAgo}</p>
      </div>
      {postImage && (
        <div className="size-[44px] shrink-0 overflow-hidden rounded-lg">
          <Image
            placeholder="blur"
            blurDataURL={rgbDataURL(60, 60, 60)}
            src={postImage}
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
