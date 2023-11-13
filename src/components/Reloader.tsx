"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Reloader() {
  const router = useRouter();
  console.log("render");
  return <Button onClick={() => router.refresh()}>Reload</Button>;
}
