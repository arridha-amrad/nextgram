import { useState } from "react";
import { usePostStore } from "../store";
import { getLikes } from "@/lib/api/posts";
import { showToast } from "@/lib/utils";
import ModalUsers from "@/components/ModalUsers";
import { useSession } from "next-auth/react";
import { TLikeUsers } from "@/lib/drizzle/queries/posts/fetchPostLikes";

function Likes() {
  const [open, setOpen] = useState(false);
  const post = usePostStore((store) => store.post);
  const sumLikes = post?.sumLikes;

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<TLikeUsers[]>([]);

  const { data } = useSession();

  const fetchLovers = async () => {
    if (!post) return;
    setLoading(true);
    try {
      const data = await getLikes({
        date: new Date(),
        page: 1,
        postId: post.id,
      });
      setUsers(data.data);
    } catch {
      showToast("Failed to fetch likes", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  if (!sumLikes) return null;

  if (sumLikes === 0) {
    return (
      <div className="px-4">
        <p className="text-sm">Be the first to like this post</p>
      </div>
    );
  }

  return (
    <div className="px-4">
      <button
        onClick={async () => {
          setOpen(true);
          await fetchLovers();
        }}
        className="space-x-1 text-sm font-semibold"
      >
        <span>{post.sumLikes}</span>
        <span>{post.sumLikes > 1 ? "likes" : "like"}</span>
      </button>
      <ModalUsers
        isLoading={loading}
        open={open}
        handleClose={handleCloseModal}
        title="Likes"
        userId={data?.user.id ?? ""}
        users={users}
      />
    </div>
  );
}

export default Likes;
