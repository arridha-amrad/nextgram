"use client";

import { BREAKPOINTS } from "@/utils/breakpoints";
import {
  HomeIcon,
  PlayCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Avatar, Button } from "@nextui-org/react";
import { useBreakpoint } from "use-breakpoint";
import SearchButton from "../button/SearchBtn";

export default function BottomBar() {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "xs");
  console.log({ breakpoint });
  if (breakpoint === "xs") {
    return (
      <div className="fixed bottom-0 z-50 inset-x-0 h-12">
        <div className="bg-background w-full h-full flex items-center justify-evenly relative">
          <Button radius="full" isIconOnly variant="light" size="sm">
            <HomeIcon className="w-6 h-6" />
          </Button>
          <SearchButton />
          <Button radius="full" isIconOnly variant="light" size="sm">
            <PlusCircleIcon className="w-6 h-6" />
          </Button>
          <Button radius="full" isIconOnly variant="light" size="sm">
            <PlayCircleIcon className="w-6 h-6" />
          </Button>
          <Avatar
            size="sm"
            src="https://i.pravatar.cc/150?u=a04258114e29026702d"
          />
        </div>
      </div>
    );
  }
  return null;
}
