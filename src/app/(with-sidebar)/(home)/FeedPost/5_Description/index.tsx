import { TFeedPost } from "@/lib/drizzle/queries/posts/fetchFeedPosts";

type Props = {
  post: TFeedPost;
};

function FeedPostDescription({ post }: Props) {
  if (post.description === null) return null;
  return (
    <section id="post_description" className="line-clamp-2 text-sm">
      <h1 className="inline pr-2 font-semibold">{post.username}</h1>
      <p className="text-skin-muted inline whitespace-break-spaces">
        {post.description}
      </p>
    </section>
  );
}

export default FeedPostDescription;
