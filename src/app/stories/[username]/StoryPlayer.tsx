"use client";

import { HTMLAttributes, useEffect, useState } from "react";
import Player from "./Player";
import Indicator from "./Indicator";
import { usePathname } from "next/navigation";
import { TUserStory } from "@/lib/drizzle/queries/stories/fetchUserStories";

type Props = {
  data: TUserStory[];
};

export default function StoryPlayer({ data }: Props) {
  const [progress, setProgress] = useState<number>(0);
  const [isDone, setIsDone] = useState(false);

  const [index, setIndex] = useState(0);

  const pathname = usePathname();

  useEffect(() => {
    setIndex(0);
    setProgress(0);
  }, [pathname]);

  useEffect(() => {
    setProgress(0);
  }, [index]);

  const prevAction = () => {
    if (index === 0) {
    } else {
      setIndex((val) => (val -= 1));
    }
  };

  const nextAction = () => {
    if (index === data.length - 1) {
    } else {
      setIndex((val) => (val += 1));
    }
  };

  useEffect(() => {
    if (progress === 100) {
      const n = data[index + 1];
      if (n) {
        setIndex((val) => (val += 1));
      } else {
        setIsDone(true);
      }
    }
    // eslint-disable-next-line
  }, [progress]);

  return (
    <div className="relative">
      <PrevBtn onClick={prevAction} />
      <NextBtn onClick={nextAction} />
      <div className="bg-bg-secondary relative h-screen w-screen overflow-hidden px-4 py-6 sm:aspect-[9/16] sm:h-[95vh] sm:w-max sm:rounded-xl">
        <div className="relative z-[99] flex h-max w-full items-center gap-2">
          {data.map((_, i) => (
            <Indicator progress={i === index ? progress : 0} key={i} />
          ))}
        </div>
        <Player
          setIsDone={setIsDone}
          isDone={isDone}
          setProgress={setProgress}
          contentUrl={data[index].content}
          duration={data[index].duration}
          id={data[index].id}
          avatar={data[index].avatar}
          createdAt={data[index].createdAt}
          username={data[index].username}
        />
      </div>
    </div>
  );
}

const NextBtn = (props: HTMLAttributes<HTMLButtonElement>) => (
  <div className="absolute top-1/2 -right-10 -translate-y-1/2">
    <button {...props} className="group rounded-full">
      <svg
        aria-label="Next"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
        className="fill-foreground/30 group-hover:fill-foreground rotate-180 transition-colors duration-100 ease-in"
      >
        <title>Next</title>
        <path d="M12.005.503a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm2.207 15.294a1 1 0 1 1-1.416 1.412l-4.5-4.51a1 1 0 0 1 .002-1.415l4.5-4.489a1 1 0 0 1 1.412 1.416l-3.792 3.783Z"></path>
      </svg>
    </button>
  </div>
);

const PrevBtn = (props: HTMLAttributes<HTMLButtonElement>) => (
  <div className="absolute top-1/2 -left-10 -translate-y-1/2">
    <button {...props} className="group rounded-full">
      <svg
        aria-label="Previous"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
        className="fill-foreground/30 group-hover:fill-foreground transition-colors duration-100 ease-in"
      >
        <title>Previous</title>
        <path d="M12.005.503a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm2.207 15.294a1 1 0 1 1-1.416 1.412l-4.5-4.51a1 1 0 0 1 .002-1.415l4.5-4.489a1 1 0 0 1 1.412 1.416l-3.792 3.783Z"></path>
      </svg>
    </button>
  </div>
);
