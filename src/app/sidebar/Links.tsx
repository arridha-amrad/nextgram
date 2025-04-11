"use client";

import { page } from "@/lib/pages";
import { useRouter } from "nextjs-toploader/app";
import ButtonLink from "./ButtonLink";
import { useSidebarContext } from "./Context";
import {
  DefaultAvatar,
  ExploreFilledIcon,
  ExploreOutlinedIcon,
  HomeFill,
  HomeOutlinedIcon,
  MessengerFilledIcon,
  MessengerOutlinedIcon,
  NewPostIcon,
  NotificationsFilledIcon,
  NotificationsOutlinedIcon,
  ReelsFilledIcon,
  ReelsOutlinedIcon,
  SearchFilledIcon,
  SearchOutlinedIcon,
} from "./Icons";
import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";

type Props = {
  username: string;
  avatar: string;
};

function Links({ avatar, username }: Props) {
  const router = useRouter();
  const {
    isNotificationsOpen,
    setSearchOpen,
    isSearchOpen,
    setNotificationsOpen,
    setSmallSidebar,
  } = useSidebarContext();

  return (
    <div className="space-y-2">
      <ButtonLink
        activeIcon={<HomeFill />}
        icon={<HomeOutlinedIcon />}
        activePath="/"
        callback={() => router.push("/")}
        label="Home"
      />
      <ButtonLink
        icon={<SearchOutlinedIcon />}
        activeIcon={<SearchFilledIcon />}
        callback={() => {
          if (isNotificationsOpen) {
            setNotificationsOpen(false);
          }
          setSearchOpen((val) => !val);
        }}
        label="Search"
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
        activeIcon={<MessengerFilledIcon />}
        icon={<MessengerOutlinedIcon />}
        callback={() => router.push(page.inbox)}
        activePath={page.inbox}
        label="Messages"
      />
      <ButtonLink
        activeIcon={<NotificationsFilledIcon />}
        icon={<NotificationsOutlinedIcon />}
        callback={() => {
          setNotificationsOpen((val) => !val);
          if (isSearchOpen) {
            setSearchOpen(false);
          }
        }}
        label="Notifications"
      />
      <ButtonLink
        activeIcon={<NewPostIcon />}
        icon={<NewPostIcon />}
        callback={() => setSmallSidebar((val) => !val)}
        label="New Post"
      />
      <ButtonLink
        icon={
          <AvatarWithStoryIndicator
            isStoryExists={false}
            isStoryWatched
            size={32}
            avatarUrl={avatar}
          />
        }
        callback={() => router.push(`/${username}`)}
        label="Profile"
        activePath={`/${username}`}
      />
    </div>
  );
}

export default Links;
