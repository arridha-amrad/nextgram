"use client";

import { Button, Tooltip } from "@nextui-org/react";
import { FaThreads } from "react-icons/fa6";

export default function ThreadButton() {
  return (
    <div className="flex flex-col w-full">
      <Tooltip
        className="xl:opacity-0 opacity-100"
        placement="right"
        content="Threads"
      >
        <Button
          radius="full"
          variant="light"
          className="text-lg xl:self-start xl:w-max w-12 self-center xl:h-14 h-12 flex items-center xl:gap-5 xl:px-4"
        >
          <FaThreads className="w-6 h-6" />
          <span className="xl:block hidden">Threads</span>
        </Button>
      </Tooltip>
    </div>
  );
}
