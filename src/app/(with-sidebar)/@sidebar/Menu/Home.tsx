"use client";

import { useRouter } from "next/navigation";
import ButtonLink from "../ButtonLink";
import { HomeFill, HomeOutlinedIcon } from "../Icons";

function HomeLink() {
  const router = useRouter();
  return (
    <ButtonLink
      activeIcon={<HomeFill />}
      icon={<HomeOutlinedIcon />}
      activePath="/"
      callback={() => router.push("/")}
      label="Home"
    />
  );
}

export default HomeLink;
