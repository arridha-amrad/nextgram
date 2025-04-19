"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { COMMENTS } from "../cacheKeys";
import {
  fetchComments,
  TComment,
} from "../drizzle/queries/comments/fetchComments";
import CommentService from "../drizzle/services/CommentService";
import NotificationService from "../drizzle/services/NotificationService";
import PostService from "../drizzle/services/PostService";
import { authActionClient } from "../safeAction";

export const create = authActionClient
  .schema(
    zfd.formData({
      message: zfd.text(z.string()),
    }),
  )
  .bindArgsSchemas<[postId: z.ZodString, pathname: z.ZodString]>([
    z.string(),
    z.string(),
  ])
  .action(
    async ({
      bindArgsParsedInputs: [postId],
      ctx: { session },
      parsedInput: { message },
    }) => {
      const { id: userId, username, image } = session.user;
      const commentService = new CommentService();
      const notifService = new NotificationService();
      const postService = new PostService();
      const [post] = await postService.findById(postId);
      // Create comment
      const [result] = await commentService.create({
        message,
        postId,
        userId,
      });
      // Create notification if session.userId !== post owner
      if (userId !== post.userId) {
        await notifService.create({
          actorId: userId,
          userId: post.userId,
          commentId: result.id,
          type: "comment",
          postId,
        });
      }
      const data: TComment = {
        ...result,
        avatar: image ?? null,
        isLiked: false,
        sumLikes: 0,
        sumReplies: 0,
        username,
      };
      revalidateTag(COMMENTS.post);
      return data;
    },
  );

export const likeComment = authActionClient
  .schema(
    z.object({
      commentId: z.string(),
    }),
  )
  .bindArgsSchemas<[pathname: z.ZodString]>([z.string()])
  .action(async ({ ctx: { session }, parsedInput: { commentId } }) => {
    const userId = session.user.id;
    const commentService = new CommentService();
    const notifService = new NotificationService();
    const likeRows = await commentService.findLike({ commentId, userId });
    if (likeRows.length === 0) {
      await commentService.like({ commentId, userId });
      const [comment] = await commentService.findById(commentId);
      if (userId !== comment.userId) {
        await notifService.create({
          postId: comment.postId,
          actorId: userId,
          userId: comment.userId,
          type: "like",
          commentId: commentId,
        });
      }
    } else {
      await commentService.disLike({ commentId, userId });
    }
    revalidateTag(COMMENTS.post);
  });

export const loadMoreComments = authActionClient
  .schema(
    z.object({
      postId: z.string(),
      date: z.date(),
    }),
  )
  .bindArgsSchemas<[pathname: z.ZodString]>([z.string()])
  .action(async ({ ctx: { session }, parsedInput: { date, postId } }) => {
    const comments = await fetchComments({
      postId,
      userId: session.user.id,
      date,
    });
    return comments;
  });
