import { fetchUserSavedPosts } from "@/lib/drizzle/queries/posts/fetchSavedPosts";
import React from "react";
import SavedPosts from "./SavedPosts";

type Props = {
  params: Promise<{ username: string }>;
};

export default async function Page({ params }: Props) {
  const username = (await params).username;

  const posts = await fetchUserSavedPosts(username);

  if (posts.data.length === 0) {
    return (
      <div className="mt-10">
        <h1 className="text-skin-muted text-center">There is no saved post</h1>
      </div>
    );
  }

  return <SavedPosts initialPosts={posts} />;
}
