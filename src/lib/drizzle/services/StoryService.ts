import { and, eq, gte, lte, sql } from "drizzle-orm";
import { StoriesTable, StoryWatchers } from "../schema";
import BaseService from "./BaseService";

export default class StoryService extends BaseService {
  public async create(data: typeof StoriesTable.$inferInsert) {
    const result = await this.db.insert(StoriesTable).values(data);
    return result;
  }

  public async addWatcher(watcherId: string, storyId: string) {
    const result = await this.db
      .insert(StoryWatchers)
      .values({ storyId, userId: watcherId })
      .returning();
    return result;
  }

  public async hasUserStoriesWatched(userId: string) {
    const result = await this.db
      .select({
        hasWatched: sql<boolean>`
        CASE WHEN NOT EXISTS (
          SELECT 1 FROM ${StoriesTable}
          WHERE ${StoriesTable.userId} = ${userId}
          AND ${StoriesTable.createdAt} BETWEEN NOW() - INTERVAL '24 hours' AND NOW()
          AND NOT EXISTS (
            SELECT 1 FROM ${StoryWatchers}
            WHERE ${StoryWatchers.storyId} = ${StoriesTable.id}
            AND ${StoryWatchers.userId} = ${userId}
          )
        ) THEN true ELSE false END
      `,
      })
      .from(StoriesTable)
      .where(eq(StoriesTable.userId, userId));
    return result;
  }

  public async isUserStoriesExists(userId: string) {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const result = await this.db
      .select()
      .from(StoriesTable)
      .where(
        and(
          eq(StoriesTable.userId, userId),
          gte(StoriesTable.createdAt, twentyFourHoursAgo),
          lte(StoriesTable.createdAt, now),
        ),
      );
    if (result.length === 0) return false;
    return true;
  }
}
