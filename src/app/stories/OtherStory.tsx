import Avatar from "@/components/Avatar";
import { rgbDataURL } from "@/lib/utils";
import Image from "next/image";

type Props = {
  username: string;
  avatar: string | null;
  contentUrl: string;
};

export default function OtherStory({ avatar, contentUrl, username }: Props) {
  return (
    <div className="bg-bg-secondary relative h-full w-full">
      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center gap-2">
        <Avatar
          url={avatar ?? "/default.jpg"}
          style={{ width: 102, height: 102 }}
        />
        <div className="text-3xl">
          <h1 className="">{username}</h1>
          <p className="text-foreground/50 text-center">10h</p>
        </div>
      </div>
      <div className="absolute inset-0 z-10 h-full w-full bg-black/70" />
      <div className="absolute inset-0 h-full w-full">
        <Image
          width={500}
          height={500}
          className="h-full w-full object-cover"
          alt="story image"
          placeholder="blur"
          blurDataURL={rgbDataURL(60, 60, 60)}
          src={contentUrl}
        />
      </div>
    </div>
  );
}
