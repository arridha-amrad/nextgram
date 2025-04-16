import { TUserPost } from "@/lib/drizzle/queries/posts/fetchUserPosts";
import { filterUniquePosts } from "@/lib/utils";
import { createStore, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const MAX_POST_PER_QUERY = 6;

type ProfileState = {
  hasMorePosts: boolean;
  hasMoreSavedPosts: boolean;
  posts: TUserPost[];
  savedPosts: TUserPost[];
  totalPosts: number;
  totalSavedPosts: number;
};

type ProfileAction = {
  addPosts: (posts: TUserPost[], type: "saved" | "default") => void;
  setPosts: (
    posts: TUserPost[],
    type: "saved" | "default",
    total: number,
  ) => void;
};

export type ProfileStore = ProfileState & ProfileAction;

const defaultInitState: ProfileState = {
  posts: [],
  savedPosts: [],
  hasMorePosts: false,
  hasMoreSavedPosts: false,
  totalPosts: 0,
  totalSavedPosts: 0,
};

// Wrap with middlewares: immer inside devtools (order matters for naming!)
const storeCreator: StateCreator<
  ProfileStore,
  [],
  [["zustand/devtools", never], ["zustand/immer", never]]
> = devtools(
  immer((set) => ({
    ...defaultInitState,
    setPosts(posts, type, total) {
      set((state) => {
        if (type === "default") {
          state.posts = filterUniquePosts([...state.posts, ...posts]);
          state.totalPosts = total;
          state.hasMorePosts = total > state.posts.length;
        }
        if (type === "saved") {
          state.savedPosts = filterUniquePosts([...state.savedPosts, ...posts]);
          state.totalSavedPosts = total;
          state.hasMoreSavedPosts = total > state.savedPosts.length;
        }
      });
    },
    addPosts: (posts, type) => {
      set((state) => {
        if (type === "default") {
          const old = state.posts;
          const newPosts = filterUniquePosts([...state.posts, ...posts]);
          if (old.length !== newPosts.length) {
            state.hasMorePosts =
              posts.length === MAX_POST_PER_QUERY &&
              state.totalPosts > newPosts.length;
          }
          state.posts = newPosts;
        }
        if (type === "saved") {
          const old = state.savedPosts;
          const newPosts = filterUniquePosts([...state.savedPosts, ...posts]);
          if (old.length !== newPosts.length) {
            state.hasMoreSavedPosts =
              posts.length === MAX_POST_PER_QUERY &&
              state.totalSavedPosts > newPosts.length;
          }
          state.savedPosts = newPosts;
        }
      });
    },
  })),
  {
    anonymousActionType: "useProfileStore",
    enabled: process.env.NODE_ENV === "development",
  },
);

export const createProfileStore = () => createStore(storeCreator);
