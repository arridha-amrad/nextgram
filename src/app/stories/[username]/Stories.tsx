"use client";

import { useEffect, useState } from "react";
import { useStoriesStore } from "./Provider";
import { Story } from "./store";
import Empty from "./Empty";
import OtherStory from "./OtherStory";
import StoryPlayer from "./StoryPlayer";
import { useParams } from "next/navigation";

export default function Stories({ stories }: { stories: Story[] }) {
  const setStories = useStoriesStore((store) => store.setStories);
  const s = useStoriesStore((store) => store.stories);
  const prevStories = useStoriesStore((store) => store.prevStories);
  const nextStories = useStoriesStore((store) => store.nextStories);
  const setNextStories = useStoriesStore((store) => store.setNextStories);
  const setPrevStories = useStoriesStore((store) => store.setPrevStories);

  const { username } = useParams();

  const [next, setNext] = useState<Story | null>(null);
  const [prev, setPrev] = useState<Story | null>(null);

  const data = s.find((d) => d.username === username);

  useEffect(() => {
    if (username) {
      const activeIndex = s.findIndex((v) => v.username === username);
      console.log({ activeIndex });
      console.log({ username });

      if (activeIndex >= 0) {
        const nextS = s[activeIndex + 1];
        const nextTwoS = s[activeIndex + 2];
        if (nextS) {
          setNext(nextS);
          setNextStories([nextS]);
          if (nextTwoS) {
            setNextStories([...nextStories, nextTwoS]);
          }
        }
        const prevS = s[activeIndex - 1];
        const prevTwoS = s[activeIndex - 1];
        if (prevS) {
          setPrev(prevS);
          setPrevStories([prevS]);
          if (prevTwoS) {
            setPrevStories([...prevStories, prevTwoS]);
          }
        }
      }
    }
  }, [username, s]);

  useEffect(() => {
    if (stories.length > 0) {
      setStories(stories);
    }
    // eslint-disable-next-line
  }, []);

  if (!data) return null;

  return (
    <div className="relative flex h-full w-full items-center justify-center gap-20 border-amber-500">
      <div className="flex items-center gap-2">
        {prevStories.map((d, i) =>
          d ? <OtherStory key={i} /> : <Empty key={i} />,
        )}
      </div>
      <StoryPlayer prevStory={prev} data={data} nextStory={next} />
      <div className="flex items-center gap-2">
        {nextStories.map((d, i) =>
          d ? <OtherStory key={i} /> : <Empty key={i} />,
        )}
      </div>
    </div>
  );
}
