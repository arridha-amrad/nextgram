"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";
import { POST } from "../cacheKeys";
import PostService from "../drizzle/services/PostService";
import { authActionClient } from "../safeAction";
import NotificationService from "../drizzle/services/NotificationService";

export const savePost = authActionClient
  .schema(
    z.object({
      postId: z.string(),
    }),
  )
  .bindArgsSchemas<[pathname: z.ZodString]>([z.string()])
  .action(async ({ ctx, clientInput: { postId } }) => {
    const userId = ctx.session.user.id;
    const postService = new PostService();
    const notifService = new NotificationService();

    const savedPosts = await postService.findSavedPost({ postId, userId });
    let message = "";

    if (savedPosts.length === 0) {
      await postService.savePost({ postId, userId });
      const [post] = await postService.findById(postId);
      await notifService.create({
        actorId: userId,
        userId: post.userId,
        postId: postId,
        type: "save",
      });
      message = "saved";
    } else {
      await postService.deleteSavedPost({ postId, userId });
      message = "delete";
    }
    revalidateTag(POST.savedPosts);
    revalidateTag(POST.homePosts);
    revalidateTag(POST.detail);
    return message;
  });

export const likePost = authActionClient
  .schema(
    z.object({
      postId: z.string(),
    }),
  )
  .bindArgsSchemas<[pathname: z.ZodString]>([z.string()])
  .action(async ({ ctx: { session }, parsedInput: { postId } }) => {
    const { id: userId } = session.user;
    const postService = new PostService();
    const notifService = new NotificationService();
    try {
      const likeRows = await postService.findLike({ postId, userId });
      let message = "";
      if (likeRows.length === 0) {
        await postService.like({ postId, userId });
        const [post] = await postService.findById(postId);
        await notifService.create({
          actorId: userId,
          userId: post.userId,
          postId: postId,
          type: "like",
        });
        message = "like";
      } else {
        await postService.dislike({ postId, userId });
        message = "dislike";
      }
      revalidateTag(POST.detail);
      revalidateTag(POST.homePosts);
      revalidateTag(POST.likes);
      return message;
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
