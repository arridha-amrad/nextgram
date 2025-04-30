import InstagramLogo from "@/components/InstagramLogo";
import CloseStoryPageButton from "../CloseStoryPageBtn";
import Stories from "./Stories";
import { db } from "@/lib/drizzle/db";
import { UsersTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { fetchUserStories } from "@/lib/drizzle/queries/stories/fetchUserStories";

type Props = {
  params: Promise<{ username: string }>;
};

export default async function Page({ params }: Props) {
  const username = (await params).username;

  const user = await db
    .select()
    .from(UsersTable)
    .where(eq(UsersTable.username, username));

  if (user.length === 0) {
    return notFound();
  }

  const storyData = await fetchUserStories(user[0].id);

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <Stories data={storyData} />
      <div className="fixed top-4 left-4 hidden shrink-0 sm:block">
        <InstagramLogo className="text-2xl" />
      </div>
      <div className="fixed top-6 right-6 hidden sm:block">
        <CloseStoryPageButton />
      </div>
    </main>
  );
}
