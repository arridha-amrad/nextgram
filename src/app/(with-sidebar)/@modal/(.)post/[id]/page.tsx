import { fetchComments } from "@/lib/drizzle/queries/comments/fetchComments";
import { fetchPost } from "@/lib/drizzle/queries/posts/fetchPost";
import { fetchPostMetadata } from "@/lib/drizzle/queries/posts/fetchPostMetadata";
import { getAuth } from "@/lib/next.auth";
import { Metadata } from "next";
import Modal from "./Modal";
import Post from "./Post";
import { ProfileStoreProvider } from "@/providers/profile-store-provider";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const post = await fetchPostMetadata(id);
  return {
    title: `Instagram Post by ${post?.username} added at ${new Intl.DateTimeFormat("en-US").format(post?.createdAt)} • Instagram`,
    description: `Instagram post created by ${post?.username}`,
  };
}

const Page = async ({ params }: Props) => {
  const session = await getAuth();
  const id = (await params).id;

  const [post, comments] = await Promise.all([
    await fetchPost({
      postId: id,
      userId: session?.user.id,
    }),
    await fetchComments({
      postId: id,
      userId: session?.user.id,
    }),
  ]);

  if (!post) {
    return (
      <div>
        <h1>Post not found</h1>
      </div>
    );
  }

  return (
    <ProfileStoreProvider>
      <Modal>
        <Post comments={comments} post={post} />
      </Modal>
    </ProfileStoreProvider>
  );
};

export default Page;
