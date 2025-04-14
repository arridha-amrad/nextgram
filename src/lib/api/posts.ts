import { NEXT_PUBLIC_BASE_URL } from "@/config.env-client";
import { POST } from "../cacheKeys";
import { TFeedPost } from "../drizzle/queries/posts/fetchFeedPosts";
import { TLikeUsers } from "../drizzle/queries/posts/fetchPostLikes";
import { TInfiniteResult } from "@/lib/drizzle/queries/type";
import { TUserPost } from "../drizzle/queries/posts/fetchUserPosts";

export const getLikes = async ({
  date,
  page,
  postId,
}: {
  postId: string;
  page: number;
  date: Date;
}) => {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BASE_URL}/api/posts/${postId}/likes?page=${page}&date=${date}`,
      { next: { revalidate: 60, tags: [POST.likes] } },
    );
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    const data = await res.json();
    return data as TInfiniteResult<TLikeUsers>;
  } catch (err) {
    throw err;
  }
};

export const loadMoreUserPosts = async ({
  username,
  date,
  total,
}: {
  username: string;
  date: Date;
  total: number;
}): Promise<TInfiniteResult<TUserPost>> => {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BASE_URL}/api/user/${username}/posts?date=${date}&total=${total}`,
    );
    if (!res.ok) {
      throw new Error("Something wen wrong");
    }
    const data = await res.json();
    return data as TInfiniteResult<TUserPost>;
  } catch (err) {
    throw err;
  }
};

export const loadMoreFeedPosts = async ({
  date,
  page,
  total,
}: {
  date: Date;
  total: number;
  page: number;
}): Promise<TInfiniteResult<TFeedPost>> => {
  try {
    const res = await fetch(
      `${NEXT_PUBLIC_BASE_URL}/api/posts/feed?date=${date}&page=${page}&total=${total}`,
    );
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};
