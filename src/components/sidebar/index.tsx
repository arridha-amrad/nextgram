"use client";

import { Avatar, Button, Spacer, Tooltip, User } from "@nextui-org/react";
import SidebarLinks from "./sidebar-links";
import { FaInstagram } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import SidebarMenu from "./sidebar-menu";
import useMeasure from "react-use-measure";

export default function Sidebar() {
  const route = useRouter();
  const [ref, { width }] = useMeasure();
  return (
    <div className="flex flex-col h-full xl:px-4">
      <div className="h-[90px] flex items-center cursor-pointer">
        <h1 className="font-display xl:block hidden text-2xl px-4">nextgram</h1>
        <Tooltip placement="right" content="nextgram">
          <Button
            variant="light"
            onClick={() => route.push("/home")}
            className="xl:hidden flex mx-2"
            isIconOnly
            startContent={<FaInstagram className="h-6 w-6" />}
          />
        </Tooltip>
      </div>
      <SidebarLinks />
      <div
        onClick={() => route.push("/arridha")}
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
      <div ref={ref} className="flex flex-col w-full">
        <Tooltip
          className="xl:opacity-0 opacity-100"
          placement="right"
          content="Threads"
        >
          <Button
            radius="full"
            variant="light"
            isIconOnly={width <= 56}
            className="text-lg xl:self-start xl:w-max w-12 self-center xl:h-14 h-12 flex items-center xl:gap-5 xl:px-4"
          >
            <FaThreads className="w-7 h-7" />
            <span className="xl:block hidden">Threads</span>
          </Button>
        </Tooltip>
      </div>
      <SidebarMenu />
      <Spacer y={4} />
    </div>
  );
}
