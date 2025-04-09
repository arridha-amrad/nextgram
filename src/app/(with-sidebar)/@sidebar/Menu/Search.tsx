"use client";

import ButtonLink from "../ButtonLink";
import { useSidebarContext } from "../Context";
import { SearchOutlinedIcon, SearchFilledIcon } from "../Icons";

function SearchLink() {
  const { isNotificationsOpen, setSearchOpen, setNotificationsOpen } =
    useSidebarContext();
  return (
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
  );
}

export default SearchLink;
