"use client";

import { TSuggestedUsers } from "@/lib/drizzle/queries/users/fetchSuggestedUsers";
import { use, useState } from "react";
import UserCard from "./UserCard";
import Link from "next/link";
import { useTranslations } from "next-intl";

type Props = {
  users: Promise<TSuggestedUsers[]>;
};

function Users({ users }: Props) {
  const initData = use(users);

  const [state] = useState<TSuggestedUsers[]>(initData);

  const t = useTranslations("SuggestedUsers");

  if (state.length === 0) return null;
  return (
    <div className="w-full space-y-4 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-skin-muted text-sm font-semibold">{t("title")}</h1>
        <Link href="/" className="text-skin-base text-sm font-medium">
          {t("seeAll")}
        </Link>
      </div>
      <div className="mt-2 space-y-2">
        {state.map((user) => (
          <UserCard user={user} key={user.id} />
        ))}
      </div>
    </div>
  );
}

export default Users;
