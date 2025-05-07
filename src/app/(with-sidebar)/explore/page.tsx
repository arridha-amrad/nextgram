import { fetchExplorePosts } from "@/lib/drizzle/queries/posts/fetchExplorePosts";
import { getAuth } from "@/lib/next.auth";
import { page } from "@/lib/pages";
import { redirect } from "next/navigation";
import ExplorePosts from "./Posts";

export default async function Page() {
  const session = await getAuth();
  if (!session) {
    redirect(`${page.login}?cbUrl=${page.explore}`);
  }

  const posts = await fetchExplorePosts(session.user.id);

  return (
    <div className="mx-auto flex w-full flex-col py-4 xl:max-w-[935px]">
      <ExplorePosts initialPosts={posts} />
    </div>
  );
}
