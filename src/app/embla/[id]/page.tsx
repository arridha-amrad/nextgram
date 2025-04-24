"use client";

import dynamic from "next/dynamic";

const EmblaCarousel = dynamic(() => import("./EmblaScaleCarousel"), {
  ssr: false,
});

import { EmblaOptionsType } from "embla-carousel";

export default function Page() {
  const OPTIONS: EmblaOptionsType = {
    loop: false,
    containScroll: false,
    align: "center",
  };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return <EmblaCarousel slides={SLIDES} options={OPTIONS} />;
}
