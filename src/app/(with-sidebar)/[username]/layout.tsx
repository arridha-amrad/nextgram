import Avatar from "@/components/Avatar";
import AvatarEditable from "@/components/AvatarEditable";
import ButtonFollow from "@/components/ButtonFollow";
import Settings from "@/components/Settings";
import SvgFemale from "@/components/svg/SvgFemale";
import SvgMale from "@/components/svg/SvgMale";
import fetchUserMetadata from "@/lib/drizzle/queries/users/fetchUserMetadata";
import { fetchUserProfile } from "@/lib/drizzle/queries/users/fetchUserProfile";
import { getAuth } from "@/lib/next.auth";
import { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import Tabs from "./Tabs";

type Props = {
  params: Promise<{ username: string }>;
  children: ReactNode;
  modal: ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = (await params).username;
  const user = await fetchUserMetadata(username);
  if (!user) {
    return {
      title: "Page is not found",
    };
  }
  return {
    title: `${user?.name} (@${user.username}) • Instagram`,
    description: `${user.username} instagram profile page`,
  };
}

const Layout = async ({ children, modal, params }: Props) => {
  const username = (await params).username;
  const session = await getAuth();

  const profile = await fetchUserProfile({
    username,
    authUserId: session?.user.id,
  });

  if (profile === null) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-semibold">
          Sorry, this page isn't available.
        </h1>
        <p>
          The link you followed may be broken, or the page may have been
          removed. Go back to Instagram.
        </p>
      </div>
    );
  }

  const isAuthUser = session?.user.username === username;

  return (
    <main className="w-full py-4">
      <section className="flex flex-col justify-center gap-10 sm:flex-row sm:items-start">
        <div className="flex items-center justify-start sm:justify-center">
          {isAuthUser ? (
            <AvatarEditable avatar={profile.avatar} />
          ) : (
            <Avatar className="w-24 sm:w-40" url={profile.avatar} />
          )}
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-6">
            <div>
              <h1 className="text-xl">{profile.username}</h1>
            </div>
            {isAuthUser ? (
              <>
                <Link
                  href="/settings"
                  className="bg-skin-primary flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-2 text-sm leading-5 font-medium text-white transition-all duration-200 ease-linear disabled:brightness-125"
                >
                  Edit Profile
                </Link>

                <Settings />
              </>
            ) : (
              <ButtonFollow
                isFollow={profile.isFollowed ?? false}
                userId={profile.id ?? ""}
              />
            )}
          </div>
          <div className="flex items-center gap-10 py-4">
            <div className="inline-flex">
              <h1 className="font-semibold">{profile.sumPosts}</h1>
              <span className="pl-2">Posts</span>
            </div>

            <Link scroll={false} href={`/${username}/followers`}>
              <span className="font-semibold">{profile.sumFollowers}</span>
              <span className="pl-2">Followers</span>
            </Link>

            <Link scroll={false} href={`/${username}/followings`}>
              <span className="font-semibold">{profile.sumFollowings}</span>
              <span className="pl-2">Followings</span>
            </Link>
          </div>
          <div className="spacey-2 text-sm">
            <div className="flex items-center gap-1">
              <h1 className="font-medium">{profile.name}</h1>
              {profile.gender === "male" && (
                <SvgMale className="fill-blue-500" />
              )}
              {profile.gender === "female" && (
                <SvgFemale className="fill-pink-500" />
              )}
            </div>
            <div className="text-skin-muted font-medium">
              {profile.occupation}
            </div>
            <div className="whitespace-pre-line">{profile.bio}</div>
            <div>
              <a
                target="_blank"
                className="font-semibold text-blue-500"
                href="https://www.google.com"
              >
                {profile.website}
              </a>
            </div>
          </div>
        </div>
      </section>
      <Tabs username={username} />
      {children}
      {modal}
    </main>
  );
};

export default Layout;
