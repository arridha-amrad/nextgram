"use client";

import { Button } from "@headlessui/react";
import Image from "next/image";
import { CloseIcon } from "./Icons";
import { TSearchUser } from "@/lib/drizzle/queries/users/fetchSearchHistories";

type Props = {
  user: TSearchUser;
};

export default function UserCard({ user }: Props) {
  return (
    <div className="flex items-start gap-4">
      <div className="size-[44px]">
        <Image
          src={user.avatar ?? "/default.jpg"}
          alt="profile"
          width={100}
          height={100}
          className="size-full rounded-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h1 className="text-sm font-bold">{user.username}</h1>
        <h2 className="text-skin-muted text-sm">{user.name}</h2>
      </div>
      <Button className="self-center">
        <CloseIcon className="text-skin-muted size-5" />
      </Button>
    </div>
  );
}
