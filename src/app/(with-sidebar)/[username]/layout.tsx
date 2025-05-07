import Footer from "@/components/Footer";
import InstagramLogo from "@/components/InstagramLogo";
import fetchUserMetadata from "@/lib/drizzle/queries/users/fetchUserMetadata";
import { fetchUserProfile } from "@/lib/drizzle/queries/users/fetchUserProfile";
import { getAuth } from "@/lib/next.auth";
import { page } from "@/lib/pages";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import Highlights from "./Highlights";
import PrivateAccountInfo from "./PrivateAccountInfo";
import Profile from "./Profile";
import Tabs from "./Tabs";
import { notFound } from "next/navigation";

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
  const username = decodeURIComponent((await params).username);

  const session = await getAuth();

  const profile = await fetchUserProfile({
    username,
    authUserId: session?.user.id,
  });

  if (profile === null) {
    return notFound();
  }

  const isAuthUser = session?.user.username === username;

  const canYouSee = profile.isProtected
    ? isAuthUser
      ? true
      : profile.isFollowed
    : true;

  return (
    <main
      className={cn(
        "mx-auto flex w-full flex-col xl:max-w-[935px]",
        session ? "py-10" : "",
      )}
    >
      {!session && (
        <nav className="mb-10 flex w-full items-center justify-between px-4 py-2">
          <InstagramLogo className="text-3xl" />
          <div className="flex items-center gap-2">
            <Link
              className="bg-skin-primary flex h-8 items-center justify-center rounded-lg px-4 text-sm font-medium"
              href={page.login}
            >
              Login
            </Link>
            <Link
              className="text-skin-primary flex h-8 items-center justify-center rounded-lg px-4 text-sm font-medium"
              href={page.signup}
            >
              Signup
            </Link>
          </div>
        </nav>
      )}
      <Profile isAuthUser={isAuthUser} profile={profile} />
      {isAuthUser && <Highlights />}
      {canYouSee ? (
        <div className="mt-20 flex-1">
          {isAuthUser && <Tabs isAuthUser={isAuthUser} username={username} />}
          {children}
          {modal}
        </div>
      ) : (
        <PrivateAccountInfo />
      )}
      <Footer />
    </main>
  );
};

export default Layout;
