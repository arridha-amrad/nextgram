"use client";

import { Button } from "@headlessui/react";
import Image from "next/image";
import { CloseIcon } from "./Icons";

export default function UserCard() {
  return (
    <div className="flex items-start gap-4">
      <Image
        src="/defaultAvatar.jpeg"
        alt="profile"
        width={40}
        height={40}
        className="rounded-full object-cover"
      />
      <div className="flex-1">
        <h1 className="text-sm font-bold">amrad2108</h1>
        <h2 className="text-skin-muted text-sm">Arridha Amrad</h2>
      </div>
      <Button className="self-center">
        <CloseIcon className="text-skin-muted size-5" />
      </Button>
    </div>
  );
}
