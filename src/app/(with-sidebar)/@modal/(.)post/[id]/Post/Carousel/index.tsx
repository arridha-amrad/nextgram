"use client";

import { rgbDataURL } from "@/lib/utils";
import ChevronLeftIcon from "@heroicons/react/20/solid/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/20/solid/ChevronRightIcon";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { usePostStore } from "../store";
import { EmblaCarouselType } from "embla-carousel";

const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const post = usePostStore((store) => store.post);

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
    <div className="bg-background relative aspect-[4/5] h-[90vh] w-max 2xl:max-w-[700px]">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom">
          {post?.urls.map((url, i) => (
            <div
              className="h-[90vh] w-full overflow-hidden"
              style={{
                transform: "translate3d(0, 0, 0)",
                flex: "0 0 100%",
                minWidth: 0,
              }}
              key={i}
            >
              <Image
                src={url.url}
                alt="post image"
                width={1000}
                height={1000}
                placeholder="blur"
                blurDataURL={rgbDataURL(60, 60, 60)}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {selectedIndex > 0 && (
        <div className="absolute top-1/2 left-4 -translate-y-1/2">
          <button
            onClick={onPrevButtonClick}
            className="bg-foreground/70 flex size-[30px] items-center justify-center rounded-full"
          >
            <ChevronLeftIcon className="text-background aspect-square w-6" />
          </button>
        </div>
      )}

      {selectedIndex !== scrollSnaps.length - 1 && (
        <div className="absolute top-1/2 right-4 -translate-y-1/2">
          <button
            onClick={onNextButtonClick}
            className="bg-foreground/70 flex size-[30px] items-center justify-center rounded-full"
          >
            <ChevronRightIcon className="text-background aspect-square w-6" />
          </button>
        </div>
      )}

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center justify-center gap-1">
        {scrollSnaps.map((_, i) => (
          <div
            key={i}
            className={`${i === selectedIndex ? "bg-foreground" : "bg-foreground/50"} size-2 rounded-full`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
