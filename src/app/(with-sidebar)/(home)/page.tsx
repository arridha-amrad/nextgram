import { fetchFeedPosts } from "@/lib/drizzle/queries/posts/fetchFeedPosts";
import { redirect } from "next/navigation";
import FeedPosts from "./FeedPosts";
import { getAuth } from "@/lib/next.auth";

export default async function Page() {
  const session = await getAuth();
  const userId = session?.user.id;

  if (!userId) {
    redirect("/login");
  }

  const posts = await fetchFeedPosts({ page: 1, userId });

  return (
    <div className="py-4">
      {posts.total === 0 ? (
        <div>
          <h1>You need to follow some users to populate your feeds</h1>
        </div>
      ) : (
        <FeedPosts posts={posts} />
      )}
    </div>
  );
}
