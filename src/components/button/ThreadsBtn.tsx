"use client";

import { Button, Tooltip } from "@nextui-org/react";
import { FaThreads } from "react-icons/fa6";
import useMeasure from "react-use-measure";

export default function ThreadButton() {
  const [ref, { width }] = useMeasure();

  return (
    <div ref={ref} className="flex flex-col w-full">
      <Tooltip
        className="xl:opacity-0 opacity-100"
        placement="right"
        content="Threads"
      >
        <Button
          radius="full"
          variant="light"
          isIconOnly={width <= 56}
          className="text-lg xl:self-start xl:w-max w-12 self-center xl:h-14 h-12 flex items-center xl:gap-5 xl:px-4"
        >
          <FaThreads className="w-7 h-7" />
          <span className="xl:block hidden">Threads</span>
        </Button>
      </Tooltip>
    </div>
  );
}
