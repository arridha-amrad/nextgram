import { HeartEmptyCommentIcon, HeartRedCommentIcon } from "@/icons/HeartIcon";
import { likeComment as lc } from "@/lib/actions/comment";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { TFeedComment, useFeedPosts } from "../../store";

type Props = {
  comment: TFeedComment;
};

const Comment = ({ comment }: Props) => {
  const likeComment = useFeedPosts((state) => state.likeComment);
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
    } catch (err) {
      likeComment(comment);
      toast.error("Failed to like the comment");
    }
  };

  return (
    <div className="flex items-start justify-between" key={comment.id}>
      <div>
        <Link
          href={`/${comment.username}`}
          className="inline pr-2 text-sm font-semibold"
        >
          {comment.username}
        </Link>
        <p className="text-foreground/80 inline text-sm">{comment.body}</p>
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
