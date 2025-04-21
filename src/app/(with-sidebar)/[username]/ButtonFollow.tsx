"use client";

import Button from "@/components/core/Button";
import { handleFollow } from "@/handlers/user";
import { cn } from "@/lib/utils";
import { useProfileStore } from "@/providers/profile-store-provider";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";

const ButtonFollow = () => {
  const profile = useProfileStore((store) => store.profile);
  const updateProfile = useProfileStore((store) => store.updateProfile);
  const pathname = usePathname();
  const [isPending, setPending] = useState(false);

  const follow = async () => {
    if (!profile) return;
    setPending(true);
    try {
      await handleFollow(profile.id, pathname, () => {
        updateProfile({
          isFollowRequested: true,
        });
      });
    } catch (err) {
      console.log(err);
    } finally {
      setPending(false);
    }
  };

  const t = useTranslations("ProfilePage");

  if (!profile) return null;

  return (
    <Button
      onClick={follow}
      className={cn(
        (profile.isFollowed || profile.isFollowRequested) && "bg-bg-secondary",
      )}
      isLoading={isPending}
      type="submit"
    >
      <span>
        {profile.isFollowed
          ? t("unFollow")
          : profile.isFollowRequested
            ? t("requested")
            : t("follow")}
      </span>
    </Button>
  );
};

export default ButtonFollow;
