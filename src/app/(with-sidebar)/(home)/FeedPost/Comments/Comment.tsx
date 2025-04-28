import { HeartEmptyCommentIcon, HeartRedCommentIcon } from "@/icons/HeartIcon";
import { likeComment as lc } from "@/lib/actions/comment";
import { TFeedComment, useFeedPostStore } from "@/lib/stores/feedPostStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

type Props = {
  comment: TFeedComment;
};

const Comment = ({ comment }: Props) => {
  const likeComment = useFeedPostStore((state) => state.likeComment);
  const pathname = usePathname();

  const like = async () => {
    try {
      likeComment(comment);
      await lc.bind(
        null,
        pathname,
      )({
        commentId: comment.id,
      });
    } catch {
      likeComment(comment);
      toast.error("Failed to like the comment");
    }
  };

  return (
    <div className="flex items-start justify-between gap-2" key={comment.id}>
      <div>
        <Link
          href={`/${comment.username}`}
          className="inline pr-2 text-sm font-semibold"
        >
          {comment.username}
        </Link>
        <p className="text-foreground/80 inline text-sm whitespace-break-spaces">
          {comment.body}
        </p>
      </div>
      <div className="pt-1">
        <button onClick={like}>
          {comment.isLiked ? (
            <HeartRedCommentIcon />
          ) : (
            <HeartEmptyCommentIcon />
          )}
        </button>
      </div>
    </div>
  );
};

export default Comment;
