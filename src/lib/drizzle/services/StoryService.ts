import { and, eq, gte, lte } from "drizzle-orm";
import { StoriesTable } from "../schema";
import BaseService from "./BaseService";

export default class StoryService extends BaseService {
  public async create(data: typeof StoriesTable.$inferInsert) {
    const result = await this.db.insert(StoriesTable).values(data);
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
