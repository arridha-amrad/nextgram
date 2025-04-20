import { and, eq } from "drizzle-orm";
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

  public async find(args: typeof NotificationsTable.$inferSelect) {
    const conditions = [eq(NotificationsTable.userId, args.userId)];
    if (args.commentId) {
      conditions.push(eq(NotificationsTable.commentId, args.commentId));
    }
    if (args.actorId) {
      conditions.push(eq(NotificationsTable.actorId, args.actorId));
    }
    if (args.id) {
      conditions.push(eq(NotificationsTable.id, args.id));
    }
    if (args.isRead) {
      conditions.push(eq(NotificationsTable.isRead, args.isRead));
    }
    if (args.postId) {
      conditions.push(eq(NotificationsTable.postId, args.postId));
    }
    if (args.type) {
      conditions.push(eq(NotificationsTable.type, args.type));
    }
    const result = await this.db
      .select()
      .from(NotificationsTable)
      .where(and(...conditions));
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
