"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";
import { cacheKeys } from "../cacheKeys";
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
 * 1. Determined if this action is follow or unFollow against the following table
 *    if no record found, there are 3 possibility actions: follow or send-following-request or cancel-following-request
 *    if there is a record this action is unFollow
 * 2. If the user account is private then check if the notification exists.
 *    if it is, delete the notification-- it means that the user cancel his following request
 *    if it is not, create a notification to target user that he/she has got following-request from another user.
 * 3. If the user account is public
 *    add new data to following table
 * 4. If the action is unFollow delete the related data from following and notification table.
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
        const storedNotification = await notifService.find({
          actorId,
          userId: targetId,
          type: "follow",
        });
        if (storedNotification.length === 0) {
          await notifService.create({
            actorId,
            userId: targetId,
            type: "follow",
          });
          message = "request";
        } else {
          await notifService.remove({
            actorId,
            userId: targetId,
            type: "follow",
          });
          message = "cancel-request";
        }
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
