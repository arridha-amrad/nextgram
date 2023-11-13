"use client";

import UserIcon from "@heroicons/react/24/outline/UserIcon";
import UserIconFilled from "@heroicons/react/24/solid/UserIcon";
import { Avatar, Button, Tooltip } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarUser() {
  const { data } = useSession();
  const pathname = usePathname();

  console.log({ data });

  return (
    <div className="flex-1">
      <Tooltip className="xl:opacity-0 opacity-100" content="Profile">
        <Button
          as={Link}
          href={`/${data?.user?.name}`}
          isIconOnly
          radius="full"
          variant="light"
          className="text-lg xl:self-start xl:w-max w-12 self-center xl:h-14 h-12 flex items-center xl:gap-5 xl:px-4"
        >
          {`/${data?.user?.name}` === pathname ? (
            <UserIconFilled className="w-7 h-7" />
          ) : (
            <UserIcon className="w-7 h-7" />
          )}
          <span
            className={`xl:block pl-4 hidden ${
              `/${data?.user?.name}` === pathname ? "font-bold" : "font-normal"
            }`}
          >
            Profile
          </span>
        </Button>
      </Tooltip>
    </div>
    // <div className="xl:px-4 h-full mt-4">
    //   <Tooltip placement="bottom" content="profile">
    //     <Link
    //       href="/ari"
    //       className="rounded-full xl:px-4 focus:outline-none xl:h-14 flex items-center border border-skin-base"
    //     >
    //       <Avatar
    //         size="md"
    //         src="https://i.pravatar.cc/150?u=a04258114e29026702d"
    //       />
    //       <div className="xl:flex hidden  flex-col items-start pl-1">
    //         <h1 className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[100px]">
    //           Dilšah Bülüt
    //         </h1>
    //         <h1
    //           className="text-sm
    //         overflow-hidden text-ellipsis whitespace-nowrap max-w-[100px]"
    //         >
    //           @jane_doe
    //         </h1>
    //       </div>
    //     </Link>
    //   </Tooltip>
    // </div>
  );
}
