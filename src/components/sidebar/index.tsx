import { Spacer } from "@nextui-org/react";

import dynamic from "next/dynamic";

const SidebarLinks = dynamic(() => import("./SidebarLinks"));
const SidebarMenu = dynamic(() => import("./SidebarMenu"));
const SidebarUser = dynamic(() => import("./SidebarUser"));
const ThreadButton = dynamic(() => import("@/components/button/ThreadsBtn"));
const InstagramButton = dynamic(
  () => import("@/components/button/InstagramBtn")
);

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full xl:px-4 overflow-y-auto overflow-x-hidden">
      <div className="h-[90px] justify-center xl:justify-start flex-shrink-0 flex items-center cursor-pointer">
        <h1 className="font-display xl:block hidden text-2xl px-4">nextgram</h1>
        <InstagramButton />
      </div>
      <SidebarLinks />
      <SidebarUser />
      <ThreadButton />
      <SidebarMenu />
      <Spacer y={4} />
    </div>
  );
}
