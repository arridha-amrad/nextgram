"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { cacheKeys } from "../cacheKeys";
import { fetchUserFollowers } from "../drizzle/queries/users/fetchUserFollowers";
import FollowService from "../drizzle/services/FollowService";
import NotificationService from "../drizzle/services/NotificationService";
import UserService from "../drizzle/services/UserService";
import { SafeActionError } from "../errors/SafeActionError";
import { authActionClient } from "../safeAction";

/**
 * constraints:
 * 1. The target user must be existed(targetId)
 * 2. The actor must be authenticated(userId)
 * actions:
 * 1. If the action is follow and user account is private then create notification to target user that he/she has got follow request from another user.
 * 2. If the action is follow and account is public insert new data to follow table
 * 2. If the action is unFollow delete a data from follow table
 */
export const follow = authActionClient
  .schema(
    z.object({
      targetId: z.string(),
    }),
  )
  .bindArgsSchemas<[pathname: z.ZodString]>([z.string()])
  .action(async ({ ctx: { session }, parsedInput: { targetId } }) => {
    const actorId = session.user.id;
    const followService = new FollowService();
    const userService = new UserService();
    const notifService = new NotificationService();

    const storedTargetUser = await userService.findUserById(targetId);
    if (storedTargetUser.length === 0) {
      throw new SafeActionError("User not found");
    }
    const targetUser = storedTargetUser[0];

    const rowExists = await followService.find({
      followId: targetId,
      userId: actorId,
    });
    let message = "";
    if (rowExists.length === 0) {
      if (targetUser.isProtected) {
        await notifService.create({
          actorId,
          userId: targetId,
          type: "follow",
        });
        message = "request";
      } else {
        await followService.create({ followId: targetId, userId: actorId });
        message = "follow";
      }
    } else {
      await followService.delete({ followId: targetId, userId: actorId });
      await notifService.remove({
        actorId,
        userId: targetId,
        type: "follow",
      });
      message = "unFollow";
    }
    revalidateTag(cacheKeys.users.profile);
    revalidateTag(cacheKeys.users.suggestions);
    revalidateTag(cacheKeys.posts.home);
    return message;
  });

export const loadMoreFollowers = authActionClient
  .schema(
    z.object({
      username: z.string(),
    }),
  )
  .bindArgsSchemas<[pathname: z.ZodString]>([z.string()])
  .action(
    async ({
      ctx: { session },
      parsedInput: { username },
      bindArgsParsedInputs: [pathname],
    }) => {
      if (!session) {
        return redirect(`/login?cb_url?=${pathname}`);
      }
      const result = await fetchUserFollowers({
        username,
        authUserId: session.user.id,
      });
      return result;
    },
  );
