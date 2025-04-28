import { TProfile } from "@/lib/drizzle/queries/users/fetchUserProfile";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface StateAction {
  setProfile: (data: TProfile) => void;
  toggleIsRequestFollow: () => void;
  profile: TProfile | null;
}

export const useProfileStore = create<StateAction>()(
  devtools(
    immer((set) => ({
      profile: null,
      toggleIsRequestFollow() {
        set((state) => {
          if (state.profile) {
            state.profile.isFollowRequested = !state.profile.isFollowRequested;
          }
        });
      },
      setProfile(data) {
        set((state) => {
          state.profile = data;
        });
      },
    })),
    {
      enabled: process.env.NODE_ENV === "development",
      anonymousActionType: "useProfileStore",
    },
  ),
);
