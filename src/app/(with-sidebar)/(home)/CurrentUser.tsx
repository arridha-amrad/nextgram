"use client";

import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";
import { Session } from "next-auth";
import { useTranslations } from "next-intl";
import Link from "next/link";

type Props = {
  user: Session["user"];
};

export default function CurrentUser({ user }: Props) {
  const { image, name, username } = user;
  const t = useTranslations("CurrentUser");
  return (
    <div className="flex w-full items-center gap-2 px-4 py-3">
      <div className="flex flex-1 basis-0 items-center justify-start gap-3">
        <AvatarWithStoryIndicator
          isStoryExists={false}
          isStoryWatched={false}
          size={44}
          avatarUrl={image}
        />
        <div className="max-w-[150px] overflow-hidden text-sm">
          <h1 className="overflow-hidden font-semibold text-ellipsis whitespace-pre-line">
            {username}
          </h1>
          <p className="text-foreground/70 line-clamp-1">{name}</p>
        </div>
      </div>
      <Link
        className="text-skin-primary text-sm font-medium"
        href={`/${username}`}
      >
        {t("visit")}
      </Link>
    </div>
  );
}
