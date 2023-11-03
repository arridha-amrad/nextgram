import Image from "next/image";
import { Button } from "@nextui-org/react";

export default function SuggestedUserCard() {
  return (
    <div className="flex justify-between py-2 px-2">
      <div className="flex items-start gap-4">
        <Image
          width={45}
          height={45}
          className="rounded-full"
          alt="avatar"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />
        <div>
          <h1 className="font-semibold">Arridha Amrad</h1>
          <p className="text-sm text-skin-accent">@arridhaamrad</p>
        </div>
      </div>
      <Button
        size="sm"
        variant="light"
        color="primary"
        className="font-semibold block self-center"
      >
        Follow
      </Button>
    </div>
  );
}
