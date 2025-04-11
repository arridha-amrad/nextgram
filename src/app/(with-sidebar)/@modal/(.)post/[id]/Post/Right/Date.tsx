import { formatDistanceToNowStrict } from "date-fns";
import { usePostStore } from "../store";

function PostDate() {
  const post = usePostStore((store) => store.post);
  if (!post) return null;
  return (
    <p className="text-skin-muted px-4 pb-4 text-xs">
      {formatDistanceToNowStrict(post.createdAt, { addSuffix: true })}
    </p>
  );
}

export default PostDate;
