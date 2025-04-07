import { TFeedComment } from "@/app/(auth)/(home)/store";
import Comment from "./Comment";

type Props = {
  comments: TFeedComment[];
};

const FeedPostComments = ({ comments }: Props) => {
  return (
    <section id="post_comments" className="">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </section>
  );
};

export default FeedPostComments;
