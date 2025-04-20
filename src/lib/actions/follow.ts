"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { fetchUserFollowers } from "../drizzle/queries/users/fetchUserFollowers";
import FollowService from "../drizzle/services/FollowService";
import { authActionClient } from "../safeAction";
import { revalidateTag } from "next/cache";
import { POST, USERS } from "../cacheKeys";
import UserService from "../drizzle/services/UserService";
import NotificationService from "../drizzle/services/NotificationService";

const schema = z.object({
  followId: z.string(),
});

export const follow = authActionClient
  .schema(schema)
  .bindArgsSchemas<[pathname: z.ZodString]>([z.string()])
  .action(async ({ ctx: { session }, parsedInput: { followId } }) => {
    const { id } = session.user;
    const followService = new FollowService();
    const userService = new UserService();
    const notifService = new NotificationService();
    const rowExists = await followService.find({ followId, userId: id });
    let message = "";
    if (rowExists.length === 0) {
      const [user] = await userService.findUserById(followId);
      if (user.isProtected) {
        await notifService.create({
          actorId: id,
          userId: followId,
          type: "follow",
        });
        message = "request";
      } else {
        await followService.create({ followId, userId: id });
        message = "follow";
      }
    } else {
      await followService.delete({ followId, userId: id });
      message = "unFollow";
    }
    revalidateTag(USERS.profile);
    revalidateTag(USERS.suggestedUsers);
    revalidateTag(POST.homePosts);
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
