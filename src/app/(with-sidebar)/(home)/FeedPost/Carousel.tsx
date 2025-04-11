"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
import { rgbDataURL } from "@/lib/utils";
import { useFeedPostContext } from "./Context";

function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { post } = useFeedPostContext();

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

  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex touch-pan-y touch-pinch-zoom">
          {post?.urls.map((url, i) => (
            <div
              className="aspect-[4/5] w-full overflow-hidden"
              style={{
                transform: "translate3d(0, 0, 0)",
                flex: "0 0 100%",
                minWidth: 0,
                paddingLeft: "1rem",
              }}
              key={i}
            >
              <Image
                src={url.url}
                alt="post image"
                width={500}
                height={1000}
                blurDataURL={rgbDataURL(60, 60, 60)}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
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
}

export default Carousel;
