import { TPost } from "@/lib/drizzle/queries/posts/fetchPost";
import { formatDistanceToNowStrict } from "date-fns";

type Props = {
  post: TPost;
};

function PostDate({ post }: Props) {
  return (
    <p className="text-skin-muted px-4 pb-4 text-xs">
      {formatDistanceToNowStrict(post.createdAt, { addSuffix: true })}
    </p>
  );
}

export default PostDate;
