import { createStore, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type StoryData = {
  id: number;
  contentUrl: string;
  duration: number;
};

export type Story = {
  username: string;
  stories: StoryData[];
};

type State = {
  stories: Story[];
  prevStories: Story[];
  nextStories: Story[];
};

type Action = {
  setStories: (stories: Story[]) => void;
  setNextStories: (stories: Story[]) => void;
  setPrevStories: (stories: Story[]) => void;
};

export type StoryStore = State & Action;

const initState: State = {
  nextStories: [],
  prevStories: [],
  stories: [],
};

const storeCreator: StateCreator<
  StoryStore,
  [],
  [["zustand/devtools", never], ["zustand/immer", never]]
> = devtools(
  immer((set) => ({
    ...initState,
    setPrevStories(stories) {
      set((state) => {
        state.prevStories = stories;
      });
    },
    setNextStories(stories) {
      set((state) => {
        state.nextStories = stories;
      });
    },
    setStories(stories) {
      set((state) => {
        state.stories = stories;
      });
    },
  })),
  {
    enabled: process.env.NODE_ENV === "development",
    anonymousActionType: "useStoriesStore",
  },
);

export const createStoriesStore = () => createStore(storeCreator);
