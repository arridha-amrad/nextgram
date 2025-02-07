import Profile from "@/app/(auth)/[username]/Profile";
import fetchUserMetadata from "@/lib/drizzle/queries/users/fetchUserMetadata";
import { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import Tabs from "./Tabs";
import { getAuth } from "@/lib/next.auth";
import { fetchUserProfile } from "@/lib/drizzle/queries/users/fetchUserProfile";
import ErrorBoundary from "next/dist/client/components/error-boundary";

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

  return (
    <main className="w-full py-4">
      <Profile profileData={profile} />
      <Tabs username={username} />
      {children}
      {modal}
    </main>
  );
};

export default Layout;
