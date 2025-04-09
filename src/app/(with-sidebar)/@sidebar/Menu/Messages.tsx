"use client";

import { useRouter } from "next/navigation";
import ButtonLink from "../ButtonLink";
import { MessengerFilledIcon, MessengerOutlinedIcon } from "../Icons";
import { page } from "@/lib/pages";

function MessagesLink() {
  const router = useRouter();
  return (
    <ButtonLink
      activeIcon={<MessengerFilledIcon />}
      icon={<MessengerOutlinedIcon />}
      callback={() => router.push(page.inbox)}
      activePath={page.inbox}
      label="Messages"
    />
  );
}

export default MessagesLink;
