import InstagramLogo from "@/components/InstagramLogo";
import CloseStoryPageButton from "../CloseStoryPageBtn";
import Stories from "./Stories";
import { data as stories } from "./data";

export default async function Page() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <Stories stories={stories} />
      <div className="fixed top-4 left-4 shrink-0">
        <InstagramLogo className="text-2xl" />
      </div>
      <div className="fixed top-6 right-6">
        <CloseStoryPageButton />
      </div>
    </main>
  );
}
