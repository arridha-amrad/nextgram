import { useFeedPostContext } from "../Context";
import Comment from "./Comment";

const FeedPostComments = () => {
  const { post } = useFeedPostContext();

  return (
    <section id="post_comments" className="">
      {post?.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </section>
  );
};

export default FeedPostComments;
