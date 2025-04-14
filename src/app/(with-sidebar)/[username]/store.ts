import { TUserPost } from "@/lib/drizzle/queries/posts/fetchUserPosts";
import { TInfiniteResult } from "@/lib/drizzle/queries/type";
import { filterUniquePosts } from "@/lib/utils";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface StateAction {
  setPosts: (data: TInfiniteResult<TUserPost>) => void;
  addPosts: (data: TInfiniteResult<TUserPost>) => void;
  addPost: (data: TUserPost) => void;
  setHasMore: (value: boolean) => void;
  posts: TUserPost[];
  hasMore: boolean;
  total: number;
  lastDate: Date;
  isLoading: boolean;
}

const MAX_POST_PER_QUERY = 6;

export const useUserPosts = create<StateAction>()(
  devtools(
    immer((set) => ({
      posts: [],
      total: 0,
      isLoading: true,
      lastDate: new Date(),
      hasMore: false,
      setHasMore(value) {
        set((state) => {
          state.hasMore = value;
        });
      },
      setPosts({ data, total }) {
        set((state) => {
          data.map((p) => {
            console.log("created at : ", p.createdAt);
          });
          state.posts = data.length > 0 ? data : [];
          state.hasMore =
            data.length > 0 ? data.length === MAX_POST_PER_QUERY : false;
          state.lastDate =
            data.length > 0
              ? new Date(data[data.length - 1].createdAt)
              : new Date();
          state.total = total;
          state.isLoading = false;
        });
      },
      addPosts(newData) {
        set((state) => {
          state.posts = filterUniquePosts([...state.posts, ...newData?.data]);
          state.hasMore = newData.data.length === MAX_POST_PER_QUERY;
          state.lastDate = new Date(
            newData.data[newData.data.length - 1].createdAt,
          );
        });
      },
      addPost(data) {
        set((state) => {
          state.posts.unshift(data);
        });
      },
    })),
    {
      enabled: process.env.NODE_ENV === "development",
      anonymousActionType: "useUserPosts",
    },
  ),
);
