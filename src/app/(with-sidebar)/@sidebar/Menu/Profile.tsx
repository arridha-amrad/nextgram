"use client";

import router from "next/router";
import ButtonLink from "../ButtonLink";
import { DefaultAvatar } from "../Icons";

type Props = {
  username: string;
  avatar: string;
};

function Profile({ avatar, username }: Props) {
  return (
    <ButtonLink
      activeIcon={<DefaultAvatar url={avatar} />}
      icon={<DefaultAvatar url={avatar} />}
      callback={() => router.push(`/${username}`)}
      label="Profile"
    />
  );
}

export default Profile;
