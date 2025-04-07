import Avatar from "@/components/Avatar";
import { TFeedPost } from "@/lib/drizzle/queries/posts/fetchFeedPosts";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import Modal from "./Modal";

type Props = {
  post: TFeedPost;
};

export default function FeedPostHeader({ post }: Props) {
  return (
    <section className="flex w-full items-start gap-3 text-sm">
      <Avatar className="w-9" url={post.avatar} />
      <div>
        <Link
          href={`/${post.username}`}
          className="font-semibold hover:underline"
        >
          {post.username}
        </Link>
        <p className="text-skin-muted">{post.location}</p>
      </div>
      <div className="">&middot;</div>
      <div className="flex-1">
        <p className="text-skin-muted">
          {formatDistanceToNowStrict(post.createdAt, { addSuffix: true })}
        </p>
      </div>
      <Modal postId={post.id} userId={post.userId} />
    </section>
  );
}
