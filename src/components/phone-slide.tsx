"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PhoneSlide() {
  const totalImage = 4;
  const [idx, setIdx] = useState(1);
  useEffect(() => {
    const id = setTimeout(() => {
      setIdx((val) => (val === totalImage ? 1 : val + 1));
    }, 3000);
    return () => {
      clearTimeout(id);
    };
  }, [idx]);
  return (
    <div
      style={{
        backgroundSize: "468.32px 634.15px",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "url(https://static.cdninstagram.com/images/instagram/xig/homepage/phones/home-phones.png?__makehaste_cache_breaker=HOgRclNOosk)",
      }}
      className="w-[468.32px] h-[634.15px] relative"
    >
      {[...Array(totalImage).fill("")].map((_, i) => {
        const src = `${process.env.NEXT_PUBLIC_URL}/sc/screenshot${i + 1}.png`;
        const isShow = i + 1 === idx;
        return (
          <div
            key={src}
            style={{
              width: "250px",
              height: "538.84px",
            }}
            className={`w-auto h-auto absolute top-6 right-[3.7rem] ${
              isShow ? "animate-fade" : "opacity-0"
            } `}
          >
            <Image sizes="100vh" fill src={src} alt={`slide ${idx}`} />
          </div>
        );
      })}
    </div>
  );
}
