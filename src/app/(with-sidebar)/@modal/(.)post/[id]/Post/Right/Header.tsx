import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";
import Link from "next/link";
import { usePostStore } from "../store";

function PostHeader() {
  const post = usePostStore((store) => store.post);
  if (!post) return null;

  return (
    <section className="flex h-[70px] items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <AvatarWithStoryIndicator
          isStoryExists={false}
          isStoryWatched={false}
          size={32}
          avatarUrl={post.avatar}
        />
        <div className="w-full">
          <div className="line-clamp-1">
            <Link
              href={`/${post.username}`}
              className="block text-sm font-medium"
            >
              {post.username}
            </Link>
          </div>
          <p className="text-foreground/70 text-xs">{post.location}</p>
        </div>
      </div>
      <button>
        <svg
          aria-label="More options"
          fill="currentColor"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <title>More options</title>
          <circle cx="12" cy="12" r="1.5"></circle>
          <circle cx="6" cy="12" r="1.5"></circle>
          <circle cx="18" cy="12" r="1.5"></circle>
        </svg>
      </button>
    </section>
  );
}

export default PostHeader;
