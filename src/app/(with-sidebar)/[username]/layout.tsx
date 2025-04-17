import fetchUserMetadata from "@/lib/drizzle/queries/users/fetchUserMetadata";
import { fetchUserProfile } from "@/lib/drizzle/queries/users/fetchUserProfile";
import { getAuth } from "@/lib/next.auth";
import { ProfileStoreProvider } from "@/providers/profile-store-provider";
import { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import Footer from "../../../components/Footer";
import Highlights from "./Highlights";
import Tabs from "./Tabs";
import Profile from "./Profile";
import InstagramLogo from "@/components/InstagramLogo";
import { cn } from "@/lib/utils";
import { page } from "@/lib/pages";

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
          Sorry, this page isn&apos;t available.
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
    <ProfileStoreProvider>
      <main
        className={cn(
          "mx-auto w-full xl:max-w-[935px]",
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
        <Tabs username={username} />
        {children}
        {modal}
        <Footer />
      </main>
    </ProfileStoreProvider>
  );
};

export default Layout;
