import { fetchUserProfileDetails } from "@/lib/drizzle/queries/users/fetchUserProfileDetails";

import Avatar from "@/components/Avatar";
import { getAuth } from "@/lib/next.auth";
import { page } from "@/lib/pages";
import { redirect } from "next/navigation";
import FormEditProfile from "./Form";
import Footer from "@/components/Footer";

const Page = async () => {
  const session = await getAuth();

  if (!session) {
    redirect(`${page.login}?cbUrl=${page.settings}`);
  }

  const profile = await fetchUserProfileDetails({
    username: session.user.username,
  });

  return (
    <div className="w-full">
      <div className="mx-auto w-full px-10 xl:max-w-[706px]">
        <div className="flex h-[100px] items-center justify-start">
          <h1 className="text-xl font-bold">Edit profile</h1>
        </div>
        <div className="bg-bg-secondary flex h-[88px] w-full items-center rounded-xl px-6">
          <div className="flex flex-1 items-center gap-4">
            <Avatar className="size-[56px]" url={profile?.avatar} />
            <div className="text-sm">
              <h1 className="font-bold">{profile?.username}</h1>
              <p className="text-foreground/50">{profile?.name}</p>
            </div>
          </div>
          <button className="bg-skin-primary rounded-lg px-6 py-1.5 text-sm font-semibold">
            Change Photo
          </button>
        </div>
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
