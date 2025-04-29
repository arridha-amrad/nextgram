import { TComment } from "@/lib/drizzle/queries/comments/fetchComments";
import { TPost } from "@/lib/drizzle/queries/posts/fetchPost";
import { TReply } from "@/lib/drizzle/queries/replies/fetchReplies";
import { getUniqueById } from "@/lib/utils";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const transform = (comments: TComment[]): Comment[] => {
  return comments.map((c) => ({ ...c, replies: [] as TReply[] }));
};

export type Comment = TComment & { replies: TReply[] };

export type TReplySetter = {
  username: string;
  commentId: string;
};

type State = {
  post: TPost | null;
  comments: Comment[];
  totalComments: number;
  lastCommentDate: Date;
  hasMoreComment: boolean;
  isFocusToCommentForm: boolean;
  idTime: number;
  replyTarget: TReplySetter | null;
};

interface Action {
  likePost: () => void;
  bookMarkPost: () => void;
  addComments: (comments: TComment[]) => void;
  likeComment: (commentId: string) => void;
  setReplies: (replies: TReply[]) => void;
  addReply: (reply: TReply) => void;
  addComment: (comment: TComment) => void;
  likeReply: (commentId: string, replyId: string) => void;
  toggleFocusToCommentForm: () => void;
  //
  setReplySetter: (data: TReplySetter | null) => void;
  resetReplySetter: () => void;
  init: (post: TPost, comments: TComment[]) => void;
}

const defaultInitState: State = {
  post: null,
  idTime: 0,
  replyTarget: null,
  isFocusToCommentForm: true,
  comments: [],
  totalComments: 0,
  hasMoreComment: true,
  lastCommentDate: new Date(),
};

export const usePostStore = create<Action & State>()(
  devtools(
    persist(
      immer((set) => ({
        ...defaultInitState,
        init(post, comments) {
          set((state) => {
            state.post = post;
            state.hasMoreComment = comments.length >= 10;
            state.comments = transform(comments);
            state.lastCommentDate =
              comments.length > 0
                ? state.comments[state.comments.length - 1].createdAt
                : new Date();
            state.totalComments = post.sumComments;
          });
        },
        // post
        bookMarkPost() {
          set((state) => {
            if (state.post) {
              const isSaved = state.post.isSaved;
              state.post.isSaved = !isSaved;
            }
          });
        },
        likePost() {
          set((state: State) => {
            if (state.post) {
              const isLiked = state.post?.isLiked;
              state.post.isLiked = !isLiked;
              if (isLiked) {
                state.post.sumLikes -= 1;
              } else {
                state.post.sumLikes += 1;
              }
            }
          });
        },
        // comments
        addComment(comment) {
          const c: Comment = { ...comment, replies: [] };
          set((state) => {
            state.comments.unshift(c);
            state.totalComments += 1;
          });
        },
        likeComment(commentId) {
          set((state) => {
            const comment = state.comments.find((c) => c.id === commentId);
            if (!comment) return;
            if (comment.isLiked) {
              comment.isLiked = false;
              comment.sumLikes -= 1;
            } else {
              comment.isLiked = true;
              comment.sumLikes += 1;
            }
          });
        },
        addComments(incomingComments) {
          set((state) => {
            state.hasMoreComment = incomingComments.length >= 10;
            const comments = getUniqueById(transform(incomingComments));
            state.comments = [...state.comments, ...comments];
            state.lastCommentDate =
              state.comments[state.comments.length - 1].createdAt;
          });
        },
        // replies
        likeReply(commentId, replyId) {
          set((state) => {
            const c = state.comments.find((co) => co.id === commentId);
            if (!c) return;
            const r = c.replies.find((re) => re.id === replyId);
            if (!r) return;
            if (r.isLiked) {
              r.isLiked = false;
              r.sumLikes -= 1;
            } else {
              r.isLiked = true;
              r.sumLikes += 1;
            }
          });
        },

        addReply(reply) {
          set((state) => {
            const c = state.comments.find((c) => c.id === reply.commentId);
            if (!c) return;
            c.replies.push(reply);
            c.sumReplies += 1;
            state.totalComments += 1;
          });
        },
        setReplies(replies) {
          set((state) => {
            const cId = replies[0].commentId;
            const comment = state.comments.find((c) => c.id === cId);
            if (!comment) return;
            comment.replies = getUniqueById([...comment.replies, ...replies]);
          });
        },
        // others
        resetReplySetter: () => {
          set((state: State) => {
            state.replyTarget = null;
          });
        },
        setReplySetter(data) {
          set((state) => {
            state.replyTarget = data;
          });
        },
        toggleFocusToCommentForm: () => {
          set((state) => {
            state.isFocusToCommentForm = !state.isFocusToCommentForm;
          });
        },
      })),
      {
        name: "post-detail",
      },
    ),
    {
      enabled: process.env.NODE_ENV === "development",
      anonymousActionType: "usePostStore",
    },
  ),
);
