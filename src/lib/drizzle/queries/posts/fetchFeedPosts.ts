import { cacheKeys } from "@/lib/cacheKeys";
import { db } from "@/lib/drizzle/db";
import { TInfiniteResult } from "@/lib/drizzle/queries/type";
import {
  CommentsTable,
  FollowingsTable,
  PostLikesTable,
  PostsTable,
  RepliesTable,
  SavedPostsTable,
  StoriesTable,
  UsersTable,
} from "@/lib/drizzle/schema";
import { and, desc, eq, inArray, lt, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";

const LIMIT = 5;

type TArgs = {
  userId: string;
  date: Date;
  followings: string[];
};

const runQuery = async ({ date, userId, followings }: TArgs) => {
  return db
    .select({
      id: PostsTable.id,
      username: UsersTable.username,
      isUserStoryExists: sql<boolean>`
        CASE WHEN EXISTS (
          SELECT 1 FROM ${StoriesTable}
          WHERE ${StoriesTable.userId} = ${UsersTable.id}
          AND ${StoriesTable.createdAt} >= NOW() - INTERVAL '24 hours'
          AND ${StoriesTable.createdAt} <= NOW()
        ) THEN true ELSE false END
      `,
      avatar: UsersTable.avatar,
      userId: PostsTable.userId,
      createdAt: PostsTable.createdAt,
      updatedAt: PostsTable.updatedAt,
      description: PostsTable.description,
      location: PostsTable.location,
      urls: PostsTable.urls,
      isUserFollowed: sql<boolean>`
        CASE WHEN EXISTS (
          SELECT 1 FROM ${FollowingsTable}
          WHERE ${FollowingsTable.followId} = ${UsersTable.id}
          AND ${FollowingsTable.userId} = ${userId}
        ) THEN true ELSE false END
      `,
      isLiked: sql<boolean>`
        CASE 
          WHEN EXISTS (
            SELECT 1 FROM ${PostLikesTable}
            WHERE ${PostLikesTable.postId} = ${PostsTable.id}
            AND ${PostLikesTable.userId} = ${userId}
          ) THEN true
          ELSE false
        END
      `,
      isSaved: sql<boolean>`
        CASE 
          WHEN EXISTS (
            SELECT 1 FROM ${SavedPostsTable}
            WHERE ${SavedPostsTable.postId} = ${PostsTable.id}
            AND ${SavedPostsTable.userId} = ${userId}
          ) THEN true
          ELSE false
        END
      `,
      sumLikes: sql<number>`
        CAST(COUNT(DISTINCT ${PostLikesTable}) as int)
      `,
      sumComments: sql<number>`
        CAST(COUNT(DISTINCT ${CommentsTable.id}) as int) +
        CAST(COUNT(DISTINCT ${RepliesTable.id}) as int)
      `,
    })
    .from(PostsTable)
    .where(
      and(
        lt(PostsTable.createdAt, date),
        inArray(PostsTable.userId, followings),
      ),
    )
    .leftJoin(PostLikesTable, eq(PostsTable.id, PostLikesTable.postId))
    .leftJoin(CommentsTable, eq(PostsTable.id, CommentsTable.postId))
    .leftJoin(RepliesTable, eq(CommentsTable.id, RepliesTable.commentId))
    .innerJoin(UsersTable, eq(PostsTable.userId, UsersTable.id))
    .groupBy(PostsTable.id, UsersTable.id)
    .orderBy(desc(PostsTable.createdAt))
    .limit(LIMIT);
};

export type TFeedPost = Awaited<ReturnType<typeof runQuery>>[number];

type Args = {
  userId: string;
  page: number;
  date?: Date;
  total?: number;
};

const getFollowingsUser = async (userId: string) => {
  const followings = await db
    .select({
      userId: FollowingsTable.followId,
    })
    .from(FollowingsTable)
    .where(eq(FollowingsTable.userId, userId));
  const users = followings.map((f) => f.userId);
  return users;
};

export const fetchFeedPostsForRouteHandler = async ({
  userId,
  date,
  total,
  page,
}: {
  userId: string;
  date: Date;
  total: number;
  page: number;
}): Promise<TInfiniteResult<TFeedPost>> => {
  const followingUsers = await getFollowingsUser(userId);
  const posts = await runQuery({
    date,
    userId,
    followings: [...followingUsers, userId],
  });
  return {
    data: posts,
    date,
    total,
    page,
  };
};

export const fetchFeedPosts = unstable_cache(
  async ({
    page,
    userId,
    date = new Date(),
    total = 0,
  }: Args): Promise<TInfiniteResult<TFeedPost>> => {
    const followingUsers = await getFollowingsUser(userId);

    if (total === 0) {
      const [result] = await db
        .select({
          sum: sql<number>`CAST(COUNT(${PostsTable.id}) as int)`,
        })
        .from(PostsTable)
        .where(
          and(
            lt(PostsTable.createdAt, date),
            inArray(PostsTable.userId, [...followingUsers, userId]),
          ),
        );
      total = result.sum;
    }

    const posts = await runQuery({
      date,
      userId,
      followings: [...followingUsers, userId],
    });

    return {
      data: posts,
      date,
      total,
      page,
    };
  },
  [cacheKeys.posts.home],
  {
    tags: [cacheKeys.posts.home],
    revalidate: 60,
  },
);
