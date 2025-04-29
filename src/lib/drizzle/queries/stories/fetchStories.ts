import { eq, and, gte, lte, inArray, desc, sql } from "drizzle-orm";
import { db } from "../../db";
import { StoriesTable, UsersTable } from "../../schema";
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
      });
    }
    return acc;
  }, [] as TStory[]);

  return groupedByUsername;
};

export const fetchStories = async (userId: string) => {
  const followingUserIds = await getFollowingsUserIds(userId);
  const data = await query(userId, followingUserIds);
  return data;
};
