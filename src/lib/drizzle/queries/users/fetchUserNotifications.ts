import { NOTIFICATIONS } from "@/lib/cacheKeys";
import { db } from "@/lib/drizzle/db";
import { desc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import {
  CommentsTable,
  NotificationsTable,
  PostsTable,
  RepliesTable,
  UsersTable,
} from "../../schema";

const query = async (userId: string) => {
  return db
    .select({
      id: NotificationsTable.id,
      userId: NotificationsTable.userId,
      actorId: NotificationsTable.actorId,
      actorUsername: UsersTable.username,
      actorAvatar: UsersTable.avatar,
      type: NotificationsTable.type,
      postId: NotificationsTable.postId,
      postData: PostsTable.urls,
      commentId: NotificationsTable.commentId,
      commentData: CommentsTable.message,
      replyId: NotificationsTable.replyId,
      replyData: RepliesTable.message,
      createdAt: NotificationsTable.createdAt,
      isRead: NotificationsTable.isRead,
    })
    .from(NotificationsTable)
    .where(eq(NotificationsTable.userId, userId))
    .innerJoin(UsersTable, eq(UsersTable.id, NotificationsTable.actorId))
    .leftJoin(PostsTable, eq(PostsTable.id, NotificationsTable.postId))
    .leftJoin(CommentsTable, eq(CommentsTable.id, NotificationsTable.commentId))
    .leftJoin(RepliesTable, eq(RepliesTable.id, NotificationsTable.replyId))
    .orderBy(desc(NotificationsTable.createdAt));
};

export type TNotification = Awaited<ReturnType<typeof query>>[number];

export const fetchNotifications = unstable_cache(
  async (userId: string) => {
    const result = await query(userId);
    return result;
  },
  [NOTIFICATIONS.all],
  { tags: [NOTIFICATIONS.all], revalidate: 60 },
);
