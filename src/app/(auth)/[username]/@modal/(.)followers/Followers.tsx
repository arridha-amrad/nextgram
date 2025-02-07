"use client";

import UserCardWithFollowButton from "@/components/UserCardWithFollowButton";
import { TFollow } from "@/lib/drizzle/queries/users/fetchUserFollowers";
import { useSession } from "next-auth/react";
import { useState } from "react";

type Props = {
  users: TFollow[];
};

const Followers = ({ users }: Props) => {
  const session = useSession();
  const [followers] = useState(users);
  return (
    <div className="w-sm">
      {followers.length > 0 ? (
        followers.map((user) => (
          <UserCardWithFollowButton
            sessionUserId={session?.data?.user.id ?? ""}
            key={user.id}
            user={user}
          />
        ))
      ) : (
        <div className="flex items-center justify-center py-4">
          <p className="text-skin-muted">You have no followers</p>
        </div>
      )}
    </div>
  );
};

export default Followers;
