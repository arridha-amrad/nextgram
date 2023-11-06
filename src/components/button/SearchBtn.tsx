"use client";

import { Button } from "@nextui-org/react";
import SearchSidebar from "../sidebar/SearchSidebar";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "@/utils/breakpoints";
import SearchIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";

export default function SearchButton() {
  const [openSearch, setOpenSearch] = useState(false);
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "xs");

  useEffect(() => {
    if (breakpoint === "lg") {
      setOpenSearch(false);
    }
  }, [breakpoint]);
  return (
    <>
      <Button
        radius="full"
        variant="light"
        isIconOnly={true}
        className="xl:self-start lg:hidden xl:w-max sm:w-12 self-center xl:h-14 sm:h-12 sm:flex items-center xl:gap-5 xl:px-4"
        onClick={() => setOpenSearch(true)}
      >
        <SearchIcon className="w-6 h-6" />
      </Button>
      {openSearch &&
        typeof window === "object" &&
        createPortal(
          <SearchSidebar close={() => setOpenSearch(false)} />,
          document.body
        )}
    </>
  );
}
