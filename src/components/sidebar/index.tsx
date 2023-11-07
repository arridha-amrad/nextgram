"use client";

import { Button, Spacer, Tooltip } from "@nextui-org/react";
import SidebarLinks from "./SidebarLinks";
import { FaInstagram } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import SidebarMenu from "./SidebarMenu";
import useMeasure from "react-use-measure";
import SidebarUser from "./SidebarUser";

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
      <SidebarUser />
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
