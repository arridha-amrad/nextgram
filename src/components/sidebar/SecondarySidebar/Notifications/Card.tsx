"use client";

import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";
import Spinner from "@/components/Spinner";
import { TNotification } from "@/lib/drizzle/queries/users/fetchUserNotifications";
import { page } from "@/lib/pages";
import { cn, rgbDataURL } from "@/lib/utils";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState, useTransition } from "react";
import { acceptFollow, declineFollow } from "./action";
import { useTranslations } from "next-intl";

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
    id,
    actorId,
  },
}: Props) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    setTimeAgo(formatDistanceToNowStrict(createdAt));
  }, [createdAt]);

  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [isShowNotif, setIsShowNotif] = useState(true);
  const [isFollowAccepted, setIsFollowAccepted] = useState(false);

  const handleDeclineFollowRequest = async () => {
    setIsShowNotif(false);
    await declineFollow({ notificationId: id });
  };
  const handleAcceptFollowRequest = () => {
    startTransition(async () => {
      await acceptFollow({ notificationId: id, userRequestId: actorId });
      setIsFollowAccepted(true);
    });
  };

  const t = useTranslations("Notification");

  let content = <></>;

  switch (type) {
    case "like":
      if (postId && !commentId && !replyId) {
        content = (
          <div className="flex flex-1 flex-wrap items-center gap-x-1">
            <p className="font-medium">{actorUsername}</p>
            <p>{t("likeOnPost")}.</p>
            <p className="text-foreground/50 font-light">{timeAgo}</p>
          </div>
        );
      }
      if (postId && commentId && !replyId) {
        content = (
          <div className="flex flex-1 flex-wrap items-center gap-x-1">
            <p className="font-medium">{actorUsername}</p>
            <p>{t("likeOnComment")} :</p>
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
          <p>{t("commented")} :</p>
          <p>{commentData}</p>
          <p className="text-foreground/50 font-light">{timeAgo}</p>
        </div>
      );
      break;
    case "reply":
      content = (
        <div className="flex flex-1 flex-wrap items-center gap-x-1 pt-1">
          <p className="font-medium">{actorUsername}</p>
          <p>{t("commented")} :</p>
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
      break;
    case "follow":
      content = isShowNotif ? (
        <div className="flex flex-1 flex-wrap items-center gap-x-1 pt-1">
          <p>{actorUsername}</p>
          <p>{t("follow")}</p>
          {isFollowAccepted ? (
            <div className="my-2">
              <h3 className="text-skin-primary text-xs">{t("followAcc")}</h3>
            </div>
          ) : (
            <div className="my-2 flex items-center gap-2">
              <button
                onClick={handleDeclineFollowRequest}
                className="bg-bg-secondary flex h-[30px] w-[60px] items-center justify-center rounded text-xs"
              >
                {t("followBtnDecline")}
              </button>
              <button
                onClick={handleAcceptFollowRequest}
                className="text-skin-primary hover:bg-skin-primary hover:text-foreground flex h-[30px] w-[56px] items-center justify-center rounded text-xs outline-0 transition-colors duration-150 ease-in"
              >
                {t("followBtnAccept")}
              </button>
            </div>
          )}
        </div>
      ) : (
        <></>
      );
      break;
    case "save":
      content = (
        <div className="flex flex-1 flex-wrap items-center gap-x-1">
          <p className="font-medium">{actorUsername}</p>
          <p>{t("savePost")}.</p>
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
          router.push(page.postDetail(postId), { scroll: false });
        }
      }}
      className={cn(
        "hover:bg-foreground/5 relative flex cursor-pointer items-center gap-2 px-4 py-2 text-sm",
      )}
    >
      {isPending && (
        <div className="bg-background/50 absolute inset-0 z-[999] flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <AvatarWithStoryIndicator
        isStoryExists={false}
        isStoryWatched={false}
        size={44}
        avatarUrl={actorAvatar}
      />
      <div className="max-w-[250px] whitespace-break-spaces">{content}</div>
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
