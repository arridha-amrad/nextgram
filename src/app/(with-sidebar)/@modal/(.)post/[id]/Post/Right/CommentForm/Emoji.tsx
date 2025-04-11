"use client";
import { EmojiIconBig } from "@/icons/EmojiIcon";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useEffect, useRef, useState } from "react";

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

type Props = {
  // eslint-disable-next-line
  onEmojiSelect: (e: any) => void;
};

function Emoji({ onEmojiSelect }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (open && e.key === "Escape") {
        setOpen(false);
      }
    });
    return () => {
      document.removeEventListener("keyup", (e) => {
        if (open && e.key === "Escape") {
          setOpen(false);
        }
      });
    };
  }, [open]);

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
    <div>
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
            <Picker
              previewPosition="none"
              searchPosition="none"
              onClickOutside={() => setOpen(false)}
              data={data}
              onEmojiSelect={onEmojiSelect}
            />
          </div>
        </FloatingPortal>
      )}
    </div>
  );
}

export default Emoji;
