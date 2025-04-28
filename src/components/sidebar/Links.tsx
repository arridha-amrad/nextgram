"use client";

import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";
import { page } from "@/lib/pages";
import { useTranslations } from "next-intl";
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
    notifications,
  } = useSidebarContext();

  const totalNotifications = notifications.filter((n) => !n.isRead);

  const t = useTranslations("Sidebar");

  return (
    <div className="space-y-2">
      <ButtonLink
        activeIcon={<HomeFill />}
        icon={<HomeOutlinedIcon />}
        activePath="/"
        callback={() => router.push("/")}
        label={t("home")}
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
        label={t("search")}
      />
      <ButtonLink
        activeIcon={<ExploreFilledIcon />}
        icon={<ExploreOutlinedIcon />}
        callback={() => router.push(page.explore)}
        label={t("explore")}
      />
      <ButtonLink
        activeIcon={<ReelsFilledIcon />}
        icon={<ReelsOutlinedIcon />}
        callback={() => router.push(page.reels)}
        label={t("reels")}
      />
      <ButtonLink
        activeIcon={<MessengerFilledIcon />}
        icon={<MessengerOutlinedIcon />}
        callback={() => router.push(page.inbox)}
        activePath={page.inbox}
        label={t("messages")}
      />

      <div className="relative">
        {totalNotifications.length > 0 && (
          <div className="border-background absolute top-4 left-6 flex aspect-square w-[28px] -translate-y-1/2 items-center justify-center rounded-full border-2 bg-red-500 p-1 text-xs text-white">
            {totalNotifications.length}
          </div>
        )}
        <ButtonLink
          activeIcon={<NotificationsFilledIcon />}
          icon={<NotificationsOutlinedIcon />}
          callback={async () => {
            setNotificationsOpen((val) => !val);
            if (isSearchOpen) {
              setSearchOpen(false);
            }
          }}
          label={t("notifications")}
        />
      </div>

      <CreatePostProvider>
        <NewPostModal>
          <FormCreatePost />
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
        label={t("profile")}
        activePath={`/${username}`}
      />
    </div>
  );
}

export default Links;
