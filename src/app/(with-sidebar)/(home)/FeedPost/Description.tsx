import { useEffect, useState } from "react";
import { useFeedPostContext } from "./Context";
import { cn } from "@/lib/utils";

function FeedPostDescription() {
  const [isShowMore, setIsShowMore] = useState(false);
  const { post } = useFeedPostContext();

  const [isShowBtn, setIsShowBtn] = useState(false);

  useEffect(() => {
    if (post?.description) {
      if (post.description.length > 100) {
        setIsShowBtn(true);
        setIsShowMore(true);
      }
    }
  }, [post?.description]);

  if (!post || post.description === null) return null;
  return (
    <div>
      <p
        className={cn(
          "text-sm whitespace-break-spaces",
          isShowMore ? "" : "line-clamp-2",
        )}
      >
        <span className="font-bold">{post.username}&nbsp;</span>
        {post.description.trim()}
      </p>
      {isShowBtn && (
        <button
          onClick={() => setIsShowMore((val) => !val)}
          className="text-foreground/50 text-xs"
        >
          {isShowMore ? "show less" : "show more"}
        </button>
      )}
    </div>
  );
}

export default FeedPostDescription;
