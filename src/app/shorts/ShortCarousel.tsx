// components/ShortsCarousel.tsx
"use client"; // Mark as Client Component

import { useState, useEffect } from "react";

type ShortItem = {
  id: string;
  contentUrl: string;
  duration: number;
};

export default function ShortsCarousel({ items }: { items: ShortItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState<"up" | "down">(
    "up",
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNavigation = (direction: "up" | "down") => {
    if (isAnimating) return;

    setIsAnimating(true);
    setTransitionDirection(direction);

    setTimeout(() => {
      if (direction === "up" && currentIndex < items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (direction === "down" && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
      setIsAnimating(false);
    }, 500); // Match this duration with your transition duration
  };

  // Handle keyboard and wheel events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") handleNavigation("up");
      if (e.key === "ArrowDown") handleNavigation("down");
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) handleNavigation("up");
      if (e.deltaY < 0) handleNavigation("down");
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentIndex, isAnimating]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Current Item */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out ${
          transitionDirection === "up"
            ? isAnimating
              ? "-translate-y-full"
              : "translate-y-0"
            : isAnimating
              ? "translate-y-full"
              : "translate-y-0"
        }`}
      >
        <div className="relative h-full w-full">
          <img
            src={items[currentIndex].contentUrl}
            alt={`Short ${currentIndex}`}
            className="h-full w-full object-cover"
          />
          {/* Add your UI elements here (like buttons, progress bar, etc.) */}
        </div>
      </div>

      {/* Next Item (pre-rendered for smoother transition) */}
      {currentIndex < items.length - 1 && (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out ${
            transitionDirection === "up"
              ? isAnimating
                ? "translate-y-0"
                : "translate-y-full"
              : isAnimating
                ? "-translate-y-full"
                : "translate-y-full"
          }`}
        >
          <div className="relative h-full w-full">
            <img
              src={items[currentIndex + 1].contentUrl}
              alt={`Short ${currentIndex + 1}`}
              className="h-full w-full object-cover opacity-70"
            />
          </div>
        </div>
      )}

      {/* Navigation Controls (optional) */}
      <div className="absolute right-0 bottom-10 left-0 flex justify-center gap-4">
        <button
          onClick={() => handleNavigation("down")}
          disabled={currentIndex === 0}
          className="rounded-full bg-white/30 p-3 backdrop-blur-md disabled:opacity-30"
        >
          {/* Down arrow icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
        <button
          onClick={() => handleNavigation("up")}
          disabled={currentIndex === items.length - 1}
          className="rounded-full bg-white/30 p-3 backdrop-blur-md disabled:opacity-30"
        >
          {/* Up arrow icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
