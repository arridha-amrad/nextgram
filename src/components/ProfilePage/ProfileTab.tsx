"use client";

import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import Squares2X2IconFilled from "@heroicons/react/24/solid/Squares2X2Icon";

import Play from "@heroicons/react/24/outline/PlayIcon";
import PlayFilled from "@heroicons/react/24/solid/PlayIcon";

import Tag from "@heroicons/react/24/outline/TagIcon";
import TagFilled from "@heroicons/react/24/solid/TagIcon";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function ProfileTab() {
    const { data } = useSession();
    const username = data?.user.username;
    const tabs = [
        {
            name: "Posts",
            href: `/${username}`,
            icon: <Squares2X2Icon className="w-6 h-6" />,
            filledIcon: <Squares2X2IconFilled className="w-6 h-6" />,
        },
        {
            name: "Reels",
            href: `/${username}/reels`,
            icon: <Play className="w-6 h-6" />,
            filledIcon: <PlayFilled className="w-6 h-6" />,
        },
        {
            name: "Tag",
            href: `/${username}/tag`,
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
