"use client";

import { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import OtherStory from "./OtherStory";
import { useStoryStore } from "./store";
import StoryPlayer from "./StoryPlayer";
import "./style.css";

const TWEEN_FACTOR_BASE = 0.3;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

const EmblaCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    containScroll: false,
    align: "center",
    startIndex,
    watchDrag: false,
  });

  const stories = useStoryStore((store) => store.stories);

  const router = useRouter();

  const searchParams = useSearchParams();
  const usernameFromParam = searchParams.get("username");

  useEffect(() => {
    if (usernameFromParam) {
      const idx = stories.findIndex((v) => v.username === usernameFromParam);
      console.log(idx);
      if (idx >= 0) {
        setStartIndex(idx);
      }
    }
    // eslint-disable-next-line
  }, []);

  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    router.push(
      `?username=${stories[emblaApi.selectedScrollSnap()].username}`,
      {
        scroll: false,
      },
    );
    // eslint-disable-next-line
  }, [emblaApi]);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__slide__number") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const scale = numberWithinRange(tweenValue, 0, 1).toString();
          const tweenNode = tweenNodes.current[slideIndex];
          tweenNode.style.transform = `scale(${scale})`;
        });
      });
    },
    [],
  );

  useEffect(() => {}, [emblaApi]);

  const jumpToSlide = (index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  };

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);
    onSelect();

    emblaApi
      .on("select", onSelect)
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale);
    // eslint-disable-next-line
  }, [emblaApi, tweenScale]);

  return (
    <div className="container mx-auto flex h-screen w-full items-center justify-center">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {stories.map((data, index) => (
            <div
              onClick={() => jumpToSlide(index)}
              className="embla__slide cursor-pointer"
              key={data.username}
            >
              <div className="embla__slide__number relative">
                {usernameFromParam === data.username ? (
                  <StoryPlayer
                    avatar={data.avatar}
                    stories={data.stories}
                    username={data.username}
                    onCompleteCallback={() => jumpToSlide(index + 1)}
                  />
                ) : (
                  <OtherStory
                    avatar={data.avatar}
                    username={data.username}
                    contentUrl={data.stories[0].content}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default EmblaCarousel;
