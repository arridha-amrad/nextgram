import { InfiniteResult, TInfiniteResult } from "@/lib/drizzle/queries/type";
import { POST } from "../cacheKeys";
import { TFeedPost } from "../drizzle/queries/posts/fetchFeedPosts";
import { TLikeUsers } from "../drizzle/queries/posts/fetchPostLikes";
import { TUserPost } from "../drizzle/queries/posts/fetchUserPosts";
import { envClient } from "@/env.client";

const baseUrl = envClient.clientBaseUrl;

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
      `${baseUrl}/api/posts/${postId}/likes?page=${page}&date=${date}`,
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

type ProfilePostParams = {
  username: string;
  date: Date;
};
export const loadMoreUserPosts = async ({
  username,
  date,
}: ProfilePostParams): Promise<InfiniteResult<TUserPost>> => {
  try {
    const res = await fetch(
      `${baseUrl}/api/user/${username}/posts?date=${date.toISOString()}`,
    );
    const data = await res.json();
    return data as InfiniteResult<TUserPost>;
  } catch (err) {
    throw err;
  }
};

export const loadMoreUserSavedPosts = async ({
  date,
  username,
}: ProfilePostParams): Promise<InfiniteResult<TUserPost>> => {
  try {
    const res = await fetch(
      `${baseUrl}/api/user/${username}/posts?date=${date.toISOString()}`,
    );
    const data = await res.json();
    return data as InfiniteResult<TUserPost>;
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
      `${baseUrl}/api/posts/feed?date=${date.toISOString()}&page=${page}&total=${total}`,
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
