import { fetchUserPosts } from "@/lib/drizzle/queries/posts/fetchUserPosts";
import Posts from "./Posts";

type Params = {
  params: Promise<{
    username: string;
  }>;
};

export default async function Page({ params }: Params) {
  const username = (await params).username;
  const data = await fetchUserPosts({ username });

  return <Posts initialPosts={data} />;
}
