"use client";

import Avatar from "@/components/Avatar";
import { TFollow } from "@/lib/drizzle/queries/users/fetchUserFollowers";
import { follow as fl } from "@/lib/actions/follow";
import { cn, showToast } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
      followId: id,
    });
    if (result?.serverError) {
      showToast("something went wrong", "error");
    }
  };
  return (
    <div className="flex w-full items-center justify-between px-4 py-3">
      <div className="flex items-start justify-start gap-3">
        <Avatar url={avatar} />
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
            "border-skin-border w-28 rounded-md py-1 text-sm font-semibold",
            isFollow ? "text-skin-muted border" : "bg-skin-primary text-white",
          )}
        >
          {isFollow ? "following" : "follow"}
        </button>
      )}
    </div>
  );
};

export default UserCardWithFollowButton;
