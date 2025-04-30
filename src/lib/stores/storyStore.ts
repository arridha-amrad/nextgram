import { TStory } from "@/lib/drizzle/queries/stories/fetchStories";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type State = {
  stories: TStory[];
};

type Action = {
  setStories: (data: TStory[]) => void;
};

export const useStoryStore = create<State & Action>()(
  devtools(
    persist(
      immer((set) => ({
        stories: [],
        setStories(data) {
          set((state) => {
            state.stories = data;
          });
        },
        watch(id: string, username: string) {
          set((state) => {
            const idx = state.stories.findIndex((s) => s.username === username);
            if (idx < 0) return;
            const stories = state.stories[idx].stories.map((s) =>
              s.id === id ? { ...s, hasWatched: true } : s,
            );
            state.stories[idx].stories = stories;
          });
        },
      })),
      { name: "stories-store" },
    ),
    {
      anonymousActionType: "useStoryStore",
      enabled: process.env.NODE_ENV === "development",
    },
  ),
);
