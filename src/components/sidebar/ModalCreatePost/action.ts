"use server";

import { cacheKeys } from "@/lib/cacheKeys";
import { revalidateTag } from "next/cache";

export const createPostActionRevalidate = async () => {
  revalidateTag(cacheKeys.posts.home);
  revalidateTag(cacheKeys.posts.user);
  revalidateTag(cacheKeys.users.profile);
};
