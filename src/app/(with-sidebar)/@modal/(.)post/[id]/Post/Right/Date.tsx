import { formatDistanceToNowStrict } from "date-fns";
import { usePostStore } from "../store";
import { useEffect, useState } from "react";

function PostDate() {
  const post = usePostStore((store) => store.post);

  const [date, setDate] = useState("");

  useEffect(() => {
    if (post?.createdAt) {
      setDate(
        formatDistanceToNowStrict(post.createdAt, {
          addSuffix: true,
        }),
      );
    }
  }, [post?.createdAt]);

  if (!post) return null;

  return <p className="text-skin-muted px-4 pb-4 text-xs">{date}</p>;
}

export default PostDate;
