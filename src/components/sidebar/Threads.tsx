"use client";

import { useTranslations } from "next-intl";
import ButtonLink from "./ButtonLink";
import { useSidebarContext } from "./Context";
import { ThreadIcon } from "./Icons";

function Threads() {
  const { setSmallSidebar } = useSidebarContext();
  const t = useTranslations("Sidebar");
  return (
    <ButtonLink
      activeIcon={<ThreadIcon />}
      icon={<ThreadIcon />}
      callback={() => setSmallSidebar((val) => !val)}
      label={t("threads")}
    />
  );
}

export default Threads;
