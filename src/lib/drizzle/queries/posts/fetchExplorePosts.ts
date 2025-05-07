import { cacheKeys } from "@/lib/cacheKeys";
import { and, count, desc, eq, lt, not, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { db } from "../../db";
import {
  CommentsTable,
  PostLikesTable,
  PostsTable,
  RepliesTable,
  UsersTable,
} from "../../schema";
import { InfiniteResult } from "../type";
import { TUserPost } from "./fetchUserPosts";

const LIMIT = 24;

const query = async (userId: string, date: Date) => {
  return db
    .select({
      id: PostsTable.id,
      urls: PostsTable.urls,
      createdAt: PostsTable.createdAt,
      sumLikes: sql<number>`
        CAST(COUNT(DISTINCT ${PostLikesTable}) AS Int)
      `,
      sumComments: sql<number>`
        CAST(COUNT(DISTINCT ${RepliesTable.id}) AS Int) +
        CAST(COUNT(DISTINCT ${CommentsTable.id}) AS Int)
      `,
    })
    .from(PostsTable)
    .where(
      and(
        lt(PostsTable.createdAt, date),
        not(eq(PostsTable.userId, userId)),
        eq(UsersTable.isProtected, false),
      ),
    )
    .innerJoin(UsersTable, eq(UsersTable.id, PostsTable.userId))
    .leftJoin(PostLikesTable, eq(PostsTable.id, PostLikesTable.postId))
    .leftJoin(CommentsTable, eq(CommentsTable.postId, PostsTable.id))
    .leftJoin(RepliesTable, eq(RepliesTable.commentId, CommentsTable.id))
    .orderBy(desc(PostsTable.createdAt))
    .groupBy(PostsTable.id)
    .limit(LIMIT);
};

export const fetchExplorePosts = unstable_cache(
  async (userId: string, date?: Date): Promise<InfiniteResult<TUserPost>> => {
    const queryDate = date ?? new Date();
    const data = await query(userId, queryDate);

    const [result] = await db
      .select({
        total: count(),
      })
      .from(PostsTable)
      .where(
        and(
          lt(PostsTable.createdAt, queryDate),
          not(eq(PostsTable.userId, userId)),
          eq(UsersTable.isProtected, false),
        ),
      )
      .innerJoin(UsersTable, eq(UsersTable.id, PostsTable.userId));

    return { data, total: result.total, date: queryDate };
  },
  [cacheKeys.posts.explore],
  { revalidate: 60, tags: [cacheKeys.posts.explore] },
);

export const loadMoreExplorePosts = async (userId: string, date: Date) => {
  const data = await query(userId, date);
  return data;
};
