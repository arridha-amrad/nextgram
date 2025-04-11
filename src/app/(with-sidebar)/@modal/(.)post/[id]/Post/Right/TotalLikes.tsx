import { usePostStore } from "../store";

function Likes() {
  const post = usePostStore((store) => store.post);
  const sumLikes = post?.sumLikes;
  return (
    <div className="px-4">
      {sumLikes && sumLikes > 0 ? (
        <h1 className="font-semibold">
          {sumLikes}
          <span className="pl-1 text-sm">
            {sumLikes > 1 ? "likes" : "like"}
          </span>
        </h1>
      ) : (
        <p className="text-sm">Be the first to like this post</p>
      )}
    </div>
  );
}

export default Likes;
