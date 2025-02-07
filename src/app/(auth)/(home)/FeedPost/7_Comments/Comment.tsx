import { TFeedComment, useFeedPosts } from "@/app/(auth)/(home)/store";
import ButtonLike from "@/components/ButtonLike";
import { likeComment as lc } from "@/lib/actions/comment";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  comment: TFeedComment;
};

const Comment = ({ comment }: Props) => {
  const likeComment = useFeedPosts((state) => state.likeComment);
  const pathname = usePathname();

  const like = async () => {
    likeComment(comment);
    await lc.bind(
      null,
      pathname,
    )({
      commentId: comment.id,
    });
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
        <p className="text-skin-muted inline text-sm">{comment.body}</p>
      </div>
      <div className="pt-1">
        <ButtonLike callback={like} isLike={comment.isLiked} size="small" />
      </div>
    </div>
  );
};

export default Comment;
