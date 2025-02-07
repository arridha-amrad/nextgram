"use client";

import UserCardWithFollowButton from "@/components/UserCardWithFollowButton";
import { TFollowing } from "@/lib/drizzle/queries/users/fetchUserFollowings";
import { useSession } from "next-auth/react";
import { useState } from "react";

type Props = {
  users: TFollowing[];
};

const Followings = ({ users }: Props) => {
  const session = useSession();
  const [followings] = useState(users);
  return (
    <div className="w-sm">
      {followings.length > 0 ? (
        followings.map((user) => (
          <UserCardWithFollowButton
            sessionUserId={session?.data?.user.id ?? ""}
            key={user.id}
            user={user}
          />
        ))
      ) : (
        <div className="flex items-center justify-center py-4">
          <p className="text-skin-muted">You have followed no body</p>
        </div>
      )}
    </div>
  );
};

export default Followings;
