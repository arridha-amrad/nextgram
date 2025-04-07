"use client";

import React from "react";
import { useCommentsStore } from "../../../store";

type Props = {
  commentId: string;
  username: string;
};

export default function ButtonReply({ commentId, username }: Props) {
  const setReplySetter = useCommentsStore((store) => store.setReplySetter);
  return (
    <button
      onClick={() => {
        setReplySetter({
          commentId,
          username,
        });
      }}
    >
      Reply
    </button>
  );
}
