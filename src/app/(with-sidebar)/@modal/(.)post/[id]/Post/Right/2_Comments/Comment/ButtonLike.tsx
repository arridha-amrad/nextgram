"use client";

import ButtonLike from "@/components/ButtonLike";
import { likeComment as lc } from "@/lib/actions/comment";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { useCommentsStore } from "../../../store";

type Props = {
  isLiked: boolean;
  commentId: string;
};

const ButtonLikeComment = ({ commentId, isLiked }: Props) => {
  const pathname = usePathname();
  const { likeComment } = useCommentsStore();

  const like = async () => {
    likeComment(commentId);
    const result = await lc.bind(null, pathname)({ commentId });
    if (result?.serverError) {
      toast.error("Something went wrong");
      likeComment(commentId);
    }
  };

  return <ButtonLike callback={like} isLike={isLiked} size="small" />;
};

export default ButtonLikeComment;
