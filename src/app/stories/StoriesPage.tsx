"use client";

import dynamic from "next/dynamic";

const EmblaCarousel = dynamic(() => import("./EmblaScaleCarousel"), {
  ssr: false,
});

import { TStory } from "@/lib/drizzle/queries/stories/fetchStories";
import { useEffect } from "react";
import { useStoryStore } from "./store";

type Props = {
  stories: TStory[];
  date: Date;
};

export default function StoriesPage({ stories, date }: Props) {
  const setStories = useStoryStore((store) => store.setStories);

  useEffect(() => {
    setStories(stories, date);
    // eslint-disable-next-line
  }, []);

  return <EmblaCarousel />;
}
