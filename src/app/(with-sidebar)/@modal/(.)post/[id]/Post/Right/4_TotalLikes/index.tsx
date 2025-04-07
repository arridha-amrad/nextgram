type Props = {
  sumLikes: number;
};

function Likes({ sumLikes }: Props) {
  return (
    <div className="px-4">
      {sumLikes > 0 && (
        <h1 className="font-semibold">
          {sumLikes}
          <span className="pl-1 text-sm">
            {sumLikes > 1 ? "likes" : "like"}
          </span>
        </h1>
      )}
    </div>
  );
}

export default Likes;
