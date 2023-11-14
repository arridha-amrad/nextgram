"use client";

import UserIcon from "@heroicons/react/24/outline/UserIcon";
import UserIconFilled from "@heroicons/react/24/solid/UserIcon";
import { Button, Tooltip } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarUser() {
  const { data } = useSession();
  const pathname = usePathname();

  const sessionUsername = data?.user.username;
  const isActive = pathname.includes(sessionUsername ?? "");

  return (
    <div className="flex-1">
      <Tooltip className="xl:opacity-0 opacity-100" content="Profile">
        <Button
          as={Link}
          href={`/${sessionUsername}`}
          isIconOnly
          radius="full"
          variant="light"
          className="text-lg xl:self-start xl:w-max w-12 self-center xl:h-14 h-12 flex items-center xl:gap-5 xl:px-4"
        >
          {isActive ? (
            <UserIconFilled className="w-7 h-7" />
          ) : (
            <UserIcon className="w-7 h-7" />
          )}
          <span
            className={`xl:block pl-4 hidden ${
              isActive ? "font-bold" : "font-normal"
            }`}
          >
            Profile
          </span>
        </Button>
      </Tooltip>
    </div>
  );
}
