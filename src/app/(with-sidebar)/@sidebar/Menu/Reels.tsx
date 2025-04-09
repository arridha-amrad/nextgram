"use client";

import { useRouter } from "next/navigation";
import ButtonLink from "../ButtonLink";
import { ReelsFilledIcon, ReelsOutlinedIcon } from "../Icons";
import { page } from "@/lib/pages";

function ReelsLink() {
  const router = useRouter();
  return (
    <ButtonLink
      activeIcon={<ReelsFilledIcon />}
      icon={<ReelsOutlinedIcon />}
      callback={() => router.push(page.reels)}
      label="Reels"
    />
  );
}

export default ReelsLink;
