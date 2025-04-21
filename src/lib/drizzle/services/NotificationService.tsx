import { and, eq, inArray } from "drizzle-orm";
import { NotificationsTable } from "../schema";
import BaseService from "./BaseService";

export default class NotificationService extends BaseService {
  public async create(data: typeof NotificationsTable.$inferInsert) {
    const result = await this.db
      .insert(NotificationsTable)
      .values(data)
      .returning();
    return result;
  }

  public async findById(id: number) {
    const result = await this.db
      .select()
      .from(NotificationsTable)
      .where(eq(NotificationsTable.id, id));
    return result;
  }

  public async updateReadNotification(userId: string, notifIds: number[]) {
    const result = await this.db
      .update(NotificationsTable)
      .set({ isRead: true })
      .where(
        and(
          eq(NotificationsTable.userId, userId),
          inArray(NotificationsTable.id, notifIds),
        ),
      )
      .returning();
    return result;
  }

  public async removeById(id: number) {
    const result = await this.db
      .delete(NotificationsTable)
      .where(eq(NotificationsTable.id, id))
      .returning();
    return result;
  }
}
