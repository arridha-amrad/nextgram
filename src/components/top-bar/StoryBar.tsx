"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button, ScrollShadow } from "@nextui-org/react";
import { useCallback, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import Story from "@/components/Story";

export default function StoryBar() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showPrevBtn, setShowPrevBtn] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(true);
  const [ref, { width }] = useMeasure();
  const goRight = () => {
    containerRef.current?.scroll({
      left: containerRef.current.scrollLeft + width / 3,
      behavior: "smooth",
    });
  };
  const goLeft = () => {
    containerRef.current?.scroll({
      left: containerRef.current.scrollLeft - width / 3,
      behavior: "smooth",
    });
  };
  const prevBtnObserver = useRef<IntersectionObserver>();
  const firstStory = useCallback((element: HTMLDivElement) => {
    if (prevBtnObserver.current) prevBtnObserver.current.disconnect();
    prevBtnObserver.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowPrevBtn(false);
        } else {
          setShowPrevBtn(true);
        }
      },
      { threshold: 1 }
    );
    if (element) {
      prevBtnObserver.current.observe(element);
    }
  }, []);

  const nextBtnObserver = useRef<IntersectionObserver>();
  const lastStory = useCallback((element: HTMLDivElement) => {
    if (nextBtnObserver.current) nextBtnObserver.current.disconnect();
    nextBtnObserver.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowNextBtn(false);
        } else {
          setShowNextBtn(true);
        }
      },
      { threshold: 1 }
    );
    if (element) {
      nextBtnObserver.current.observe(element);
    }
  }, []);

  return (
    <div ref={ref} className="relative h-[90px] w-full items-center">
      <ScrollShadow
        orientation="horizontal"
        ref={containerRef}
        className="w-full flex h-max p-2 gap-3 sm:overflow-x-hidden overflow-x-auto"
      >
        {[...Array(20).fill("")].map((_, i) =>
          i === 0 ? (
            <Story
              ref={firstStory}
              key={i}
              url={`https://i.pravatar.cc/${150 * (i + 1)}`}
            />
          ) : i === 19 ? (
            <Story
              ref={lastStory}
              key={i}
              url={`https://i.pravatar.cc/${150 * (i + 1)}`}
            />
          ) : (
            <Story key={i} url={`https://i.pravatar.cc/${150 * (i + 1)}`} />
          )
        )}
      </ScrollShadow>
      {showPrevBtn && (
        <div className="absolute top-1/2 left-4 -translate-y-1/2">
          <Button
            onClick={goLeft}
            size="sm"
            variant="flat"
            isIconOnly
            color="default"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </Button>
        </div>
      )}

      {showNextBtn && (
        <div className="absolute top-1/2 right-4 -translate-y-1/2">
          <Button
            onClick={goRight}
            size="sm"
            variant="flat"
            isIconOnly
            color="default"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
