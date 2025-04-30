"use client";

import { TStory } from "@/lib/drizzle/queries/stories/fetchStories";
import StoryPlayer from "../StoryPlayer";

type Props = {
  data: TStory;
};

export default function Stories({ data }: Props) {
  if (data.stories.length === 0) return null;

  return (
    <div className="relative flex aspect-[9/16] h-[95vh] items-center justify-center gap-20 border-amber-500">
      <StoryPlayer
        avatar={data.avatar}
        stories={data.stories}
        onCompleteCallback={() => {}}
        username={data.username}
      />
    </div>
  );
}
