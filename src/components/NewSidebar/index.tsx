"use client";

import { cn } from "@/lib/utils";
import { useSidebarContext } from "./Context";

import {
  DefaultAvatar,
  ExploreFilledIcon,
  ExploreOutlinedIcon,
  HomeFill,
  HomeOutlinedIcon,
  IGLogo,
  Logo,
  MessengerFilledIcon,
  MessengerOutlinedIcon,
  NewPostIcon,
  NotificationsFilledIcon,
  NotificationsOutlinedIcon,
  ReelsFilledIcon,
  ReelsOutlinedIcon,
  SearchFilledIcon,
  SearchOutlinedIcon,
  ThreadIcon,
} from "./Icons";
import SecondarySidebar from "./SecondarySidebar";

import { page } from "@/lib/pages";
import { autoUpdate, offset, shift, useFloating } from "@floating-ui/react";
import { usePathname, useRouter } from "next/navigation";
import ButtonLink from "./ButtonLink";
import Options from "./Options";
import useClickOutside from "@/hooks/useClickOutside";

type Props = {
  username: string;
  avatarUrl: string;
};

export default function Sidebar({ avatarUrl, username }: Props) {
  const {
    isSmallSidebar,
    isSearchOpen,
    isNotificationsOpen,
    setSmallSidebar,
    setSearchOpen,
    setNotificationsOpen,
    closeSecondarySidebar,
  } = useSidebarContext();

  const router = useRouter();

  const { refs, floatingStyles } = useFloating({
    placement: "right-end",
    strategy: "fixed",
    middleware: [offset(5), shift()],
    whileElementsMounted: autoUpdate,
  });

  const pathname = usePathname();

  const clickOutsideRef = useClickOutside(() => {
    closeSecondarySidebar();
  });

  const isAplliedSmallSidebar = isSmallSidebar || pathname === page.inbox;

  return (
    <div
      ref={clickOutsideRef}
      className={cn(
        "sticky top-0 hidden h-screen md:block",
        pathname === page.inbox ? "w-fit" : "w-fit lg:w-72",
      )}
    >
      <aside ref={refs.setReference} className={cn("min-h-screen w-fit")}>
        <SecondarySidebar
          setFloating={refs.setFloating}
          floatingStyles={floatingStyles}
        />
        <div className="flex h-screen w-fit flex-col overflow-y-auto px-1">
          <InstagramLogo isAppliedSmallSidebar={isAplliedSmallSidebar} />
          <div className="mb-2 flex-1">
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
                activeIcon={<DefaultAvatar url={avatarUrl} />}
                icon={<DefaultAvatar url={avatarUrl} />}
                callback={() => router.push(`/${username}`)}
                label="Profile"
              />
            </div>
          </div>
          <div className="mb-8 space-y-2">
            <ButtonLink
              activeIcon={<ThreadIcon />}
              icon={<ThreadIcon />}
              callback={() => setSmallSidebar((val) => !val)}
              label="Threads"
            />
            <Options />
          </div>
        </div>
      </aside>
    </div>
  );
}

const InstagramLogo = ({
  isAppliedSmallSidebar,
}: {
  isAppliedSmallSidebar: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex h-25 items-center",
        isAppliedSmallSidebar ? "aspect-square w-12 justify-center" : "px-3",
      )}
    >
      {isAppliedSmallSidebar ? (
        <IGLogo />
      ) : (
        <>
          <div className="block lg:hidden">
            <IGLogo />
          </div>
          <div className="hidden lg:block">
            <Logo />
          </div>
        </>
      )}
    </div>
  );
};
