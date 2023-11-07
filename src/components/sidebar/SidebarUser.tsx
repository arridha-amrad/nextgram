"use client";

import { Avatar, User } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function SidebarUser() {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/arridha")}
      className="py-2 flex-1 cursor-pointer"
    >
      <div className="xl:block hidden">
        <User
          classNames={{
            base: [
              "px-3",
              "py-2",
              "hover:dark:bg-neutral-800",
              "hover:bg-neutral-100",
              "w-full",
              "flex",
              "justify-start",
              "rounded-full",
            ],
            wrapper: ["pl-2"],
            name: ["font-semibold", "text-base"],
            description: ["text-sm", "text-skin-accent"],
          }}
          name="Jane Doe"
          description="@jane_doe"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            size: "md",
          }}
        />
      </div>
      <div className="flex xl:hidden items-center justify-center">
        <Avatar
          size="md"
          src="https://i.pravatar.cc/150?u=a04258114e29026702d"
        />
      </div>
    </div>
  );
}
