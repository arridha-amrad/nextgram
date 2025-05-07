"use server";

import { z } from "zod";
import { zfd } from "zod-form-data";
import { TReply } from "../drizzle/queries/replies/fetchReplies";
import CommentService from "../drizzle/services/CommentService";
import NotificationService from "../drizzle/services/NotificationService";
import ReplyService from "../drizzle/services/ReplyService";
import { SafeActionError } from "../errors/SafeActionError";
import { authActionClient } from "../safeAction";

export const create = authActionClient
  .schema(
    zfd.formData({
      message: zfd.text(z.string()),
    }),
  )
  .bindArgsSchemas<[commentId: z.ZodString, pathname: z.ZodString]>([
    z.string(),
    z.string(),
  ])
  .action(
    async ({
      bindArgsParsedInputs: [commentId],
      ctx: { session },
      parsedInput: { message },
    }) => {
      const { id: userId, username, image } = session.user;
      const replyService = new ReplyService();
      const commentService = new CommentService();
      const notifService = new NotificationService();

      const [result] = await replyService.create({
        commentId,
        message,
        userId,
      });

      const [comment] = await commentService.findById(commentId);
      if (userId !== comment.userId) {
        await notifService.create({
          actorId: userId,
          userId: comment.userId,
          type: "reply",
          postId: comment.postId,
          replyId: result.id,
          commentId: commentId,
        });
      }

      const data: TReply = {
        avatar: image ?? null,
        username,
        isLiked: false,
        sumLikes: 0,
        ...result,
      };
      return data;
    },
  );

/**
 * like reply constraints:
 * 1. The reply exists
 * 2. The comment exists
 * 2. The liked reply data cannot be duplicated
 * required actions:
 * 1. Store/remove the reply in/from related table
 * 2. If the action is like and the actor is not the post owner then create a notification for the posts'owner that someone like his post.
 * 3. If the action is dislike and the actor is not the post owner, delete the stored notification as well
 */

export const likeReply = authActionClient
  .schema(
    z.object({
      replyId: z.string(),
    }),
  )
  .bindArgsSchemas<[pathname: z.ZodString]>([z.string()])
  .action(async ({ parsedInput: { replyId }, ctx: { session } }) => {
    const { id: userId } = session.user;
    const replyService = new ReplyService();
    const commentService = new CommentService();
    const notifService = new NotificationService();

    try {
      const storedReply = await replyService.findById(replyId);
      if (storedReply.length === 0) {
        throw new SafeActionError("reply not found");
      }
      const reply = storedReply[0];

      const storedComment = await commentService.findById(reply.commentId);
      if (storedComment.length === 0) {
        throw new SafeActionError("comment not found");
      }
      const comment = storedComment[0];

      const likeRows = await replyService.findLike({ replyId, userId });

      if (likeRows.length === 0) {
        await replyService.like({ replyId, userId });
        if (userId !== reply.userId) {
          await notifService.create({
            actorId: userId,
            userId: reply.userId,
            type: "like",
            replyId,
            postId: comment.postId,
          });
        }
      } else {
        await replyService.dislike({ replyId, userId });
        if (userId !== reply.userId) {
          await notifService.remove({
            actorId: userId,
            userId: reply.userId,
            type: "like",
            replyId,
            postId: comment.postId,
          });
        }
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
