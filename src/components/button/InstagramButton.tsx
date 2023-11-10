"use client";

import { Button, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FaInstagram } from "react-icons/fa6";

export default function InstagramButton() {
  const router = useRouter();
  return (
    <Tooltip placement="right" content="nextgram">
      <Button
        variant="light"
        onClick={() => router.push("/home")}
        className="xl:hidden flex mx-2"
        isIconOnly
        startContent={<FaInstagram className="h-6 w-6" />}
      />
    </Tooltip>
  );
}
