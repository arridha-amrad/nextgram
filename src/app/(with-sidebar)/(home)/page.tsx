import { fetchFeedPosts } from "@/lib/drizzle/queries/posts/fetchFeedPosts";
import { getAuth } from "@/lib/next.auth";
import FeedPosts from "./FeedPosts";

export default async function Page() {
  const session = await getAuth();
  const userId = session?.user.id;

  const posts = await fetchFeedPosts({ page: 1, userId: userId ?? "" });

  return (
    <div className="mx-auto w-full max-w-[468px] space-y-8 pb-16">
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
