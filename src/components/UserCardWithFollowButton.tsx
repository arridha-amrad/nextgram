"use client";

import { follow as fl } from "@/lib/actions/follow";
import { TFollow } from "@/lib/drizzle/queries/users/fetchUserFollowers";
import { cn, showToast } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AvatarWithStoryIndicator from "./AvatarWithStoryIndicator";

type Props = {
  user: TFollow;
  sessionUserId: string;
};

const UserCardWithFollowButton = ({
  user: { avatar, id, isFollow: isF, name, username },
  sessionUserId,
}: Props) => {
  const [isFollow, setIsFollow] = useState(isF);
  const pathname = usePathname();

  const follow = async () => {
    setIsFollow((val) => !val);
    const result = await fl.bind(
      null,
      pathname,
    )({
      targetId: id,
    });
    if (result?.serverError) {
      showToast("something went wrong", "error");
    }
  };
  return (
    <div className="flex w-full items-center justify-between px-4 py-1">
      <div className="flex items-center justify-start gap-3">
        <AvatarWithStoryIndicator
          isStoryExists={false}
          isStoryWatched
          size={44}
          avatarUrl={avatar}
          className="bg-bg-secondary"
        />
        <div className="max-w-[150px] overflow-hidden text-sm">
          <Link
            href={`/${username}`}
            className="overflow-hidden font-semibold text-ellipsis whitespace-pre-line"
          >
            {username}
          </Link>
          <p className="text-skin-muted line-clamp-1">{name}</p>
        </div>
      </div>
      {sessionUserId !== id && (
        <button
          onClick={follow}
          className={cn(
            "w-28 rounded-lg py-1.5 text-sm text-white",
            isFollow ? "bg-foreground/20" : "bg-skin-primary",
          )}
        >
          {isFollow ? "Following" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default UserCardWithFollowButton;
