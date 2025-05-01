import { bookmarkFeedPost } from "@/handlers/post";
import { removePost } from "@/lib/actions/post";
import { page } from "@/lib/pages";
import { useFeedPostStore } from "@/lib/stores/feedPostStore";
import { useUserPostStore } from "@/lib/stores/profilePostStore";
import { showToast } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useTransition } from "react";
import Spinner from "./Spinner";
import { follow } from "@/lib/actions/follow";

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
  isFollow,
  isFavorite,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const { data } = useSession();
  const userId = data?.user.id;

  const removePostFromFeed = useFeedPostStore((store) => store.removePost);
  const removePostAfterUnfollow = useFeedPostStore(
    (store) => store.removePostAfterUnfollow,
  );
  const removePostFromUserPosts = useUserPostStore((store) => store.removePost);

  const [isPending, start] = useTransition();

  const handleDeletePost = () => {
    start(async () => {
      await removePost({ postId });
      removePostFromFeed(postId);
      removePostFromUserPosts(postId);
      close();
      if (pathname !== "/") {
        router.back();
      }
      showToast("Post deleted successfully", "success");
    });
  };

  const handleUnfollow = () => {
    start(async () => {
      await follow.bind(null, pathname)({ targetId: postOwnerId });
      removePostAfterUnfollow(postOwnerId);
      close();
      if (pathname !== "/") {
        router.back();
      }
      showToast("Unfollow", "success");
    });
  };

  if (isPending) {
    return (
      <div className="fixed inset-0 flex w-full items-center justify-center">
        <div className="bg-bg-secondary flex h-max w-[200px] flex-col items-center justify-center gap-2 rounded-xl py-10">
          <Spinner />
          <p className="text-foreground/50 animate-pulse text-sm">
            Please wait
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => alert("Currently this feature is not available")}
        className="h-12 w-max self-center text-sm font-medium text-red-400"
      >
        Report
      </button>
      <hr className="border-foreground/10" />

      {isFollow && (
        <>
          <button
            onClick={handleUnfollow}
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
            onClick={handleDeletePost}
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
