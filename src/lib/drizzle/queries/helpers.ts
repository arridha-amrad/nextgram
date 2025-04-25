import { db } from "../db";
import { FollowingsTable } from "../schema";
import { eq } from "drizzle-orm";

export const getFollowingsUserIds = async (userId: string) => {
  const followings = await db
    .select({
      userId: FollowingsTable.followId,
    })
    .from(FollowingsTable)
    .where(eq(FollowingsTable.userId, userId));
  const users = followings.map((f) => f.userId);
  return users;
};
