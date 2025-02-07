import { db } from "@/lib/drizzle/db";
import {
  CommentLikesTable,
  CommentsTable,
  RepliesTable,
  UsersTable,
} from "@/lib/drizzle/schema";
import { and, desc, eq, lt, sql } from "drizzle-orm";
import crypto from "crypto";
import { unstable_cache } from "next/cache";
import { COMMENTS } from "@/lib/cacheKeys";

const LIMIT = 10;

type Args = {
  postId: string;
  userId?: string;
  date?: Date;
};

const query = async (postId: string, date: Date, userId?: string) => {
  return db
    .select({
      id: CommentsTable.id,
      userId: CommentsTable.userId,
      username: UsersTable.username,
      avatar: UsersTable.avatar,
      createdAt: CommentsTable.createdAt,
      updatedAt: CommentsTable.updatedAt,
      postId: CommentsTable.postId,
      message: CommentsTable.message,
      sumLikes: sql<number>`
        CAST(COUNT(DISTINCT ${CommentLikesTable}) AS Int)
      `,
      sumReplies: sql<number>`
        CAST(COUNT(DISTINCT ${RepliesTable.id}) AS Int)
      `,
      isLiked: sql<boolean>`
        CASE WHEN EXISTS (
          SELECT 1 
          FROM ${CommentLikesTable}
          WHERE ${CommentLikesTable.commentId} = ${CommentsTable.id}
          AND ${CommentLikesTable.userId} = ${userId}
        ) THEN true
          ELSE false
        END
      `,
    })
    .from(CommentsTable)
    .where(
      and(eq(CommentsTable.postId, postId), lt(CommentsTable.createdAt, date)),
    )
    .innerJoin(UsersTable, eq(CommentsTable.userId, UsersTable.id))
    .leftJoin(
      CommentLikesTable,
      eq(CommentsTable.id, CommentLikesTable.commentId),
    )
    .leftJoin(RepliesTable, eq(RepliesTable.commentId, CommentsTable.id))
    .orderBy(desc(CommentsTable.createdAt))
    .limit(LIMIT)
    .groupBy(CommentsTable.id, UsersTable.id);
};

export type TComment = Awaited<ReturnType<typeof query>>[number];

export const fetchComments = unstable_cache(
  async ({ postId, userId, date = new Date() }: Args): Promise<TComment[]> => {
    if (!userId) {
      userId = crypto.randomUUID();
    }
    const data = await query(postId, date, userId);
    return data;
  },
  [COMMENTS.post],
  {
    tags: [COMMENTS.post],
    revalidate: 60,
  },
);
