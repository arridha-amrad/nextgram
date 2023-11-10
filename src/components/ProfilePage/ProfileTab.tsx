"use client";

import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import Squares2X2IconFilled from "@heroicons/react/24/solid/Squares2X2Icon";

import Play from "@heroicons/react/24/outline/PlayIcon";
import PlayFilled from "@heroicons/react/24/solid/PlayIcon";

import Tag from "@heroicons/react/24/outline/TagIcon";
import TagFilled from "@heroicons/react/24/solid/TagIcon";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import useMeasure from "react-use-measure";

export default function ProfileTab() {
  const tabs = [
    {
      name: "Posts",
      href: "/ari",
      icon: <Squares2X2Icon className="w-6 h-6" />,
      filledIcon: <Squares2X2IconFilled className="w-6 h-6" />,
    },
    {
      name: "Reels",
      href: "/ari/reels",
      icon: <Play className="w-6 h-6" />,
      filledIcon: <PlayFilled className="w-6 h-6" />,
    },
    {
      name: "Tag",
      href: "/ari/tag",
      icon: <Tag className="w-6 h-6" />,
      filledIcon: <TagFilled className="w-6 h-6" />,
    },
  ];
  const pathname = usePathname();
  return (
    <section className="h-14 w-full relative flex items-center justify-evenly border-b border-skin-base">
      {tabs.map(({ filledIcon, href, icon, name }) => (
        <Fragment key={name}>
          <Button
            className="h-full"
            radius="none"
            fullWidth
            as={Link}
            variant="light"
            href={href}
          >
            {pathname === href ? filledIcon : icon}
            {name}
            {pathname === href && (
              <div className="h-1 absolute bottom-0 left-0 right-0 bg-primary rounded-lg" />
            )}
          </Button>
        </Fragment>
      ))}
    </section>
  );
}

// import { MdOutlineGridOn } from "react-icons/md";
// import { BiMoviePlay, BiUserPin } from "react-icons/bi";
// import React, { Key, useState } from "react";
// import { Tabs, Tab, Button } from "@nextui-org/react";
// import { usePathname } from "next/navigation";
// import Link from "next/link";

// type Keys = "posts" | "reels" | "tags";

// export default function App() {
//   const pathname = usePathname();
//   const [select, setSelect] = useState<Keys>("posts");

//   return (
//     <Tabs
//       selectedKey={pathname}
//       aria-label="Options"
//       color="primary"
//       variant="underlined"
//       className="w-full"
//       classNames={{
//         tabList: ["justify-evenly", "w-full"],
//       }}
//     >
//       <Tab
//         as={Link}
//         href="/ari"
//         key="/ari"
//         title={
//           <Button isIconOnly variant="light">
//             <MdOutlineGridOn className="w-5 h-5" />
//           </Button>
//         }
//       />
//       <Tab
//         as={Link}
//         href="/ari/reels"
//         key="/ari/reels"
//         title={
//           <Button isIconOnly variant="light">
//             <BiMoviePlay className="w-6 h-6" />
//           </Button>
//         }
//       />
//       <Tab
//         as={Link}
//         href="/ari/tag"
//         key="/ari/tag"
//         title={
//           <Button isIconOnly variant="light">
//             <BiUserPin className="w-6 h-6" />
//           </Button>
//         }
//       />
//     </Tabs>
//   );
// }
