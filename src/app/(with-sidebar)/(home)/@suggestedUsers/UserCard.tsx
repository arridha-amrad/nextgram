"use client";

import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";
import { follow as fl } from "@/lib/actions/follow";
import { TSearchUser } from "@/lib/drizzle/queries/type";
import { cn, showToast } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Props = {
  user: TSearchUser;
};

const UserCard = ({ user: { name, username, avatar, id } }: Props) => {
  const pathname = usePathname();
  const [isFollow, setFollow] = useState(false);

  const follow = async () => {
    setFollow((val) => !val);
    try {
      const result = await fl.bind(
        null,
        pathname,
      )({
        targetId: id,
      });
      if (result?.serverError) {
        showToast(result.serverError, "error");
        setFollow((val) => !val);
      }
    } catch (err) {
      if (isRedirectError(err)) {
        return;
      }
      showToast("Something went wrong", "error");
    }
  };
  const t = useTranslations("SuggestedUsers");
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center justify-start gap-3">
        <AvatarWithStoryIndicator
          isStoryExists={false}
          isStoryWatched={false}
          size={44}
          avatarUrl={avatar}
        />
        <div className="max-w-[150px] overflow-hidden text-sm">
          <Link
            href={`/${username}`}
            className="overflow-hidden font-medium text-ellipsis whitespace-pre-line"
          >
            {username}
          </Link>
          <p className="text-foreground/70 line-clamp-1 text-xs">{name}</p>
        </div>
      </div>
      <button
        onClick={follow}
        className={cn(
          "text-sm font-medium",
          isFollow ? "text-foreground/70" : "text-skin-primary",
        )}
      >
        {isFollow ? t("unFollow") : t("follow")}
      </button>
    </div>
  );
};

export default UserCard;
