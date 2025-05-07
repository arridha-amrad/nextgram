import { fetchUserSavedPosts } from "@/lib/drizzle/queries/posts/fetchSavedPosts";
import SavedPosts from "./SavedPosts";
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
        <h1>You are not authorized to see other user&apos; saved posts</h1>
      </div>
    );
  }

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
