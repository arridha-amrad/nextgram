import Avatar from "@/components/Avatar";
import { rgbDataURL } from "@/lib/utils";
import Image from "next/image";

export default function OtherStory() {
  return (
    <div className="bg-bg-secondary relative aspect-[9/16] h-[40vh]">
      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center">
        <Avatar url="/default.jpg" style={{ width: 56, height: 56 }} />
        <div className="">
          <h1>arridha08</h1>
          <p className="text-foreground/50 text-center text-xs">10h</p>
        </div>
      </div>
      <div className="absolute inset-0 z-10 h-full w-full bg-black/50" />
      <div className="absolute inset-0 h-full w-full">
        <Image
          width={500}
          height={500}
          className="h-full w-full object-cover"
          alt="story image"
          placeholder="blur"
          blurDataURL={rgbDataURL(60, 60, 60)}
          src="https://images.unsplash.com/photo-1715237752085-d7edd74ad1e5?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </div>
  );
}
