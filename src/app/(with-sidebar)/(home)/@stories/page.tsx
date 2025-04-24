import Carousel from "./Carousel";

export default function Page() {
  return (
    <div className="flex w-full items-start gap-x-3 rounded-full pt-16 md:py-2 md:pt-4">
      <div className="">
        <div className="bg-bg-secondary border-foreground/30 flex size-[66px] shrink-0 items-center justify-center rounded-full border-2 border-dashed hover:cursor-pointer">
          <svg
            aria-label="New Story"
            className="fill-foreground/30"
            height="20"
            role="img"
            viewBox="0 0 24 24"
            width="20"
          >
            <title>New story</title>
            <path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path>
          </svg>
        </div>
        <p className="text-foreground/50 py-1 text-center text-xs">Add</p>
      </div>
      <Carousel />
    </div>
  );
}
