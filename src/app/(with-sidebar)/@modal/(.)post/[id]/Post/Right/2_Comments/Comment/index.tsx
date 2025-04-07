import Avatar from "@/components/Avatar";

import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import ButtonFetchReplies from "./ButtonFetchReplies";
import ButtonLikeComment from "./ButtonLike";
import ButtonReply from "./ButtonReply";
import Replies from "./Replies";
import { Comment as TComment } from "../../../store";

type Props = {
  comment: TComment;
};

const Comment = ({ comment }: Props) => {
  const [isShowReplies, setIsShowReplies] = useState(true);

  return (
    <article className="flex w-full items-start gap-4 py-2">
      <div>
        <Avatar url={comment.avatar} />
      </div>
      <div className="flex-1 basis-0 overflow-hidden">
        <div className="flex w-full pt-0.5">
          <div className="flex-1 space-x-2 text-sm break-words">
            <Link
              href={`/${comment.username}`}
              className="inline font-semibold"
            >
              {comment.username}
            </Link>
            <p className="inline">{comment.message}</p>
          </div>
          <div className="aspect-square w-5 flex-none">
            <ButtonLikeComment
              commentId={comment.id}
              isLiked={comment.isLiked}
            />
          </div>
        </div>
        <div className="text-skin-muted flex gap-4 py-2 text-xs font-semibold">
          <p>
            {formatDistanceToNowStrict(comment.createdAt, { addSuffix: true })}
          </p>

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
