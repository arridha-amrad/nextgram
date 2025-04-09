"use client";

import ButtonLink from "../ButtonLink";
import { useSidebarContext } from "../Context";
import { ThreadIcon } from "../Icons";

function Threads() {
  const { setSmallSidebar } = useSidebarContext();
  return (
    <ButtonLink
      activeIcon={<ThreadIcon />}
      icon={<ThreadIcon />}
      callback={() => setSmallSidebar((val) => !val)}
      label="Threads"
    />
  );
}

export default Threads;
