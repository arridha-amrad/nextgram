"use client";
import { EmojiIconBig } from "@/icons/EmojiIcon";
import { Dispatch, RefObject, SetStateAction, useState } from "react";

import MyEmoji from "@/components/MyEmoji";
import useClickOutside from "@/hooks/useClickOutside";
import {
  autoUpdate,
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import useEscapePressed from "@/hooks/useEscapePressed";

type Props = {
  setText: Dispatch<SetStateAction<string>>;
  inputRef: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  cursorPosition: RefObject<number>;
};

function Emoji({ cursorPosition, inputRef, setText }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));
  useEscapePressed(() => setOpen(false), false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    placement: "top-start",
    middleware: [offset(5), shift()],
  });

  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getFloatingProps, getReferenceProps } = useInteractions([
    dismiss,
    role,
  ]);

  return (
    <div className="flex items-center justify-center" ref={ref}>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        type="button"
        className="outline-0"
        onClick={() => setOpen((val) => !val)}
      >
        <EmojiIconBig />
      </button>
      {open && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className="z-[50]"
            {...getFloatingProps()}
          >
            <MyEmoji
              open={open}
              inputRef={inputRef}
              setText={setText}
              cursorPosition={cursorPosition}
            />
          </div>
        </FloatingPortal>
      )}
    </div>
  );
}

export default Emoji;
