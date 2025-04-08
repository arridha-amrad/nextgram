function Highlight() {
  return (
    <div className="flex size-max flex-col items-center justify-center gap-2">
      <article className="border-foreground/20 size-[89px] rounded-full border p-1">
        <div className="bg-foreground/10 flex size-full items-center justify-center rounded-full">
          <svg
            aria-label="Plus icon"
            fill="currentColor"
            height="44"
            role="img"
            viewBox="0 0 24 24"
            width="44"
            className="fill-foreground/50"
          >
            <title>Plus icon</title>
            <path d="M21 11.3h-8.2V3c0-.4-.3-.8-.8-.8s-.8.4-.8.8v8.2H3c-.4 0-.8.3-.8.8s.3.8.8.8h8.2V21c0 .4.3.8.8.8s.8-.3.8-.8v-8.2H21c.4 0 .8-.3.8-.8s-.4-.7-.8-.7z"></path>
          </svg>
        </div>
      </article>
      <h1 className="text-xs font-medium">New</h1>
    </div>
  );
}

export default Highlight;
