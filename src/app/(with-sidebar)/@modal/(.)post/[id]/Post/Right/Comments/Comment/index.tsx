import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Comment as TComment } from "../../../store";
import ButtonFetchReplies from "./ButtonFetchReplies";
import ButtonLikeComment from "./ButtonLike";
import ButtonReply from "./ButtonReply";
import Replies from "./Replies";

type Props = {
  comment: TComment;
};

const Comment = ({ comment }: Props) => {
  const [isShowReplies, setIsShowReplies] = useState(true);

  const [commentDate, setCommentDate] = useState("");

  useEffect(() => {
    setCommentDate(
      formatDistanceToNowStrict(comment.createdAt, { addSuffix: true }),
    );
  }, [comment.createdAt]);

  return (
    <article className="flex w-full items-start gap-4 py-2">
      <AvatarWithStoryIndicator
        isStoryExists={false}
        isStoryWatched={false}
        size={32}
        avatarUrl={comment.avatar}
      />
      <div className="flex-1 basis-0 overflow-hidden">
        <div className="flex w-full items-start gap-2 pt-0.5">
          <div className="flex-1 space-x-2 text-sm break-words">
            <Link
              href={`/${comment.username}`}
              className="inline font-semibold"
            >
              {comment.username}
            </Link>
            <p className="inline whitespace-break-spaces">{comment.message}</p>
          </div>
          <div className="aspect-square w-5 flex-none">
            <ButtonLikeComment
              commentId={comment.id}
              isLiked={comment.isLiked}
            />
          </div>
        </div>
        <div className="text-foreground/70 flex gap-4 pt-1 text-xs">
          <p>{commentDate}</p>

          {comment.sumLikes > 0 && (
            <p>
              {comment.sumLikes} {comment.sumLikes > 1 ? "Likes" : "Like"}
            </p>
          )}

          <ButtonReply commentId={comment.id} username={comment.username} />
        </div>

        {comment.sumReplies > 0 && (
          <ButtonFetchReplies
            isShowReplies={isShowReplies}
            setIsShowReplies={setIsShowReplies}
            comment={comment}
          />
        )}

        {isShowReplies && <Replies replies={comment.replies} />}
      </div>
    </article>
  );
};

export default Comment;
