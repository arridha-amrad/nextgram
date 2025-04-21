import { follow } from "@/lib/actions/follow";
import { showToast } from "@/lib/utils";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export const handleFollow = async (
  userToFollowId: string,
  pathname: string,
  callback: VoidFunction,
) => {
  try {
    const result = await follow.bind(
      null,
      pathname,
    )({ followId: userToFollowId });
    if (result?.data && result.data === "request") {
      callback();
    }
  } catch (err) {
    if (isRedirectError(err)) {
      return;
    }
    showToast("Something went wrong", "error");
  }
};
