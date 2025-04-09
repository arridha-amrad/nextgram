"use client";

import { useSidebarContext } from "../Context";
import UserCard from "../UserCard";

function Histories() {
  const { histories } = useSidebarContext();

  return (
    <>
      <div className="w-full space-y-4">
        {histories.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </>
  );
}

export default Histories;
