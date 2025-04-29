import { TStory } from "@/lib/drizzle/queries/stories/fetchStories";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type State = {
  stories: TStory[];
};

type Action = {
  setStories: (data: TStory[]) => void;
};

export const useStoryStore = create<State & Action>()(
  devtools(
    immer((set) => ({
      stories: [],
      setStories(data) {
        set((state) => {
          state.stories = data;
        });
      },
    })),
    {
      anonymousActionType: "useStoryStore",
      enabled: process.env.NODE_ENV === "development",
    },
  ),
);
