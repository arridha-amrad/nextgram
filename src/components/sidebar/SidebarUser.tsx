"use client";

import { Avatar, Button } from "@nextui-org/react";
import Link from "next/link";

export default function SidebarUser() {
  return (
    <div className="px-4 h-full mt-4">
      <Button
        as={Link}
        href="/ari"
        className="h-14"
        radius="full"
        variant="solid"
        color="primary"
      >
        <Avatar
          size="md"
          src="https://i.pravatar.cc/150?u=a04258114e29026702d"
        />
        <div className="flex flex-col items-start pl-1">
          <h1 className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[100px]">
            Dilšah Bülüt
          </h1>
          <h1
            className="text-sm
          overflow-hidden text-ellipsis whitespace-nowrap max-w-[100px]"
          >
            @jane_doe
          </h1>
        </div>
      </Button>
    </div>
  );
}
