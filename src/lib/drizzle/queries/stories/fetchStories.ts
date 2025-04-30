import { cacheKeys } from "@/lib/cacheKeys";
import { and, desc, eq, gte, inArray, lte, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { db } from "../../db";
import { StoriesTable, StoryWatchers, UsersTable } from "../../schema";
import { getFollowingsUserIds } from "../helpers";

export type TStory = {
  username: string;
  avatar: string | null;
  stories: {
    id: string;
    type: string;
    content: string;
    createdAt: Date;
    duration: number;
    hasWatched: boolean;
  }[];
};

const query = async (userId: string, followingUserIds: string[]) => {
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
    .innerJoin(UsersTable, eq(StoriesTable.userId, UsersTable.id))
    .where(
      and(
        gte(StoriesTable.createdAt, twentyFourHoursAgo),
        lte(StoriesTable.createdAt, now),
        inArray(StoriesTable.userId, [...followingUserIds, userId]),
      ),
    )
    .orderBy(desc(StoriesTable.createdAt));

  const groupedByUsername = result.reduce((acc, row) => {
    const existingUser = acc.find((u) => u.username === row.creatorUsername);
    if (!existingUser) {
      acc.push({
        avatar: row.creatorAvatar,
        username: row.creatorUsername,
        stories: [
          {
            content: row.content,
            createdAt: row.createdAt,
            duration: row.duration,
            id: row.id,
            type: row.type,
            hasWatched: row.hasWatched,
          },
        ],
      });
    } else {
      const idx = acc.findIndex((v) => v.username === existingUser.username);
      acc[idx].stories.push({
        content: row.content,
        createdAt: row.createdAt,
        duration: row.duration,
        id: row.id,
        type: row.type,
        hasWatched: row.hasWatched,
      });
    }
    return acc;
  }, [] as TStory[]);

  return groupedByUsername;
};

export const fetchStories = unstable_cache(
  async (userId: string) => {
    const followingUserIds = await getFollowingsUserIds(userId);
    const data = await query(userId, followingUserIds);
    const date = new Date();
    return { data, date };
  },
  [cacheKeys.stories.index],
  {
    revalidate: 60,
    tags: [cacheKeys.stories.index],
  },
);
