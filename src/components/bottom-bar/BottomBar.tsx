"use client";

import { BREAKPOINTS } from "@/utils/breakpoints";
import {
  HomeIcon,
  PlayCircleIcon,
  PlusCircleIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { Avatar, Button } from "@nextui-org/react";
import { useBreakpoint } from "use-breakpoint";
import SearchButton from "../button/SearchBtn";
import { useRouter } from "next/navigation";

export default function BottomBar() {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "xs");
  const router = useRouter();
  if (breakpoint === "xs") {
    return (
      <div className="fixed bottom-0 z-50 inset-x-0 h-12">
        <div className="bg-background border-t border-default w-full h-full flex items-center justify-evenly relative">
          <Button
            onClick={() => router.push("/home")}
            radius="full"
            isIconOnly
            variant="light"
          >
            <HomeIcon className="w-6 h-6" />
          </Button>
          <SearchButton />
          <Button radius="full" isIconOnly variant="light">
            <PlusCircleIcon className="w-6 h-6" />
          </Button>
          <Button radius="full" isIconOnly variant="light">
            <PlayCircleIcon className="w-6 h-6" />
          </Button>
          <Button
            onClick={() => router.push("/arridha")}
            variant="light"
            radius="full"
            isIconOnly
          >
            <Avatar
              size="sm"
              src="https://i.pravatar.cc/150?u=a04258114e29026702d"
            />
          </Button>
        </div>
      </div>
    );
  }
  return null;
}
