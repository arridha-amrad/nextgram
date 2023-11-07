"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { PiMessengerLogo, PiBell } from "react-icons/pi";
import { useBreakpoint } from "use-breakpoint";
import { BREAKPOINTS } from "@/utils/breakpoints";

export default function TopBar() {
  const { breakpoint } = useBreakpoint(BREAKPOINTS, "xs");
  if (breakpoint === "xs") {
    return (
      <Navbar isBordered shouldHideOnScroll>
        <NavbarBrand>
          <p className="font-display text-xl">nextgram</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button isIconOnly color="default" variant="light">
              <PiBell className="w-6 h-6" />
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button isIconOnly color="default" variant="light">
              <PiMessengerLogo className="w-6 h-6" />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    );
  }

  return null;
}
