import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLHeadingElement>;

export default function InstagramLogo(props: Props) {
  return (
    <h1 className={cn("font-title text-5xl font-normal", props.className)}>
      Nextgram
    </h1>
  );
}
