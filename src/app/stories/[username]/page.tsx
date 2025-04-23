import InstagramLogo from "@/components/InstagramLogo";
import CloseStoryPageButton from "../CloseStoryPageBtn";
import StoryPlayer from "./StoryPlayer";

export default function Page() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="relative flex h-full w-full items-center justify-center border-amber-500">
        <StoryPlayer />
      </div>
      <div className="fixed top-4 left-4 shrink-0">
        <InstagramLogo className="text-2xl" />
      </div>
      <div className="fixed top-6 right-6">
        <CloseStoryPageButton />
      </div>
    </main>
  );
}
