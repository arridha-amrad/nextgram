import { fetchUserProfileDetails } from "@/lib/drizzle/queries/users/fetchUserProfileDetails";

import Footer from "@/components/Footer";
import { getAuth } from "@/lib/next.auth";
import { page } from "@/lib/pages";
import { redirect } from "next/navigation";
import FormEditProfile from "./Form";
import UpdateAvatar from "./UpdateAvatar";

const Page = async () => {
  const session = await getAuth();

  const profile = await fetchUserProfileDetails({
    username: session?.user.username ?? "",
  });
  if (!session || !profile) {
    redirect(`${page.login}?cbUrl=${page.settings}`);
  }

  return (
    <div className="w-full">
      <div className="mx-auto w-full px-10 xl:max-w-[706px]">
        <div className="flex h-[100px] items-center justify-start">
          <h1 className="text-xl font-bold">Edit profile</h1>
        </div>
        <UpdateAvatar
          avatarUrl={profile?.avatar}
          name={profile?.name}
          username={profile?.username}
        />
        {profile && (
          <FormEditProfile fullName={session.user.name} user={profile} />
        )}
      </div>
      <div className="mt-10 flex items-center justify-center gap-2">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
