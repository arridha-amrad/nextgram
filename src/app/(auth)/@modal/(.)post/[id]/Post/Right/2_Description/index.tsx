import Avatar from "@/components/Avatar";
import { TPost } from "@/lib/drizzle/queries/posts/fetchPost";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";

type Props = {
  post: TPost;
};

function Description({ post }: Props) {
  return (
    <section className="flex gap-4">
      <div>
        <Avatar url={post.avatar} />
      </div>
      <div className="pt-0.5">
        <Link
          href={`/${post.username}`}
          className="inline pr-2 text-sm font-semibold"
        >
          {post.username}
        </Link>
        <p className="text-skin-muted inline text-sm whitespace-break-spaces">
          {post.description}
        </p>
        <div className="py-2">
          <p className="text-skin-muted text-xs">
            {formatDistanceToNowStrict(post.createdAt)}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Description;
