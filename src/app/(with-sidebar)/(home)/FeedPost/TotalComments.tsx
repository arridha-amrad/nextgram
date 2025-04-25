import Link from "next/link";
import { useFeedPostContext } from "./Context";

function FeedPostTotalComments() {
  const { post } = useFeedPostContext();
  if (!post || post.sumComments === 0) return null;
  return (
    <div className="px-2">
      <Link
        className="text-foreground/70 block text-sm"
        scroll={false}
        href={`/post/${post.id}`}
      >
        {post.sumComments}&nbsp; {post.sumComments > 1 ? "comments" : "comment"}
      </Link>
    </div>
  );
}

export default FeedPostTotalComments;
