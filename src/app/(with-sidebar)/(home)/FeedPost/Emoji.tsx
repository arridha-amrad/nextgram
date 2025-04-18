"use client";
import MyEmoji from "@/components/MyEmoji";
import useClickOutside from "@/hooks/useClickOutside";
import useEscapePressed from "@/hooks/useEscapePressed";
import { Dispatch, RefObject, SetStateAction, useState } from "react";

type Props = {
  setText: Dispatch<SetStateAction<string>>;
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  cursorPosition: RefObject<number>;
};

function Emoji({ inputRef, setText, cursorPosition }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false), inputRef);
  useEscapePressed(() => setOpen(false), open);

  return (
    <div ref={ref} className="pt-1">
      <button
        type="button"
        className="cursor-pointer outline-0"
        onClick={() => setOpen((val) => !val)}
      >
        <svg
          aria-label="Emoji"
          fill="currentColor"
          height="13"
          role="img"
          viewBox="0 0 24 24"
          width="13"
        >
          <title>Emoji</title>
          <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
        </svg>
      </button>
      <div className="absolute right-0 bottom-14">
        <MyEmoji
          cursorPosition={cursorPosition}
          inputRef={inputRef}
          setText={setText}
          open={open}
        />
      </div>
    </div>
  );
}

export default Emoji;
