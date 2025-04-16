import { fetchUserPosts } from "@/lib/drizzle/queries/posts/fetchUserPosts";
import Posts from "./Posts";
import { getAuth } from "@/lib/next.auth";

type Params = {
  params: Promise<{
    username: string;
  }>;
};

export default async function Page({ params }: Params) {
  const username = (await params).username;
  const data = await fetchUserPosts(username);

  const session = await getAuth();

  if (data.total === 0) {
    return (
      <div className="mt-10">
        <h1 className="text-skin-muted text-center">
          {session?.user.username === username ? "You" : "User"} has no posts
        </h1>
      </div>
    );
  }

  return <Posts initialPosts={data} />;
}
