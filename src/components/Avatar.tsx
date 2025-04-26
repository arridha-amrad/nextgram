import { cn, rgbDataURL } from "@/lib/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";

type Props = {
  url: string;
} & HTMLAttributes<HTMLDivElement>;

const Avatar = ({ url, ...props }: Props) => {
  return (
    <div
      className={cn("shrink-0 overflow-hidden rounded-full")}
      style={props.style}
      {...props}
    >
      <Image
        alt="avatar"
        placeholder="blur"
        blurDataURL={rgbDataURL(60, 60, 60)}
        width={300}
        height={300}
        className="h-full w-full object-cover"
        src={url}
      />
    </div>
  );
};

export default Avatar;
