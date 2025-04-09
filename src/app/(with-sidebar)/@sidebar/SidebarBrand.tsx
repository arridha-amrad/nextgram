"use client";

import { useSidebarContext } from "./Context";
import { usePathname } from "next/navigation";
import { IGLogo, Logo } from "./Icons";
import { cn } from "@/lib/utils";
import { page } from "@/lib/pages";

function SidebarBrand() {
  const { isSmallSidebar } = useSidebarContext();

  const pathname = usePathname();

  const isAppliedSmallSidebar = isSmallSidebar || pathname === page.inbox;

  return <InstagramLogo isAppliedSmallSidebar={isAppliedSmallSidebar} />;
}

export default SidebarBrand;

const InstagramLogo = ({
  isAppliedSmallSidebar,
}: {
  isAppliedSmallSidebar: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex h-25 shrink-0 items-center",
        isAppliedSmallSidebar ? "aspect-square w-12 justify-center" : "px-3",
      )}
    >
      {isAppliedSmallSidebar ? (
        <IGLogo />
      ) : (
        <>
          <div className="block lg:hidden">
            <IGLogo />
          </div>
          <div className="hidden lg:block">
            <Logo />
          </div>
        </>
      )}
    </div>
  );
};
