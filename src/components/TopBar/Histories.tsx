"use client";

import { Button } from "@headlessui/react";

import { usePathname } from "next/navigation";
import { removeAllSearchHistories } from "@/lib/actions/user";
import { TSearchUser } from "@/lib/drizzle/queries/users/fetchSearchHistories";
import UserCard from "@/components/sidebar/UserCard";

type Props = {
  users: TSearchUser[];
};

function Histories({ users }: Props) {
  const pathname = usePathname();
  const removeAll = async () => {
    await removeAllSearchHistories.bind(null, pathname)();
  };

  return (
    <>
      <div className="my-4 flex justify-between px-4">
        <h1 className="text-foreground font-medium">Recent</h1>
        <Button
          onClick={removeAll}
          className="text-skin-primary text-sm font-medium"
        >
          Clear all
        </Button>
      </div>
      <div className="w-full">
        {users.map((user) => (
          <UserCard isRemovable={true} key={user.id} user={user} />
        ))}
      </div>
    </>
  );
}

export default Histories;
