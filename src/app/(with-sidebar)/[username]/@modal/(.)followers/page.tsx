import { fetchUserFollowers } from "@/lib/drizzle/queries/users/fetchUserFollowers";
import { getAuth } from "@/lib/next.auth";
import Modal from "../Modal";
import Followers from "./Followers";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const username = (await params).username;
  const session = await getAuth();
  const users = await fetchUserFollowers({
    authUserId: session?.user.id,
    username,
  });

  return (
    <Modal href="followers">
      <Followers users={users} />
    </Modal>
  );
};

export default Page;
