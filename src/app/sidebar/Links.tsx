"use client";

import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";
import { page } from "@/lib/pages";
import { useRouter } from "nextjs-toploader/app";
import ButtonLink from "./ButtonLink";
import { useSidebarContext } from "./Context";
import {
  ExploreFilledIcon,
  ExploreOutlinedIcon,
  HomeFill,
  HomeOutlinedIcon,
  MessengerFilledIcon,
  MessengerOutlinedIcon,
  NotificationsFilledIcon,
  NotificationsOutlinedIcon,
  ReelsFilledIcon,
  ReelsOutlinedIcon,
  SearchFilledIcon,
  SearchOutlinedIcon,
} from "./Icons";
import NewPostModal from "./ModalCreatePost";
import { CreatePostProvider } from "./ModalCreatePost/Context";
import FormCreatePost from "./ModalCreatePost/FormCreatePost";

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

      <CreatePostProvider>
        <NewPostModal>
          <FormCreatePost username={username} />
        </NewPostModal>
      </CreatePostProvider>

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
