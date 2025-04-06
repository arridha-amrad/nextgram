"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CarouselOnPhone() {
  const [number, setNumber] = useState(0);

  const url = [
    "/screenshot/screenshot1.png",
    "/screenshot/screenshot2.png",
    "/screenshot/screenshot3.png",
    "/screenshot/screenshot4.png",
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setNumber((val) => {
        if (val === url.length - 1) {
          return 0;
        } else {
          return val + 1;
        }
      });
    }, 5000);

    return () => {
      clearInterval(id);
    };
  }, [number, url.length]);

  return (
    <div className="relative aspect-10/16 w-[400px] bg-[url('https://static.cdninstagram.com/images/instagram/xig/homepage/phones/home-phones.png?__makehaste_cache_breaker=HOgRclNOosk')] bg-cover bg-center">
      <div className="absolute top-7 right-7">
        <div className="relative h-[540px] w-[250px]">
          {url.map((src, i) => (
            <Image
              key={i}
              alt="photo"
              src={src}
              width={300}
              height={700}
              priority
              className={cn(
                "absolute inset-0 h-auto w-full transition-opacity duration-500 ease-linear",
                i === number ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
