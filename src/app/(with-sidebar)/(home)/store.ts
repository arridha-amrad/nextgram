import { TFeedPost } from "@/lib/drizzle/queries/posts/fetchFeedPosts";
import { TInfiniteResult } from "@/lib/drizzle/queries/type";
import { filterUniquePosts } from "@/lib/utils";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type TFeedComment = {
  id: string;
  postId: string;
  username: string;
  body: string;
  isLiked: boolean;
};

const MAX_POST_PER_QUERY = 5;

export type FeedPost = TFeedPost & { comments: TFeedComment[] };

interface Action {
  setPosts: (data: TInfiniteResult<TFeedPost>) => void;
  addPosts: (data: TInfiniteResult<TFeedPost>) => void;
  addPost: (data: FeedPost) => void;
  likePost: (postId: string) => void;
  savePost: (postId: string) => void;
  likeComment: (comment: TFeedComment) => void;
  addComment: (comment: TFeedComment) => void;
  removePost: (id: string) => void;
}
interface State {
  isLoading: boolean;
  posts: FeedPost[];
  total: number;
  page: number;
  date: Date;
  hasMore: boolean;
}

const transform = (posts: TFeedPost[]) => {
  return posts.map((p) => ({ ...p, comments: [] as TFeedComment[] }));
};

export const useFeedPosts = create<State & Action>()(
  devtools(
    immer((set) => ({
      hasMore: false,
      date: new Date(),
      total: 0,
      page: 0,
      posts: [],
      isLoading: true,
      savePost(postId) {
        set((state) => {
          const post = state.posts.find((v) => v.id === postId);
          if (!post) return;
          post.isSaved = !post.isSaved;
        });
      },
      removePost(id) {
        set((state) => {
          state.posts = state.posts.filter((p) => p.id !== id);
        });
      },
      setPosts({ data, page, total }) {
        set((state) => {
          state.posts = transform(data);
          state.isLoading = false;
          state.date = state.posts[state.posts.length - 1].createdAt;
          state.page = page;
          state.total = total;
          state.hasMore = total > state.posts.length;
        });
      },
      addPost(data) {
        set((state) => {
          state.posts.unshift(data);
        });
      },
      addPosts({ data, page }) {
        set((state) => {
          const old = state.posts;
          const newPosts = filterUniquePosts([
            ...state.posts,
            ...transform(data),
          ]);
          console.log({ newPosts });

          if (old.length !== newPosts.length) {
            state.hasMore =
              data.length === MAX_POST_PER_QUERY &&
              state.total > newPosts.length;
          }
          state.posts = newPosts;
          state.page = page;
          state.date = state.posts[state.posts.length - 1].createdAt;
        });
      },
      likeComment({ id, postId }) {
        set((state) => {
          const post = state.posts.find((p) => p.id === postId);
          if (!post) return;
          const comment = post.comments?.find((c) => c.id === id);
          if (!comment) return;
          comment.isLiked = !comment.isLiked;
        });
      },
      likePost(postId) {
        set((state) => {
          const post = state.posts.find((p) => p.id === postId);
          if (!post) return;
          if (post.isLiked) {
            post.isLiked = false;
            post.sumLikes -= 1;
          } else {
            post.isLiked = true;
            post.sumLikes += 1;
          }
        });
      },
      addComment(comment) {
        set((state) => {
          const post = state.posts.find((p) => p.id === comment.postId);
          if (!post) return;
          post.comments.push(comment);
          post.sumComments += 1;
        });
      },
    })),
    {
      enabled: process.env.NODE_ENV === "development",
      anonymousActionType: "useFeedPosts",
    },
  ),
);
