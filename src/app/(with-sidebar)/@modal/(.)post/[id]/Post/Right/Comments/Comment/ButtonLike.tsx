"use client";

import { HeartEmptyCommentIcon, HeartRedCommentIcon } from "@/icons/HeartIcon";
import { likeComment as lc } from "@/lib/actions/comment";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { usePostStore } from "../../../store";

type Props = {
  isLiked: boolean;
  commentId: string;
};

const ButtonLikeComment = ({ commentId, isLiked }: Props) => {
  const pathname = usePathname();
  const { likeComment } = usePostStore();

  const like = async () => {
    likeComment(commentId);
    const result = await lc.bind(null, pathname)({ commentId });
    if (result?.serverError) {
      toast.error("Something went wrong");
      likeComment(commentId);
    }
  };

  return (
    <button onClick={like}>
      {isLiked ? <HeartRedCommentIcon /> : <HeartEmptyCommentIcon />}
    </button>
  );
};

export default ButtonLikeComment;
