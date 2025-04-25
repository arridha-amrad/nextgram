import { cacheKeys } from "@/lib/cacheKeys";
import { and, eq, gte, lte, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { db } from "../../db";
import { StoriesTable, UsersTable } from "../../schema";

const query = async (userId: string) => {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  return db
    .select({
      id: StoriesTable.id,
      username: UsersTable.username,
      avatar: UsersTable.avatar,
      type: StoriesTable.type,
      content: StoriesTable.url,
      createdAt: StoriesTable.createdAt,
      duration: sql<number>`3000`,
    })
    .from(StoriesTable)
    .innerJoin(UsersTable, eq(UsersTable.id, StoriesTable.userId))
    .where(
      and(
        eq(StoriesTable.userId, userId),
        gte(StoriesTable.createdAt, twentyFourHoursAgo),
        lte(StoriesTable.createdAt, now),
      ),
    );
};

export type TUserStory = Awaited<ReturnType<typeof query>>[number];

export const fetchUserStories = unstable_cache(
  async (userId: string) => {
    const stories = await query(userId);
    return stories;
  },
  [cacheKeys.stories.user],
  { revalidate: 60, tags: [cacheKeys.stories.user] },
);
