import StoriesPage from "./StoriesPage";
import { getAuth } from "@/lib/next.auth";
import { redirect } from "next/navigation";
import { page } from "@/lib/pages";
import { fetchStories } from "@/lib/drizzle/queries/stories/fetchStories";
import InstagramLogo from "@/components/InstagramLogo";
import CloseStoryPageButton from "./CloseStoryPageBtn";

export default async function Page() {
  const session = await getAuth();
  if (!session) {
    redirect(`${page.login}?cbUrl=/stories`);
  }
  const { data, date } = await fetchStories(session.user.id);

  return (
    <main className="h-screen w-screen overflow-hidden">
      <StoriesPage stories={data} date={date} />
      <div className="fixed top-4 left-4 hidden shrink-0 sm:block">
        <InstagramLogo className="text-2xl" />
      </div>
      <div className="fixed top-6 right-6 hidden sm:block">
        <CloseStoryPageButton />
      </div>
    </main>
  );
}
