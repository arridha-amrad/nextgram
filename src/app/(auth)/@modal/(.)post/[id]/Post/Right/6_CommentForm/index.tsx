import { TPost } from "@/lib/drizzle/queries/posts/fetchPost";
import Form from "./CommentForm";

type Props = {
  post: TPost;
};

function CommentForm({ post }: Props) {
  return (
    <section className="border-skin-border border-t" id="comment_form">
      <Form post={post} />
    </section>
  );
}

export default CommentForm;
