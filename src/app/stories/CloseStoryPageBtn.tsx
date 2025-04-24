"use client";

import { page } from "@/lib/pages";
import { useRouter } from "next/navigation";

export default function CloseStoryPageButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.push(page.home)}>
      <svg
        aria-label="Close"
        fill="currentColor"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <title>Close</title>
        <polyline
          fill="none"
          points="20.643 3.357 12 12 3.353 20.647"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        ></polyline>
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          x1="20.649"
          x2="3.354"
          y1="20.649"
          y2="3.354"
        ></line>
      </svg>
    </button>
  );
}
