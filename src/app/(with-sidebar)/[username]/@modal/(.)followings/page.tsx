import { auth } from "@/auth";
import { fetchUserFollowings } from "@/lib/drizzle/queries/users/fetchUserFollowings";
import Followings from "./Followings";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const session = await auth();
  const username = (await params).username;
  const users = await fetchUserFollowings({
    authUserId: session?.user.id,
    username,
  });

  return <Followings userId={session?.user.id ?? ""} users={users} />;
};

export default Page;
