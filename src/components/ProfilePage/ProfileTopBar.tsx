import React from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";

export default function ProfileTopBar() {
  return (
    <Navbar isBordered shouldHideOnScroll>
      <NavbarContent justify="start">
        <NavbarItem>
          <Button variant="light" color="default">
            <span className="text-large font-semibold">Arridha</span>
            <ChevronDownIcon className="w-6 h-6" />
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            size="md"
            radius="full"
            className="p-1"
            variant="light"
            isIconOnly
          >
            <SquaresPlusIcon className="w-7 h-7" />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            size="md"
            radius="full"
            className="p-1"
            variant="light"
            isIconOnly
          >
            <Bars3Icon className="w-7 h-7" />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
