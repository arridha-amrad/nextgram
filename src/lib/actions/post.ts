"use server";

import { z } from "zod";
import { fetchFeedPosts } from "../drizzle/queries/posts/fetchFeedPosts";
import { fetchPostLikes } from "../drizzle/queries/posts/fetchPostLikes";
import { fetchUserPosts } from "../drizzle/queries/posts/fetchUserPosts";
import PostService from "../drizzle/services/PostService";
import { authActionClient } from "../safeAction";
import { revalidateTag } from "next/cache";
import { POST } from "../cacheKeys";

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

    const savedPosts = await postService.findSavedPost({ postId, userId });
    let message = "";

    if (savedPosts.length === 0) {
      await postService.savePost({ postId, userId });
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
    try {
      const likeRows = await postService.findLike({ postId, userId });
      let message = "";
      if (likeRows.length === 0) {
        await postService.like({ postId, userId });
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

export const loadMoreFeedPosts = authActionClient
  .schema(
    z.object({
      page: z.number(),
      date: z.date(),
      total: z.number(),
    }),
  )
  .bindArgsSchemas<[pathname: z.ZodString]>([z.string()])
  .action(async ({ ctx: { session }, parsedInput: { date, page, total } }) => {
    const result = await fetchFeedPosts({
      page,
      userId: session.user.id,
      date,
      total,
    });
    return result;
  });

export const loadMoreLovers = authActionClient
  .schema(
    z.object({
      postId: z.string(),
      page: z.number().optional(),
    }),
  )
  .bindArgsSchemas<[pathname: z.ZodString]>([z.string()])
  .action(async ({ ctx: { session }, parsedInput: { postId, page } }) => {
    const result = await fetchPostLikes({
      postId,
      authUserId: session.user.id,
      page,
    });
    return result;
  });

export const loadMoreUserPosts = authActionClient
  .schema(
    z.object({
      username: z.string(),
      date: z.date(),
      total: z.number(),
    }),
  )
  .bindArgsSchemas<[pathname: z.ZodString]>([z.string()])
  .action(async ({ parsedInput: { date, total, username } }) => {
    const result = await fetchUserPosts({
      username,
      date,
      total,
    });
    return result;
  });
