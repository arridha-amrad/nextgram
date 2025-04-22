import { page } from "@/lib/pages";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLHeadingElement>;

export default function InstagramLogo(props: Props) {
  return (
    <Link
      href={page.home}
      className={cn("font-title text-5xl font-normal", props.className)}
    >
      Nextgram
    </Link>
  );
}
