"use client";

import { cn, rgbDataURL } from "@/lib/utils";
import ChevronLeftIcon from "@heroicons/react/20/solid/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/20/solid/ChevronRightIcon";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { usePostStore } from "../store";
import { EmblaCarouselType } from "embla-carousel";

type Props = {
  className?: string;
};

const Carousel = ({ className }: Props) => {
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
    <div className="bg-background relative w-max max-w-[700px]">
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
                blurDataURL={rgbDataURL(60, 60, 60)}
                className="h-full w-full object-contain"
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

      {/* <div className="absolute inset-y-0 right-2 flex items-center justify-center">
        <button
          onClick={next}
          className={cn(
            "bg-background/50 hover:bg-background/60 inline-flex aspect-square w-6 items-center justify-center rounded-full",
            index === urls.length - 1 && "hidden",
          )}
        >
          <ChevronRightIcon className="aspect-square w-4" />
        </button>
      </div>
      <div className="absolute inset-y-0 left-2 flex items-center justify-center">
        <button
          onClick={prev}
          className={cn(
            "bg-background/50 hover:bg-background/60 inline-flex aspect-square w-6 items-center justify-center rounded-full",
            index === 0 && "hidden",
          )}
        >
          <ChevronLeftIcon className="aspect-square w-4" />
        </button>
      </div> */}
    </div>
  );
};

export default Carousel;
