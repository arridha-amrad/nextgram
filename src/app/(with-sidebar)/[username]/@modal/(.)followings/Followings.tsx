"use client";

import ModalUsers from "@/components/ModalUsers";
import { TFollowing } from "@/lib/drizzle/queries/users/fetchUserFollowings";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  users: TFollowing[];
  userId: string;
};

const Followings = ({ users, userId }: Props) => {
  const [open, setOpen] = useState(false);
  const { username } = useParams();

  const router = useRouter();
  const pathname = usePathname();
  const path = `/${username}/followings`;

  useEffect(() => {
    if (pathname === path) {
      setOpen(true);
    } else {
      setOpen(false);
    }
    // eslint-disable-next-line
  }, [pathname]);

  const handleClose = () => {
    setOpen(false);
    router.back();
  };

  return (
    <ModalUsers
      isLoading={false}
      open={open}
      title="Followings"
      userId={userId}
      users={users}
      handleClose={handleClose}
    />
  );
};

export default Followings;
