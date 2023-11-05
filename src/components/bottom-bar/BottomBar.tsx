"use client";

import { BREAKPOINTS } from "@/utils/breakpoints";
import { HomeIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import { useBreakpoint } from "use-breakpoint";

export default function BottomBar() {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "xs");
  console.log({ breakpoint });
  if (breakpoint === "xs") {
    return (
      <div className="fixed bottom-0 z-50 inset-x-0 h-12">
        <div className="bg-background w-full h-full flex items-center justify-evenly relative">
          <Button variant="light" size="sm">
            <HomeIcon className="w-h h-5" />
          </Button>
          <Button variant="light" size="sm">
            <HomeIcon className="w-h h-5" />
          </Button>
          <Button variant="light" size="sm">
            <HomeIcon className="w-h h-5" />
          </Button>
          <Button variant="light" size="sm">
            <HomeIcon className="w-h h-5" />
          </Button>
          <Button variant="light" size="sm">
            <HomeIcon className="w-h h-5" />
          </Button>
        </div>
      </div>
    );
  }
  return null;
}
