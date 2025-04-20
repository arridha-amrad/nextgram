"use client";

import Button from "@/components/core/Button";
import { follow as fl } from "@/lib/actions/follow";
import { cn } from "@/lib/utils";
import { useProfileStore } from "@/providers/profile-store-provider";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ButtonFollow = () => {
  const profile = useProfileStore((store) => store.profile);
  const updateProfile = useProfileStore((store) => store.updateProfile);
  const pathname = usePathname();
  const [isPending, setPending] = useState(false);

  const follow = async () => {
    if (!profile) return;
    setPending(true);
    try {
      const result = await fl.bind(null, pathname)({ followId: profile?.id });
      if (result?.data && result.data === "request") {
        updateProfile({
          isFollowRequested: true,
        });
      }
    } catch (err) {
      if (isRedirectError(err)) {
        return;
      }
      toast.error("Something went wrong");
    } finally {
      setPending(false);
    }
  };

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
          ? "Unfollow"
          : profile.isFollowRequested
            ? "Requested"
            : "Follow"}
      </span>
    </Button>
  );
};

export default ButtonFollow;
