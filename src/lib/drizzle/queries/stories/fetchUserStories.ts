import { cacheKeys } from "@/lib/cacheKeys";
import { and, desc, eq, gte, lte, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { db } from "../../db";
import { StoriesTable, StoryWatchers, UsersTable } from "../../schema";
import { TStory } from "./fetchStories";

const query = async (userId: string) => {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const result = await db
    .select({
      id: StoriesTable.id,
      creatorId: StoriesTable.userId,
      creatorUsername: UsersTable.username,
      creatorAvatar: UsersTable.avatar,
      type: StoriesTable.type,
      content: StoriesTable.url,
      createdAt: StoriesTable.createdAt,
      duration: sql<number>`3000`,
      hasWatched: sql<boolean>`
        CASE WHEN EXISTS(
          SELECT 1 FROM ${StoryWatchers}
          WHERE ${StoryWatchers.storyId} = ${StoriesTable.id}
          AND ${StoryWatchers.userId} = ${userId}
        ) THEN true ELSE false END
      `,
    })
    .from(StoriesTable)
    .innerJoin(UsersTable, eq(UsersTable.id, StoriesTable.userId))
    .where(
      and(
        eq(StoriesTable.userId, userId),
        gte(StoriesTable.createdAt, twentyFourHoursAgo),
        lte(StoriesTable.createdAt, now),
      ),
    )
    .orderBy(desc(StoriesTable.createdAt));

  const groupedByUsername = result.reduce(
    (acc, row) => {
      if (!acc.username) {
        acc.username = row.creatorUsername;
        acc.avatar = row.creatorAvatar;
        acc.stories = [];
      }

      acc.stories.push({
        content: row.content,
        createdAt: row.createdAt,
        duration: row.duration,
        hasWatched: row.hasWatched,
        id: row.id,
        type: row.type,
      });

      return acc;
    },
    {
      username: "",
      avatar: "",
      stories: [],
    } as TStory,
  );

  return groupedByUsername;
};

export const fetchUserStories = unstable_cache(
  async (userId: string) => {
    const stories = await query(userId);
    return stories;
  },
  [cacheKeys.stories.user],
  { revalidate: 60, tags: [cacheKeys.stories.user] },
);
