import { NEXT_PUBLIC_BASE_URL } from "@/config.env-client";
import { POST } from "../cacheKeys";
import { TLikeUsers } from "../drizzle/queries/posts/fetchPostLikes";
import { TInfiniteResult } from "../drizzle/queries/type";

export const getLikes = async ({
  date,
  page,
  postId,
}: {
  postId: string;
  page: number;
  date: Date;
}) => {
  const res = await fetch(
    `${NEXT_PUBLIC_BASE_URL}/api/post/${postId}/likes?page=${page}&date=${date}`,
    { next: { revalidate: 60, tags: [POST.likes] } },
  );
  const data = await res.json();
  return data as TInfiniteResult<TLikeUsers>;
};
