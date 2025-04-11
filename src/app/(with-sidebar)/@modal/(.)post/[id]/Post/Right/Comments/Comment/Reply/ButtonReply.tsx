"use client";

import React from "react";
import { usePostStore } from "../../../../store";

type Props = {
  commentId: string;
  username: string;
};

export default function ButtonReply({ commentId, username }: Props) {
  const setReply = usePostStore((store) => store.setReplySetter);
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
