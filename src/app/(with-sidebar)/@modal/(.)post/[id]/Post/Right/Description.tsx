import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import { usePostStore } from "../store";

function Description() {
  const post = usePostStore((store) => store.post);

  if (!post) return null;

  return (
    <section className="flex gap-4">
      <AvatarWithStoryIndicator
        isStoryExists={false}
        isStoryWatched={false}
        size={32}
        avatarUrl={post.avatar}
      />
      <div className="pt-0.5">
        <Link
          href={`/${post.username}`}
          className="inline pr-2 text-sm font-semibold"
        >
          {post.username}
        </Link>
        <p className="inline text-sm whitespace-break-spaces">
          {post.description?.trim()}
        </p>
        <div className="py-2">
          <p className="text-foreground/70 text-xs">
            {formatDistanceToNowStrict(post.createdAt)}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Description;
