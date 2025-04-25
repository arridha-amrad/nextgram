import { desc, eq, inArray, and, gte, lte } from "drizzle-orm";
import { db } from "../../db";
import { StoriesTable, UsersTable } from "../../schema";
import { getFollowingsUserIds } from "../helpers";
import { unstable_cache } from "next/cache";
import { cacheKeys } from "@/lib/cacheKeys";

async function query(userId: string, followingUserIds: string[]) {
  // Calculate the time range (now and 24 hours ago)
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const result = await db
    .select({
      username: UsersTable.username,
      avatar: UsersTable.avatar,
    })
    .from(StoriesTable)
    .innerJoin(UsersTable, eq(StoriesTable.userId, UsersTable.id))
    .where(
      and(
        gte(StoriesTable.createdAt, twentyFourHoursAgo),
        lte(StoriesTable.createdAt, now),
        inArray(StoriesTable.userId, [...followingUserIds, userId]),
      ),
    )
    .orderBy(desc(StoriesTable.createdAt));

  const reducedResult = result.reduce(
    (acc, row) => {
      const existingUser = acc.find((u) => u.username === row.username);
      if (!existingUser) {
        acc.push(row);
      }
      return acc;
    },
    [] as { username: string; avatar: string | null }[],
  );

  return reducedResult;
}

export type TFeedStory = Awaited<ReturnType<typeof query>>[number];

export const fetchStoriesAfFeeds = unstable_cache(
  async (userId: string) => {
    const followingUsers = await getFollowingsUserIds(userId);
    const result = await query(userId, followingUsers);
    return result;
  },
  [cacheKeys.stories.feed],
  { revalidate: 60, tags: [cacheKeys.stories.feed] },
);
