import { Spacer } from "@nextui-org/react";

import dynamic from "next/dynamic";
import Logo from "./Logo";

const SidebarLinks = dynamic(() => import("./SidebarLinks"));
const SidebarMenu = dynamic(() => import("./SidebarMenu"));
const SidebarUser = dynamic(() => import("./SidebarUser"));
const ThreadButton = dynamic(() => import("@/components/button/ThreadsBtn"));

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full xl:px-4 overflow-y-auto overflow-x-hidden">
      <Logo />
      <SidebarLinks />
      <SidebarUser />
      <ThreadButton />
      <SidebarMenu />
      <Spacer y={4} />
    </div>
  );
}
