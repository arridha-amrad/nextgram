"use client";

import React from "react";
import { useCommentsStore } from "../../../../store";

type Props = {
  commentId: string;
  username: string;
};

export default function ButtonReply({ commentId, username }: Props) {
  const setReply = useCommentsStore((store) => store.setReplySetter);
  return (
    <button
      onClick={() =>
        setReply({
          commentId,
          username,
        })
      }
    >
      Reply
    </button>
  );
}
