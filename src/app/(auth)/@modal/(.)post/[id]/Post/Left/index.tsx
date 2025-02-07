"use client";

import { cn, rgbDataURL } from "@/lib/utils";
import ChevronLeftIcon from "@heroicons/react/20/solid/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/20/solid/ChevronRightIcon";
import Image from "next/image";
import { useState } from "react";

type Props = {
  urls: string[];
  className?: string;
};

const CarouselOne = ({ urls, className }: Props) => {
  const [index, setIndex] = useState(0);
  const next = () => {
    setIndex((val) => (val += 1));
  };
  const prev = () => {
    setIndex((val) => (val -= 1));
  };

  return (
    <div className="relative">
      <Image
        placeholder="blur"
        blurDataURL={rgbDataURL(46, 46, 46)}
        alt="post"
        loading="lazy"
        width={1000}
        height={1000}
        src={urls[index]}
        className={cn("h-full w-auto object-cover object-center", className)}
      />
      <div className="absolute inset-y-0 right-2 flex items-center justify-center">
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
      </div>
    </div>
  );
};

export default CarouselOne;
