"use client";

import ButtonLink from "../ButtonLink";
import { useSidebarContext } from "../Context";
import { NotificationsFilledIcon, NotificationsOutlinedIcon } from "../Icons";

function NotificationLink() {
  const { isSearchOpen, setSearchOpen, setNotificationsOpen } =
    useSidebarContext();
  return (
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
  );
}

export default NotificationLink;
