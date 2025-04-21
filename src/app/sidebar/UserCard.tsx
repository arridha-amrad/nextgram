"use client";

import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";
import {
  removeUserFromSearchHistory,
  saveUserToSearchHistory,
} from "@/lib/actions/user";
import { TSearchUser } from "@/lib/drizzle/queries/users/fetchSearchHistories";
import { page } from "@/lib/pages";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useTransition } from "react";

type Props = {
  user: TSearchUser;
  isRemovable: boolean;
};

export default function UserCard({ user, isRemovable }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const [, startTransition] = useTransition();

  const navigateToUserProfile = () => {
    startTransition(() => {
      saveUserToSearchHistory.bind(null, pathname)({ searchId: user.id });
      router.push(page.profile(user.username), { scroll: false });
    });
  };

  const remove = async () => {
    await removeUserFromSearchHistory.bind(
      null,
      pathname,
    )({ searchId: user.id });
  };

  return (
    <div
      onClick={navigateToUserProfile}
      className="hover:bg-foreground/5 flex cursor-pointer items-center gap-4 px-4 py-1"
    >
      <AvatarWithStoryIndicator
        isStoryExists={false}
        isStoryWatched
        size={44}
        avatarUrl={user.avatar}
      />
      <div className="flex-1">
        <h1 className="line-clamp-1 text-sm font-semibold">{user.username}</h1>
        <h2 className="text-foreground/70 line-clamp-1 text-sm">{user.name}</h2>
      </div>
      {isRemovable && (
        <button
          onClick={async (e) => {
            e.stopPropagation();
            await remove();
          }}
          title="close"
          className="text-foreground/70 self-center"
        >
          <svg
            aria-label="Close"
            fill="currentColor"
            height="16"
            role="img"
            viewBox="0 0 24 24"
            width="16"
          >
            <title>Close</title>
            <polyline
              fill="none"
              points="20.643 3.357 12 12 3.353 20.647"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            ></polyline>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              x1="20.649"
              x2="3.354"
              y1="20.649"
              y2="3.354"
            ></line>
          </svg>
        </button>
      )}
    </div>
  );
}
