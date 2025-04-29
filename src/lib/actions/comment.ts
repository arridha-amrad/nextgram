"use server";

import { z } from "zod";
import { zfd } from "zod-form-data";
import { TComment } from "../drizzle/queries/comments/fetchComments";
import CommentService from "../drizzle/services/CommentService";
import NotificationService from "../drizzle/services/NotificationService";
import PostService from "../drizzle/services/PostService";
import { SafeActionError } from "../errors/SafeActionError";
import { authActionClient } from "../safeAction";

/**
 * create comment constraints:
 * 1. The post must exist
 * 2. The actor must be authenticated
 * required  actions:
 * 1. Store nee comment in table
 * 2. Create notification if the actor is not the post owner
 */
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
      const { id: actorId, username, image } = session.user;
      const commentService = new CommentService();
      const notifService = new NotificationService();
      const postService = new PostService();

      const storedPost = await postService.findById(postId);
      if (storedPost.length === 0) {
        throw new SafeActionError("Post not found");
      }

      const post = storedPost[0];

      // Create comment
      const [result] = await commentService.create({
        message,
        postId,
        userId: actorId,
      });
      if (actorId !== post.userId) {
        await notifService.create({
          actorId: actorId,
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
      return data;
    },
  );

/**
 * like comment constraints:
 * 1. The comment must exist
 * 2. The actor must be authenticated
 * required actions:
 * 1. Check the action, like or dislike
 * 2. if the action is 'like' invoke new data to table commentLike otherwise revoke it
 * 3. if the action is 'like' create notification to comment owner otherwise delete it
 */
export const likeComment = authActionClient
  .schema(
    z.object({
      commentId: z.string(),
    }),
  )
  .bindArgsSchemas<[pathname: z.ZodString]>([z.string()])
  .action(async ({ ctx: { session }, parsedInput: { commentId } }) => {
    const actorId = session.user.id;
    const commentService = new CommentService();
    const notifService = new NotificationService();

    const storedComment = await commentService.findById(commentId);
    if (storedComment.length === 0) {
      throw new SafeActionError("Comment not found");
    }
    const comment = storedComment[0];

    const likeRows = await commentService.findLike({
      commentId,
      userId: actorId,
    });

    if (likeRows.length === 0) {
      await commentService.like({ commentId, userId: actorId });
      if (actorId !== comment.userId) {
        await notifService.create({
          postId: comment.postId,
          userId: comment.userId,
          type: "like",
          actorId,
          commentId: commentId,
        });
      }
    } else {
      await commentService.disLike({ commentId, userId: actorId });
      await notifService.remove({
        actorId,
        commentId,
        type: "like",
        userId: comment.userId,
        postId: comment.postId,
      });
    }
  });
