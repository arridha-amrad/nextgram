import Footer from "@/components/Footer";
import Link from "next/link";
import ModalPrivacy from "./Modal";
import { fetchUserProfile } from "@/lib/drizzle/queries/users/fetchUserProfile";
import { getAuth } from "@/lib/next.auth";
import { redirect } from "next/navigation";
import { page } from "@/lib/pages";

export default async function Page() {
  const session = await getAuth();
  if (!session) {
    redirect(`${page.login}?cbUrl=${page.accountPrivacy}`);
  }

  const profile = await fetchUserProfile({
    username: session.user.username,
  });

  if (!profile) {
    redirect(page.login);
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="mx-auto w-full flex-1 px-10 xl:max-w-[706px]">
        <div className="flex h-[100px] items-center justify-start">
          <h1 className="text-xl font-bold">Account Privacy</h1>
        </div>

        <div className="space-y-8">
          <ModalPrivacy isPrivate={profile.isProtected} />
          <p className="text-foreground/70 text-xs font-light">
            When your account is public, your profile and posts can be seen by
            anyone, on or off Instagram, even if they don&apos;t have an
            Instagram account.
          </p>
          <p className="text-foreground/70 text-xs font-light">
            When your account is private, only the followers you approve can see
            what you share, including your photos or videos on hashtag and
            location pages, and your followers and following lists. Certain info
            on your profile, like your profile picture and username, is visible
            to everyone on and off Instagram.{" "}
            <Link className="text-skin-muted text-xs font-medium" href="/">
              Learn more
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-2">
        <Footer />
      </div>
    </div>
  );
}
