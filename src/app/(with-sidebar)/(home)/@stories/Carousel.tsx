"use client";

import useEmblaCarousel from "embla-carousel-react";
import Story from "./Story";
import { EmblaCarouselType } from "embla-carousel";
import { useState, useCallback, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: "auto",
    dragFree: false,
    watchDrag: false,
  });
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div ref={emblaRef} className="relative overflow-hidden px-2">
      <div className="-ml-4 flex touch-pan-y touch-pinch-zoom">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            style={{
              transform: "translate3d(0,0,0)",
              flex: `0 0 ${100 / 8}%`,
              minWidth: 0,
              paddingLeft: "1rem",
            }}
          >
            <Story name={i + 1} />
          </div>
        ))}
      </div>

      {selectedIndex > 0 && (
        <div className="absolute top-9 left-4 -translate-y-1/2">
          <button
            onClick={onPrevButtonClick}
            className="flex size-[25px] items-center justify-center rounded-full bg-black/40"
          >
            <ChevronLeftIcon className="aspect-square w-6 text-white/70" />
          </button>
        </div>
      )}

      {selectedIndex !== scrollSnaps.length - 1 && (
        <div className="absolute top-9 right-4 -translate-y-1/2">
          <button
            onClick={onNextButtonClick}
            className="flex size-[25px] items-center justify-center rounded-full bg-black/40"
          >
            <ChevronRightIcon className="aspect-square w-6 text-white/70" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Carousel;
