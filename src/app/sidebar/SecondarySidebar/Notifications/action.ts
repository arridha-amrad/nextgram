"use server";

import { cacheKeys } from "@/lib/cacheKeys";
import FollowService from "@/lib/drizzle/services/FollowService";
import NotificationService from "@/lib/drizzle/services/NotificationService";
import { SafeActionError } from "@/lib/errors/SafeActionError";
import { authActionClient } from "@/lib/safeAction";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export const acceptFollow = authActionClient
  .schema(
    z.object({
      userRequestId: z.string(),
      notificationId: z.number(),
    }),
  )
  .action(
    async ({
      parsedInput: { notificationId, userRequestId },
      ctx: {
        session: {
          user: { id },
        },
      },
    }) => {
      const notifService = new NotificationService();
      const followService = new FollowService();
      const notif = await notifService.findById(notificationId);
      if (notif.length === 0) {
        throw new SafeActionError("post not found");
      }
      await followService.create({ followId: id, userId: userRequestId });
      await notifService.removeById(notificationId);
      revalidateTag(cacheKeys.users.profile);
      revalidateTag(cacheKeys.users.notifications);
    },
  );

export const declineFollow = authActionClient
  .schema(
    z.object({
      notificationId: z.number(),
    }),
  )
  .action(async ({ parsedInput: { notificationId } }) => {
    const notifService = new NotificationService();
    const notif = await notifService.findById(notificationId);
    if (notif.length === 0) {
      throw new SafeActionError("post not found");
    }
    await notifService.removeById(notificationId);
    revalidateTag(cacheKeys.users.profile);
    revalidateTag(cacheKeys.users.notifications);
  });

export const readNotifications = authActionClient
  .schema(
    z.object({
      ids: z.number().array(),
    }),
  )
  .action(async ({ ctx, parsedInput: { ids } }) => {
    const {
      session: {
        user: { id: userId },
      },
    } = ctx;
    const notifService = new NotificationService();
    await notifService.updateReadNotification(userId, ids);
    // revalidateTag(cacheKeys.users.notifications);
  });
