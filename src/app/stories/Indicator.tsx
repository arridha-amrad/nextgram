"use client";

import { cn } from "@/lib/utils";

type Props = {
  progress: number;
  onClick: VoidFunction;
  hasWatched: boolean;
  isPlaying: boolean;
};

export default function Indicator({
  progress,
  isPlaying,
  onClick,
  hasWatched,
}: Props) {
  return (
    <div
      onClick={onClick}
      className="relative flex h-max w-full items-center gap-2 py-4"
    >
      <div
        className={cn(
          "relative h-[3px] w-full rounded-full",
          hasWatched && !isPlaying ? "bg-white" : "bg-white/50",
        )}
      >
        <div
          style={{ width: `${progress}%` }}
          className="absolute inset-0 h-[3px] bg-white"
        />
      </div>
    </div>
  );
}
