"use client";

import { Button, Input } from "@nextui-org/react";
import UserCardWithTime from "./UseCardWithTime";
import Image from "next/image";
import BookmarkIcon from "@heroicons/react/24/outline/BookmarkIcon";
import HeartIcon from "@heroicons/react/24/outline/HeartIcon";
import CommentIcon from "@heroicons/react/24/outline/ChatBubbleLeftIcon";
import SendIcon from "@heroicons/react/24/outline/PaperAirplaneIcon";
import { useCallback, useRef, useState } from "react";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { FaceSmileIcon } from "@heroicons/react/24/solid";

export default function PostCard() {
  const [showMoreBtn, setShowMoreBtn] = useState(false);
  const [showMoreText, setShowMoreText] = useState(false);
  const [showLess, setShowLess] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const pObs = useRef<IntersectionObserver>();

  const refSpan = useCallback((element: HTMLSpanElement) => {
    if (pObs.current) pObs.current.disconnect();
    pObs.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setShowMoreBtn(false);
      } else {
        setShowMoreBtn(true);
      }
    });
    if (element) {
      pObs.current.observe(element);
    }
  }, []);

  const [comment, setComment] = useState("");

  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    setComment(
      (inputValue) =>
        inputValue + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
    );
  }

  return (
    <article className="w-full">
      <UserCardWithTime />
      <div className="w-full h-full relative max-h-[900px] overflow-hidden border border-skin-base">
        <Image
          className="object-cover w-full h-auto"
          width={1000}
          height={1000}
          priority
          src="https://images.pexels.com/photos/18758628/pexels-photo-18758628/free-photo-of-a-highland-cow-on-a-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="post"
        />
      </div>
      <div className="h-12 w-full flex items-center justify-between">
        <div className="flex gap-2">
          <Button variant="light" isIconOnly>
            <HeartIcon className="w-7 h-7" />
          </Button>
          <Button variant="light" isIconOnly>
            <CommentIcon className="w-7 h-7" />
          </Button>
          <Button variant="light" isIconOnly>
            <SendIcon className="w-7 h-7" />
          </Button>
        </div>
        <Button variant="light" isIconOnly>
          <BookmarkIcon className="w-7 h-7" />
        </Button>
      </div>

      <h1 className="font-bold px-2">50.000 likes</h1>

      <p
        className={`${
          showMoreText ? "" : "text-ellipsis overflow-hidden whitespace-nowrap"
        }  xl:text-base text-sm w-full px-2`}
      >
        <span className="font-bold">arridhaamrad</span>&nbsp;&nbsp;Lorem ipsum
        dolor sit amet, consectetur adipisicing elit. Expedita molestiae
        cupiditate ut amet, atque pariatur exercitationem nostrum quos fugit
        voluptatum.
        <span ref={refSpan} />
      </p>

      {showMoreBtn && (
        <Button
          onClick={() => {
            setShowMoreText(true);
            setShowLess(true);
          }}
          variant="light"
          size="sm"
        >
          {showMoreText ? "show less" : "show more"}
        </Button>
      )}
      {showLess && (
        <Button
          onClick={() => {
            setShowMoreText(false);
            setShowLess(false);
          }}
          variant="light"
          size="sm"
        >
          {showMoreText ? "show less" : "show more"}
        </Button>
      )}
      <div className="flex relative px-2">
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          variant="underlined"
          placeholder="Add comment..."
        />
        <Button
          variant="light"
          onClick={() => setShowEmojiPicker((val) => !val)}
          isIconOnly
          size="sm"
        >
          <FaceSmileIcon className="w-5 h-5" />
        </Button>
        {showEmojiPicker && (
          <div className="absolute right-10 bottom-0 z-50 ">
            <div
              onClick={() => setShowEmojiPicker(false)}
              className="fixed inset-0 bg-background/40"
            />
            <EmojiPicker
              onEmojiClick={onClick}
              previewConfig={{ showPreview: false }}
              theme={Theme.DARK}
            />
          </div>
        )}
      </div>
    </article>
  );
}
