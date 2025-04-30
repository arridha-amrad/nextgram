"use client";

import { TStory } from "@/lib/drizzle/queries/stories/fetchStories";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Indicator from "./Indicator";
import Player from "./Player";
import { useStoryStore } from "./store";

type Props = {
  stories: TStory["stories"];
  avatar: string | null;
  username: string;
  onCompleteCallback: VoidFunction;
};

export default function StoryPlayer({
  stories,
  avatar,
  username,
  onCompleteCallback,
}: Props) {
  const [progress, setProgress] = useState<number>(0);
  const [isDone, setIsDone] = useState(false);

  const storiesData = useStoryStore((store) => store.stories);
  const searchParams = useSearchParams();
  const usernameFromParam = searchParams.get("username");

  const [index, setIndex] = useState(0);

  const pathname = usePathname();

  useEffect(() => {
    setIndex(0);
    setProgress(0);
  }, [pathname]);

  useEffect(() => {
    setProgress(0);
  }, [index]);

  useEffect(() => {
    if (progress === 100) {
      const n = stories[index + 1];
      if (n) {
        setIndex((val) => (val += 1));
      } else {
        const idx = storiesData.findIndex(
          (v) => v.username === usernameFromParam,
        );
        if (idx >= 0) {
          const lastIndex = storiesData.length - 1;
          if (idx < lastIndex) {
            onCompleteCallback();
            return;
          }
        }
        setIsDone(true);
      }
    }
    // eslint-disable-next-line
  }, [progress]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="h-full w-full px-4">
        <div className="relative z-[99] flex h-max w-full items-center gap-2">
          {stories.map(({ hasWatched }, i) => (
            <Indicator
              onClick={() => {
                setIndex(i);
              }}
              isPlaying={i === index}
              hasWatched={hasWatched}
              progress={i === index ? progress : 0}
              key={i}
            />
          ))}
        </div>
        <Player
          setIsDone={setIsDone}
          isDone={isDone}
          setProgress={setProgress}
          hasWatched={stories[index].hasWatched}
          contentUrl={stories[index].content}
          duration={stories[index].duration}
          id={stories[index].id}
          createdAt={stories[index].createdAt}
          avatar={avatar}
          username={username}
        />
      </div>
    </div>
  );
}
