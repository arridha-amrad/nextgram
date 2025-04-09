"use client";

import { useRouter } from "next/navigation";
import ButtonLink from "../ButtonLink";
import { ExploreFilledIcon, ExploreOutlinedIcon } from "../Icons";
import { page } from "@/lib/pages";

function ExploreLink() {
  const router = useRouter();
  return (
    <ButtonLink
      activeIcon={<ExploreFilledIcon />}
      icon={<ExploreOutlinedIcon />}
      callback={() => router.push(page.explore)}
      label="Explore"
    />
  );
}

export default ExploreLink;
