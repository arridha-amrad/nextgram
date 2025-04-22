import InstagramLogo from "@/components/InstagramLogo";
import CloseStoryPageButton from "../CloseStoryPageBtn";
import StoryPlayer from "./StoryPlayer";

export default function Page() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="fixed top-4 left-4">
        <InstagramLogo className="text-2xl" />
      </div>
      <div className="fixed top-6 right-6">
        <CloseStoryPageButton />
      </div>
      <StoryPlayer />
    </main>
  );
}
