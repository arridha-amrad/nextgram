import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";
import { HeartEmptyCommentIcon, HeartRedCommentIcon } from "@/icons/HeartIcon";
import { likeReply as lr } from "@/lib/actions/reply";
import { TReply } from "@/lib/drizzle/queries/replies/fetchReplies";
import { cn, showToast } from "@/lib/utils";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePostStore } from "../../../../store";
import ButtonReply from "./ButtonReply";

type Props = {
  reply: TReply;
};

const Reply = ({ reply }: Props) => {
  const { avatar, username, sumLikes, createdAt, message, commentId } = reply;

  const likeReply = usePostStore((store) => store.likeReply);

  const pathname = usePathname();

  const like = async () => {
    likeReply(commentId, reply.id);
    const result = await lr.bind(null, pathname)({ replyId: reply.id });
    if (result?.serverError) {
      showToast("Something went wrong", "error");
      likeReply(commentId, reply.id);
    }
  };

  return (
    <div className="flex w-full items-start gap-4 py-2 text-sm">
      <AvatarWithStoryIndicator
        isStoryExists
        isStoryWatched
        size={32}
        avatarUrl={avatar}
      />
      <div className="flex-1 basis-0">
        <div className="pt-0.5 text-wrap">
          <Link href={`/${username}`} className="inline pr-1 font-semibold">
            {username}
          </Link>
          <p className="inline space-x-1 text-sm break-all">
            {message.split(" ").map((text, i) =>
              text.startsWith("@") ? (
                <Link
                  key={i}
                  className={cn("font-medium text-blue-500")}
                  href={`/${text.replace("@", "")}`}
                >
                  {` ${text} `}
                </Link>
              ) : (
                ` ${text} `
              ),
            )}
          </p>
        </div>
        <div className="text-skin-muted flex gap-4 py-2 text-xs font-semibold">
          <p className="">{formatDistanceToNowStrict(createdAt)}</p>
          {sumLikes > 0 && (
            <p>
              {sumLikes} {sumLikes > 1 ? "likes" : "like"}
            </p>
          )}
          <ButtonReply commentId={commentId} username={username} />
        </div>
      </div>
      <div className="shrink-0 px-2 pt-1">
        <button onClick={like}>
          {reply.isLiked ? <HeartRedCommentIcon /> : <HeartEmptyCommentIcon />}
        </button>
      </div>
    </div>
  );
};

export default Reply;
