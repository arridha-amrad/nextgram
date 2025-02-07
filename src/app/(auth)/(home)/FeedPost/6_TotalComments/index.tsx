import { TFeedPost } from "@/lib/drizzle/queries/posts/fetchFeedPosts";
import Link from "next/link";

type Props = {
  post: TFeedPost;
};

function FeedPostTotalComments({ post }: Props) {
  if (post.sumComments === 0) return null;
  return (
    <Link className="block" scroll={false} href={`/post/${post.id}`}>
      <span className="text-skin-muted text-sm">
        {post.sumComments}&nbsp; {post.sumComments > 1 ? "comments" : "comment"}
      </span>
    </Link>
  );
}

export default FeedPostTotalComments;
