export const loadMoreComments = async (postId: string, date: Date) => {
  try {
    const response = await fetch(
      `/api/posts/${postId}/comments?date=${date.toISOString()}`,
    );
    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      throw new Error("Failed to load more posts");
    }
    const data = await response.json();
    return data.comments;
  } catch (err) {
    throw err;
  }
};
