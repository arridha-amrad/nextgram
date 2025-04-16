// src/providers/counter-store-provider.tsx
"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type ProfileStore, createProfileStore } from "@/stores/profile-store";

export type ProfileStoreApi = ReturnType<typeof createProfileStore>;

export const ProfileStoreContext = createContext<ProfileStoreApi | undefined>(
  undefined,
);

export interface ProfileStoreProviderProps {
  children: ReactNode;
}

export const ProfileStoreProvider = ({
  children,
}: ProfileStoreProviderProps) => {
  const storeRef = useRef<ProfileStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createProfileStore();
  }

  return (
    <ProfileStoreContext.Provider value={storeRef.current}>
      {children}
    </ProfileStoreContext.Provider>
  );
};

export const useProfileStore = <T,>(
  selector: (store: ProfileStore) => T,
): T => {
  const counterStoreContext = useContext(ProfileStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
