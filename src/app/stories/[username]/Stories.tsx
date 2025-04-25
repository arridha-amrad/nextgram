"use client";

import { TUserStory } from "@/lib/drizzle/queries/stories/fetchUserStories";
import StoryPlayer from "./StoryPlayer";

type Props = {
  stories: TUserStory[];
};

export default function Stories({ stories }: Props) {
  if (stories.length === 0) return null;

  return (
    <div className="relative flex h-full w-full items-center justify-center gap-20 border-amber-500">
      {/* <div className="flex items-center gap-2">
        {prevStories.map((d, i) =>
          d ? <OtherStory key={i} /> : <Empty key={i} />,
        )}
      </div> */}
      <StoryPlayer data={stories} />
      {/* <div className="flex items-center gap-2">
        {nextStories.map((d, i) =>
          d ? <OtherStory key={i} /> : <Empty key={i} />,
        )}
      </div> */}
    </div>
  );
}
