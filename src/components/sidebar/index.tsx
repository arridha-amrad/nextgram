import { Spacer } from "@nextui-org/react";
import SidebarLinks from "./SidebarLinks";
import SidebarMenu from "./SidebarMenu";
import SidebarUser from "./SidebarUser";
import ThreadButton from "../button/ThreadsBtn";
import InstagramButton from "../button/InstagramButton";

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full xl:px-4">
      <div className="h-[90px] flex items-center cursor-pointer">
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
