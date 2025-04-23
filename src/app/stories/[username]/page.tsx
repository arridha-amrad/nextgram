import InstagramLogo from "@/components/InstagramLogo";
import CloseStoryPageButton from "../CloseStoryPageBtn";
import OtherStory from "./OtherStory";
import StoryPlayer from "./StoryPlayer";

export default function Page() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="fixed top-4 left-4 shrink-0">
        <InstagramLogo className="text-2xl" />
      </div>
      <div className="fixed top-6 right-6">
        <CloseStoryPageButton />
      </div>
      <div className="relative flex h-full w-full max-w-[1680px] border-amber-500">
        <div className="absolute inset-y-0 right-[70%] left-0 flex items-center justify-between">
          <OtherStory />
          <OtherStory />
        </div>
        <div className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 items-center">
          <StoryPlayer />
        </div>
        <div className="absolute inset-y-0 right-0 left-[70%] flex items-center justify-between">
          <OtherStory />
          <OtherStory />
        </div>
      </div>
    </main>
  );
}
