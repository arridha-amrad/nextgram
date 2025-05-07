import React from "react";
import NoTaggedPosts from "./NoTaggedPosts";
import { getAuth } from "@/lib/next.auth";

type Props = {
  params: Promise<{ username: string }>;
};

export default async function Page({ params }: Props) {
  const username = decodeURIComponent((await params).username);
  const session = await getAuth();

  const isAuthorizedToSee = session?.user.username === username;

  if (!isAuthorizedToSee) {
    return (
      <div className="text-foreground/50 pt-4 text-center">
        <h1>You are not authorized to see other user&apos; tagged posts</h1>
      </div>
    );
  }
  return <NoTaggedPosts />;
}
