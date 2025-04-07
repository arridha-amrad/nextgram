import { fetchUserPosts } from "@/lib/drizzle/queries/posts/fetchUserPosts";
import Posts from "../Posts";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function Page({ params }: Props) {
  const username = (await params).username;
  const data = await fetchUserPosts({ username });

  return <Posts initialPosts={data} />;
}
