import { savePost as savedFeedPost } from "@/lib/actions/post";
import { showToast } from "@/lib/utils";

export const bookmarkFeedPost = async (
  postId: string,
  pathname: string,
  callback: VoidFunction,
) => {
  callback();
  const result = await savedFeedPost.bind(null, pathname)({ postId });
  if (result?.serverError) {
    showToast(result.serverError, "error");
    callback();
  }
};
