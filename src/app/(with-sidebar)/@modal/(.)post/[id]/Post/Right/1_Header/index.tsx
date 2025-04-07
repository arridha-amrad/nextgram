import Avatar from "@/components/Avatar";
import { TPost } from "@/lib/drizzle/queries/posts/fetchPost";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type Props = {
  post: TPost;
};

function PostHeader({ post }: Props) {
  return (
    <section className="p-4">
      <div className="flex items-center gap-3">
        <Avatar url={post.avatar} />
        <div className="flex-1">
          <Link href={`/${post.username}`} className="text-sm font-semibold">
            {post.username}
          </Link>
        </div>
        <div className="pt-2">
          <button>
            <EllipsisHorizontalIcon className="w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default PostHeader;
