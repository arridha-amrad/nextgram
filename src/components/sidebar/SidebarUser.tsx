"use client";

import { Avatar, Button, User } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function SidebarUser() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <div
      ref={ref}
      onClick={() => router.push("/ari")}
      className="py-2 h-full flex items-center flex-1 cursor-pointer xl:mx-0 mx-auto"
    >
      <Button
        onClick={() => ref.current?.click()}
        className="py-2 h-max xl:flex hidden"
        radius="full"
        variant="flat"
      >
        <Avatar
          size="md"
          src="https://i.pravatar.cc/150?u=a04258114e29026702d"
        />
        <div className="flex flex-col items-start pl-1">
          <h1 className="text-lg">Dilšah Bülüt</h1>
          <h1 className="text-skin-accent">@jane_doe</h1>
        </div>
      </Button>
      <Button
        onClick={() => ref.current?.click()}
        isIconOnly
        radius="full"
        className="xl:hidden"
      >
        <Avatar
          size="md"
          src="https://i.pravatar.cc/150?u=a04258114e29026702d"
        />
      </Button>
    </div>
  );
}
