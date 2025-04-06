import { cn } from "@/lib/utils";
import { Lobster } from "next/font/google";

const lobster = Lobster({
  subsets: ["latin"],
  weight: "400",
});

export default function InstagramLogo() {
  return (
    <h1 className={cn(lobster.className, "text-5xl font-normal")}>Nextgram</h1>
  );
}
