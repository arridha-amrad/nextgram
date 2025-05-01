type Args = {
  postId: string;
  commentId: string;
  page: number;
};

export const loadMoreReplies = async ({ commentId, page, postId }: Args) => {
  try {
    const response = await fetch(
      `/api/posts/${postId}/comments/${commentId}?page=${page}`,
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    return data.replies;
  } catch (err) {
    throw err;
  }
};
