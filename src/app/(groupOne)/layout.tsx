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
    <div className="flex min-h-screen w-full">
      <BottomBar />
      <div className="w-14 xl:w-max sticky top-0 h-screen hidden sm:block">
        <Sidebar />
      </div>
      {children}
    </div>
  );
}
