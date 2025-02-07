import { fetchUserSavedPosts } from "@/lib/drizzle/queries/posts/fetchSavedPosts";
import React from "react";
import SavedPosts from "./Posts";

type Props = {
  params: Promise<{ username: string }>;
};

export default async function Page({ params }: Props) {
  const username = (await params).username;

  const posts = await fetchUserSavedPosts({ username });

  return <SavedPosts initialPosts={posts} />;
}
