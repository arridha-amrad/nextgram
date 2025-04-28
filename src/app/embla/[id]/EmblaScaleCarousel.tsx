"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import "./style.css";
import { useParams, useRouter } from "next/navigation";

const TWEEN_FACTOR_BASE = 0.25;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { id }: { id: string } = useParams();
  const [currentId, setCurrentId] = useState<number>(Number(id));

  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const router = useRouter();
  const activeSlide = useRef<number | null>(null);

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

      let maxScale = -Infinity;

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

          // Track the slide with the highest scale (likely to be 1)
          if (Number(scale) > maxScale) {
            maxScale = Number(scale);
            setCurrentId(slideIndex);
          }
        });
      });

      // Update URL only if active slide has changed
      if (currentId !== null && currentId !== activeSlide.current) {
        activeSlide.current = currentId;
        console.log(currentId);

        router.push(`/embla/${currentId}`, { scroll: false }); // App Router
        // router.push(`?slide=${currentActiveIndex}`, undefined, { shallow: true }); // Pages Router
      }
    },
    // eslint-disable-next-line
    [currentId],
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale);
    // eslint-disable-next-line
  }, [emblaApi, tweenScale]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">{index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// <div className="m-auto w-full max-w-lg">
//   <div className="overflow-hidden" ref={emblaRef}>
//     <div className="-ml-4 flex touch-pan-y touch-pinch-zoom">
//       {slides.map((index) => (
//         <div
//           style={{
//             transform: "translate3d(0, 0, 0)",
//             flex: `0 0 55%`,
//             minWidth: 0,
//             paddingLeft: "1rem",
//           }}
//           key={index}
//         >
//           <div
//             className="shadow-[inset_0_0_0_0.2rem]"
//             style={{
//               borderRadius: "1.8 rem",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               height: "19rem",
//               userSelect: "none",
//             }}
//           >
//             {index + 1}
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// </div>
export default EmblaCarousel;
