import { useFeedPostContext } from "./Context";

function FeedPostDescription() {
  const { post } = useFeedPostContext();
  if (!post || post.description === null) return null;
  return (
    <p className="line-clamp-2 text-sm whitespace-break-spaces">
      <span className="font-bold">{post.username}&nbsp;</span>
      {post.description.trim()}
    </p>
  );
}

export default FeedPostDescription;
