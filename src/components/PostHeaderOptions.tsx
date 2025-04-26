import { bookmarkFeedPost } from "@/handlers/post";
import { handleFollow } from "@/handlers/user";
import { page } from "@/lib/pages";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

type Props = {
  isFollow: boolean;
  close: VoidFunction;
  postId: string;
  postOwnerId: string;
  bookMarkCallback: VoidFunction;
  followCallback: VoidFunction;
  isFavorite: boolean;
};

function PostHeaderOptions({
  close,
  postId,
  postOwnerId,
  bookMarkCallback,
  followCallback,
  isFollow,
  isFavorite,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const { data } = useSession();
  const userId = data?.user.id;

  return (
    <>
      <button
        onClick={() => alert("not implemented")}
        className="h-12 w-max self-center text-sm font-medium text-red-400"
      >
        Report
      </button>
      <hr className="border-foreground/10" />

      {isFollow && (
        <>
          <button
            onClick={async () => {
              await handleFollow(postOwnerId, pathname, followCallback);
              close();
            }}
            className="h-12 w-max self-center text-sm font-medium text-red-400"
          >
            Unfollow
          </button>
          <hr className="border-foreground/10" />
        </>
      )}

      {userId === postOwnerId && (
        <>
          <button
            onClick={async () => {
              close();
            }}
            className="h-12 w-max self-center text-sm font-medium text-red-400"
          >
            Delete post
          </button>
          <hr className="border-foreground/10" />
        </>
      )}

      <button
        onClick={() => {
          bookmarkFeedPost(postId, pathname, bookMarkCallback);
          close();
        }}
        className="h-12 w-max self-center text-sm"
      >
        {isFavorite ? "Remove from favorite" : "Mark as favorite"}
      </button>
      <hr className="border-foreground/10" />

      <button
        onClick={() => {
          router.push(page.postDetail(postId), { scroll: false });
        }}
        className="h-12 w-max self-center text-sm"
      >
        Go to post
      </button>
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
