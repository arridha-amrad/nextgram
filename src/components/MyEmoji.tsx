"use client";

import {
  EmojiClickData,
  EmojiStyle,
  SuggestionMode,
  Theme,
} from "emoji-picker-react";
import { Dispatch, RefObject, SetStateAction } from "react";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

export type TEmojiProps = {
  setText: Dispatch<SetStateAction<string>>;
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  cursorPosition: RefObject<number>;
};

type Props = {
  open: boolean;
} & TEmojiProps;

export default function MyEmoji({
  inputRef,
  open,
  setText,
  cursorPosition,
}: Props) {
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    if (inputRef.current === null) return;
    const pos = cursorPosition.current;
    const ref = inputRef.current;

    setText((prev) => {
      const start = prev.slice(0, pos);
      const end = prev.slice(pos);
      const newText = start + emojiData.emoji + end;
      return newText;
    });

    const newCursorPos = pos + emojiData.emoji.length;
    cursorPosition.current = newCursorPos;

    setTimeout(() => {
      ref.focus();
      ref.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const { theme } = useTheme();

  return (
    <div className="size-max shrink-0">
      <EmojiPicker
        suggestedEmojisMode={SuggestionMode.RECENT}
        previewConfig={{ showPreview: false }}
        theme={theme === "dark" ? Theme.DARK : Theme.LIGHT}
        onEmojiClick={handleEmojiClick}
        open={open}
        className="custom-scrollbar"
        emojiStyle={EmojiStyle.NATIVE}
      />
    </div>
  );
}
