"use client";

import useEmblaCarousel from "embla-carousel-react";
import Story from "./Story";

function Carousel() {
  const [emblaRef] = useEmblaCarousel({
    slidesToScroll: "auto",
    dragFree: true,
  });
  return (
    <div ref={emblaRef} className="overflow-hidden pr-4">
      <div className="-ml-4 flex touch-pan-y touch-pinch-zoom">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            style={{
              transform: "translate3d(0,0,0)",
              flex: "0 0 14%",
              minWidth: 0,
              paddingLeft: "1rem",
            }}
          >
            <Story />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
