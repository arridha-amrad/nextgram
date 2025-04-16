import { POST } from "@/lib/cacheKeys";
import { db } from "@/lib/drizzle/db";
import { InfiniteResult } from "@/lib/drizzle/queries/type";
import { desc, eq, lt, sql, and } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import {
  CommentsTable,
  PostLikesTable,
  PostsTable,
  RepliesTable,
  SavedPostsTable,
} from "../../schema";
import { p1, Result, TUserPost } from "./fetchUserPosts";

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
    .from(SavedPostsTable)
    .where(
      and(eq(SavedPostsTable.userId, userId), lt(PostsTable.createdAt, date)),
    )
    .innerJoin(PostsTable, eq(PostsTable.id, SavedPostsTable.postId))
    .leftJoin(PostLikesTable, eq(PostsTable.id, PostLikesTable.postId))
    .leftJoin(CommentsTable, eq(CommentsTable.postId, PostsTable.id))
    .leftJoin(RepliesTable, eq(RepliesTable.commentId, CommentsTable.id))
    .orderBy(desc(PostsTable.createdAt))
    .groupBy(PostsTable.id)
    .limit(LIMIT);
};

const fn = async (username: string, date: Date) => {
  try {
    const [{ userId }] = await p1.execute({ username });
    if (!userId) {
      return {
        data: [],
        total: 0,
        date,
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

export const loadMoreUserSavedPosts = async ({
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

export const fetchUserSavedPosts = unstable_cache(
  async (username: string): Promise<InfiniteResult<TUserPost>> => {
    const data = await fn(username, new Date());
    const [{ userId }] = await p1.execute({ username });
    const [result] = await db
      .select({
        total: sql<number>`cast(count(${SavedPostsTable.userId}) as int)`,
      })
      .from(SavedPostsTable)
      .where(eq(SavedPostsTable.userId, userId));
    return {
      ...data,
      total: result.total,
    };
  },
  [POST.savedPosts],
  {
    tags: [POST.savedPosts],
    revalidate: 60 * 10, // 10 minutes,
  },
);
