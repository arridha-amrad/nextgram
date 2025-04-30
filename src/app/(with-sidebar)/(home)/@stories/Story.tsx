"use client";

import { TStory } from "@/lib/drizzle/queries/stories/fetchStories";
import { cn, rgbDataURL } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  story: TStory;
};

export default function Story({ story }: Props) {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const { avatar, username, stories } = story;

  const isWatchAll = stories.every((val) => val.hasWatched === true);

  return (
    <div className="w-[70px]">
      <div className="relative flex size-[66px] shrink-0 items-center justify-center select-none">
        {isClicked ? (
          <div
            className={cn(
              "absolute top-0 left-0 size-[66px] animate-spin rounded-full border-2 border-transparent border-t-[#e1306c] border-r-[#e1306c]",
            )}
          ></div>
        ) : isWatchAll ? (
          <div className="bg-bg-secondary absolute inset-0 size-[66px] rounded-full" />
        ) : (
          <div className="absolute inset-0 size-[66px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600" />
        )}
        <div
          onClick={() => {
            setIsClicked(true);
            router.push(`/stories?username=${username}`, { scroll: false });
          }}
          className="bg-background relative cursor-pointer rounded-full p-0.5"
        >
          <Image
            src={avatar ?? "/default.jpg"}
            alt="Story"
            blurDataURL={rgbDataURL(60, 60, 60)}
            placeholder="blur"
            width={100}
            height={100}
            className="size-[56px] rounded-full object-cover"
          />
        </div>
      </div>
      <p className="line-clamp-1 px-1 py-1 text-center text-xs select-none">
        {username}
      </p>
    </div>
  );
}
