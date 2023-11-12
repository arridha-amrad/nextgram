import dynamic from "next/dynamic";
import { ReactNode } from "react";

const Sidebar = dynamic(() => import("@/components/sidebar"), { ssr: true });
const BottomBar = dynamic(() => import("@/components/bottom-bar/BottomBar"), {
  ssr: false,
});

type Props = {
  children: ReactNode;
};

export default function GroupOneLayout({ children }: Props) {
  return (
    <div className="flex w-full">
      <BottomBar />
      <div className="w-max h-screen sticky inset-y-0 left-0 hidden sm:block border-r border-skin-base">
        <Sidebar />
      </div>
      {/* <div className="sm:flex-1">{children}</div> */}
      <div className="w-full">{children}</div>
    </div>
  );
}
