"use server";

import { POST, USERS } from "@/lib/cacheKeys";
import { revalidateTag } from "next/cache";

export const createPostActionRevalidate = async () => {
  revalidateTag(POST.homePosts);
  revalidateTag(POST.userPosts);
  revalidateTag(USERS.profile);
};
