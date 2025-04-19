"use server";

import { cacheKeys } from "@/lib/cacheKeys";
import UserService from "@/lib/drizzle/services/UserService";
import { authActionClient } from "@/lib/safeAction";
import { revalidateTag } from "next/cache";

export const updateAccountPrivacy = authActionClient.action(
  async ({
    ctx: {
      session: {
        user: { id: userId },
      },
    },
  }) => {
    const userService = new UserService();
    const [user] = await userService.findUserById(userId);
    await userService.updateUser(userId, { isProtected: !user.isProtected });
    revalidateTag(cacheKeys.users.profile);
  },
);
