"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type StoryStore, createStoriesStore } from "./store";

export type StoryStoreApi = ReturnType<typeof createStoriesStore>;

export const StoryStoreContext = createContext<StoryStoreApi | undefined>(
  undefined,
);

export interface StoryStoreProviderProps {
  children: ReactNode;
}

export const StoryStoreProvider = ({ children }: StoryStoreProviderProps) => {
  const storeRef = useRef<StoryStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createStoriesStore();
  }

  return (
    <StoryStoreContext value={storeRef.current}>{children}</StoryStoreContext>
  );
};

export const useStoriesStore = <T,>(selector: (store: StoryStore) => T): T => {
  const context = useContext(StoryStoreContext);
  if (!context) {
    throw new Error(
      "useStoriesStore must be wrapped within StoryStoreProvider",
    );
  }
  return useStore(context, selector);
};
