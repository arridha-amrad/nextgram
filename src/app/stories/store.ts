import { TStory } from "@/lib/drizzle/queries/stories/fetchStories";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type State = {
  stories: TStory[];
};

type Action = {
  fetchedDate: Date | null;
  setStories: (data: TStory[], date: Date) => void;
  watch: (id: string, username: string) => void;
  watchedIds: string[];
};

export const useStoryStore = create<State & Action>()(
  devtools(
    persist(
      immer((set) => ({
        stories: [],
        watchedIds: [],
        fetchedDate: null,
        setStories(data, date) {
          set((state) => {
            state.fetchedDate = date;
            state.stories = data;
            state.watchedIds = [];
          });
        },
        watch(id: string, username: string) {
          set((state) => {
            const idx = state.stories.findIndex((s) => s.username === username);
            if (idx < 0) return;
            const stories = state.stories[idx].stories.map((s) =>
              s.id === id ? { ...s, hasWatched: true } : s,
            );
            const arr = Array.from(new Set([...state.watchedIds, id]));
            state.watchedIds = arr;
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
