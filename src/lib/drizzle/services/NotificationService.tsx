import { and, eq, inArray } from "drizzle-orm";
import { NotificationsTable } from "../schema";
import BaseService from "./BaseService";

type NotifType = typeof NotificationsTable.$inferSelect;

export default class NotificationService extends BaseService {
  public async create(data: typeof NotificationsTable.$inferInsert) {
    const result = await this.db
      .insert(NotificationsTable)
      .values(data)
      .returning();
    return result;
  }

  public async find(data: Partial<NotifType>) {
    const conditions = [];
    if (data.actorId) {
      conditions.push(eq(NotificationsTable.actorId, data.actorId));
    }
    if (data.commentId) {
      conditions.push(eq(NotificationsTable.commentId, data.commentId));
    }
    if (data.postId) {
      conditions.push(eq(NotificationsTable.postId, data.postId));
    }
    if (data.replyId) {
      conditions.push(eq(NotificationsTable.replyId, data.replyId));
    }
    if (data.type) {
      conditions.push(eq(NotificationsTable.type, data.type));
    }
    if (data.userId) {
      conditions.push(eq(NotificationsTable.userId, data.userId));
    }

    const result = await this.db
      .select()
      .from(NotificationsTable)
      .where(and(...conditions));
    return result;
  }

  public async remove(data: Partial<NotifType>) {
    const conditions = [];
    if (data.actorId) {
      conditions.push(eq(NotificationsTable.actorId, data.actorId));
    }
    if (data.commentId) {
      conditions.push(eq(NotificationsTable.commentId, data.commentId));
    }
    if (data.postId) {
      conditions.push(eq(NotificationsTable.postId, data.postId));
    }
    if (data.replyId) {
      conditions.push(eq(NotificationsTable.replyId, data.replyId));
    }
    if (data.type) {
      conditions.push(eq(NotificationsTable.type, data.type));
    }
    if (data.userId) {
      conditions.push(eq(NotificationsTable.userId, data.userId));
    }

    const result = await this.db
      .delete(NotificationsTable)
      .where(and(...conditions))
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
