"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";
import { cacheKeys } from "../cacheKeys";
import PostService from "../drizzle/services/PostService";
import { authActionClient } from "../safeAction";
import NotificationService from "../drizzle/services/NotificationService";
import { SafeActionError } from "../errors/SafeActionError";
import StorageService from "../StorageService";

const revalidatePostAndNotificationsAnywherePossible = () => {
  revalidateTag(cacheKeys.posts.home);
  revalidateTag(cacheKeys.posts.detail);
  revalidateTag(cacheKeys.posts.user);
  revalidateTag(cacheKeys.users.notifications);
  revalidateTag(cacheKeys.posts.save);
};

/**
 * remove post constraints:
 * 1. The Post must exist
 * 2. The actor is the post owner
 * required actions:
 * 1. delete files related to the post
 * 2. delete any notifications related to the post
 * 3. delete the post it self
 */
export const removePost = authActionClient
  .schema(
    z.object({
      postId: z.string(),
    }),
  )
  .action(async ({ parsedInput, ctx }) => {
    const userId = ctx.session.user.id;
    const postId = parsedInput.postId;

    const postService = new PostService();
    const storageService = new StorageService();

    const storedPost = await postService.findById(postId);
    if (storedPost.length === 0) {
      throw new SafeActionError("Post not found");
    }

    const post = storedPost[0];

    if (post.userId !== userId) {
      throw new SafeActionError("You are not authorized");
    }

    // remove files from storage
    const fileUrls = post.urls.map((d) => d.publicId);
    await postService.removePostById(post.id);

    revalidatePostAndNotificationsAnywherePossible();

    await storageService.remove(fileUrls);
    console.log("post removed");
  });

/**
 * save post constraints:
 * 1. The post exists
 * 2. The saved post data cannot be duplicated
 * required actions:
 * 1. Store/remove the post in/from SavedPostsTable
 * 2. If the action is store and the actor is not the post owner then create a notification for the posts'owner that someone bookmark his post.
 * 3. If the action is remove(cancel bookmark) and the actor is not the post owner then delete the stored notification as well
 * 4. revalidate cache related to the post
 */
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

    const storedPost = await postService.findById(postId);
    if (storedPost.length === 0) {
      throw new SafeActionError("Post not found");
    }
    const post = storedPost[0];

    const savedPosts = await postService.findSavedPost({
      postId,
      userId,
    });

    let message = "";

    if (savedPosts.length === 0) {
      await postService.savePost({ postId, userId });
      const [post] = await postService.findById(postId);
      if (userId !== post.userId) {
        await notifService.create({
          actorId: userId,
          userId: post.userId,
          postId: postId,
          type: "save",
        });
      }
      message = "saved";
    } else {
      await postService.deleteSavedPost({ postId, userId });
      if (userId !== post.userId) {
        await notifService.remove({
          actorId: userId,
          userId: post.userId,
          postId: post.id,
          type: "save",
        });
      }
      message = "delete";
    }
    revalidatePostAndNotificationsAnywherePossible();
    return message;
  });

/**
 * like post constraints:
 * 1. The post exists
 * 2. The liked post data cannot be duplicated
 * required actions:
 * 1. Store/remove the post in/from PostLikesTable
 * 2. If the action is like and the actor is not the post owner then create a notification for the posts'owner that someone like his post.
 * 3. If the action is dislike and the actor is not the post owner, delete the stored notification as well
 * 4. revalidate cache related to the post
 */
export const likePost = authActionClient
  .schema(
    z.object({
      postId: z.string(),
    }),
  )
  .bindArgsSchemas<[pathname: z.ZodString]>([z.string()])
  .action(async ({ ctx: { session }, parsedInput: { postId } }) => {
    const userId = session.user.id;
    const postService = new PostService();
    const notifService = new NotificationService();

    try {
      const storedPost = await postService.findById(postId);
      if (storedPost.length === 0) {
        throw new SafeActionError("Post not found");
      }
      const post = storedPost[0];
      const likeRows = await postService.findLike({ postId, userId });
      let message = "";
      if (likeRows.length === 0) {
        await postService.like({ postId, userId });
        if (userId !== post.userId) {
          await notifService.create({
            actorId: userId,
            userId: post.userId,
            postId: postId,
            type: "like",
          });
        }
        message = "like";
      } else {
        await postService.dislike({ postId, userId });
        if (userId !== post.userId) {
          await notifService.remove({
            actorId: userId,
            userId: post.userId,
            postId: post.id,
            type: "like",
          });
        }
        message = "dislike";
      }
      revalidatePostAndNotificationsAnywherePossible();
      return message;
    } catch (err) {
      console.log(err);
      throw err;
    }
  });
