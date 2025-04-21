"use client";

import { Button } from "@headlessui/react";
import { useSidebarContext } from "../Context";
import UserCard from "../UserCard";
import { usePathname } from "next/navigation";
import { removeAllSearchHistories } from "@/lib/actions/user";
import { useTranslations } from "next-intl";

function Histories() {
  const { histories } = useSidebarContext();

  const pathname = usePathname();
  const removeAll = async () => {
    await removeAllSearchHistories.bind(null, pathname)();
  };

  const t = useTranslations("Search");

  return (
    <>
      <div className="mb-4 flex justify-between px-4">
        <h1 className="text-foreground font-medium">{t("recent")}</h1>
        <Button
          onClick={removeAll}
          className="text-skin-primary text-sm font-medium"
        >
          {t("clearAll")}
        </Button>
      </div>
      <div className="w-full">
        {histories.map((user) => (
          <UserCard isRemovable={true} key={user.id} user={user} />
        ))}
      </div>
    </>
  );
}

export default Histories;
