"use client";

import { useRouter } from "next/navigation";
import ButtonLink from "@/app/(with-sidebar)/@sidebar/ButtonLink";
import {
  DefaultAvatar,
  ExploreFilledIcon,
  ExploreOutlinedIcon,
  HomeFill,
  HomeOutlinedIcon,
  MessengerFilledIcon,
  MessengerOutlinedIcon,
  NewPostIcon,
  ReelsFilledIcon,
  ReelsOutlinedIcon,
} from "@/app/(with-sidebar)/@sidebar/Icons";
import { page } from "@/lib/pages";

type Props = {
  avatarUrl: string;
  username: string;
};

function BottomNavigationBar({ avatarUrl, username }: Props) {
  const router = useRouter();
  return (
    <div className="fixed inset-x-0 bottom-0 block md:hidden">
      <div className="bg-background border-foreground/20 relative flex h-13 items-center justify-evenly border-t">
        <ButtonLink
          activeIcon={<HomeFill />}
          icon={<HomeOutlinedIcon />}
          activePath="/"
          callback={() => router.push(page.home)}
          label="Home"
        />
        <ButtonLink
          activeIcon={<ExploreFilledIcon />}
          icon={<ExploreOutlinedIcon />}
          callback={() => router.push(page.explore)}
          label="Explore"
        />
        <ButtonLink
          activeIcon={<ReelsFilledIcon />}
          icon={<ReelsOutlinedIcon />}
          callback={() => router.push(page.reels)}
          label="Reels"
        />
        <ButtonLink
          activeIcon={<NewPostIcon />}
          icon={<NewPostIcon />}
          callback={() => {}}
          label="New Post"
        />
        <ButtonLink
          activeIcon={<MessengerFilledIcon />}
          icon={<MessengerOutlinedIcon />}
          callback={() => router.push(page.inbox)}
          activePath={page.inbox}
          label="Messages"
        />
        <ButtonLink
          activeIcon={<DefaultAvatar url={avatarUrl} />}
          icon={<DefaultAvatar url={avatarUrl} />}
          callback={() => router.push(`/${username}`)}
          label="Profile"
        />
      </div>
    </div>
  );
}

export default BottomNavigationBar;
