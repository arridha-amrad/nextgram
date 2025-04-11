"use client";

import React from "react";
import { usePostStore } from "../../../store";

type Props = {
  commentId: string;
  username: string;
};

export default function ButtonReply({ commentId, username }: Props) {
  const setReplySetter = usePostStore((store) => store.setReplySetter);
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
