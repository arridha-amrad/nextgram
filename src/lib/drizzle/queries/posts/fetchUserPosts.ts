import { cacheKeys } from "@/lib/cacheKeys";
import { db } from "@/lib/drizzle/db";
import { InfiniteResult } from "@/lib/drizzle/queries/type";
import { and, desc, eq, lt, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import {
  CommentsTable,
  PostLikesTable,
  PostsTable,
  RepliesTable,
  UsersTable,
} from "../../schema";

export const LIMIT = 6;

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
    .where(and(eq(PostsTable.userId, userId), lt(PostsTable.createdAt, date)))
    .leftJoin(PostLikesTable, eq(PostsTable.id, PostLikesTable.postId))
    .leftJoin(CommentsTable, eq(CommentsTable.postId, PostsTable.id))
    .leftJoin(RepliesTable, eq(RepliesTable.commentId, CommentsTable.id))
    .orderBy(desc(PostsTable.createdAt))
    .groupBy(PostsTable.id)
    .limit(LIMIT);
};

export type TUserPost = Awaited<ReturnType<typeof query>>[number];

export const p1 = db
  .select({ userId: UsersTable.id })
  .from(UsersTable)
  .where(eq(UsersTable.username, sql.placeholder("username")))
  .prepare("p1");

const fn = async (username: string, date: Date) => {
  try {
    const [{ userId }] = await p1.execute({ username });
    if (!userId) {
      return {
        data: [],
        date,
        total: 0,
      };
    }
    const data = await query(userId, date);
    return {
      data,
      date,
    };
  } catch (err) {
    throw err;
  }
};

export type Result = Omit<InfiniteResult<TUserPost>, "total">;

export const loadMoreUserPosts = async ({
  date,
  username,
}: {
  username: string;
  date: Date;
}): Promise<Result> => {
  try {
    const data = await fn(username, date);
    return data;
  } catch (err) {
    throw err;
  }
};

export const fetchUserPosts = unstable_cache(
  async (username: string): Promise<InfiniteResult<TUserPost>> => {
    const data = await fn(username, new Date());
    const storedUser = await p1.execute({ username });

    if (storedUser.length === 0) {
      throw new Error("User not found");
    }

    const userId = storedUser[0].userId;

    const [result] = await db
      .select({
        total: sql<number>`cast(count(${PostsTable.id}) as int)`,
      })
      .from(PostsTable)
      .where(eq(PostsTable.userId, userId));
    return {
      ...data,
      total: result.total,
    };
  },
  [cacheKeys.posts.user],
  {
    revalidate: 60,
    tags: [cacheKeys.posts.user],
  },
);
