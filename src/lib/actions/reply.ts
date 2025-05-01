"use server";

import { z } from "zod";
import { zfd } from "zod-form-data";
import { TReply } from "../drizzle/queries/replies/fetchReplies";
import CommentService from "../drizzle/services/CommentService";
import NotificationService from "../drizzle/services/NotificationService";
import ReplyService from "../drizzle/services/ReplyService";
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
    const likeRows = await replyService.findLike({ replyId, userId });
    let message = "";
    if (likeRows.length === 0) {
      await replyService.like({ replyId, userId });
      const [reply] = await replyService.findById(replyId);
      const [comment] = await commentService.findById(reply.id);
      if (userId !== reply.userId) {
        await notifService.create({
          actorId: userId,
          userId: reply.userId,
          type: "like",
          replyId,
          postId: comment.postId,
        });
      }
      message = "like";
    } else {
      await replyService.dislike({ replyId, userId });
      message = "dislike";
    }
    return message;
  });
