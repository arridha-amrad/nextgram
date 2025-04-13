type Props = {
  close: VoidFunction;
};

function PostHeaderOptions({ close }: Props) {
  return (
    <>
      <button className="h-12 w-max self-center text-sm font-medium text-red-400">
        Report
      </button>
      <hr className="border-foreground/10" />

      <button className="h-12 w-max self-center text-sm font-medium text-red-400">
        Unfollow
      </button>
      <hr className="border-foreground/10" />

      <button className="h-12 w-max self-center text-sm">
        Mark as favorite
      </button>
      <hr className="border-foreground/10" />

      <button className="h-12 w-max self-center text-sm">Go to post</button>
      <hr className="border-foreground/10" />

      <button className="h-12 w-max self-center text-sm">Share to...</button>
      <hr className="border-foreground/10" />

      <button className="h-12 w-max self-center text-sm">Copy link</button>
      <hr className="border-foreground/10" />

      <button className="h-12 w-max self-center text-sm">Embed</button>
      <hr className="border-foreground/10" />

      <button className="h-12 w-max self-center text-sm">
        About this account
      </button>
      <hr className="border-foreground/10" />

      <button onClick={close} className="h-12 w-max self-center text-sm">
        Cancel
      </button>
    </>
  );
}

export default PostHeaderOptions;
