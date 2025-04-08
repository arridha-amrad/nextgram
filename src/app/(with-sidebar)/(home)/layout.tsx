import { auth } from "@/auth";
import Avatar from "@/components/Avatar";
import { page } from "@/lib/pages";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import Footer from "./Footer";

export const metadata: Metadata = {
  title: "Nextgram",
  description: "Home",
};

type Props = {
  children: ReactNode;
  stories: ReactNode;
  suggestedUsers: ReactNode;
};

const Layout = async ({ children, suggestedUsers, stories }: Props) => {
  const session = await auth();

  if (!session) {
    redirect(page.login);
  }

  const { image, name, username } = session.user;

  return (
    <section className="flex w-full">
      <div className="mx-auto w-full flex-1 space-y-4 sm:px-4 md:max-w-[630px]">
        {stories}
        {children}
      </div>
      <section className="sticky top-0 hidden h-screen shrink-0 basis-[320px] overflow-auto xl:block">
        <div className="flex items-center py-2 pb-4">
          <div className="flex w-full items-center gap-2 px-4 py-3">
            <div className="flex flex-1 basis-0 items-start justify-start gap-3">
              <Avatar url={image} />
              <div className="max-w-[150px] overflow-hidden text-sm">
                <h1 className="overflow-hidden font-semibold text-ellipsis whitespace-pre-line">
                  {username}
                </h1>
                <p className="text-skin-muted line-clamp-1">{name}</p>
              </div>
            </div>
            <Link
              className="text-skin-primary text-sm font-medium"
              href={`/${username}`}
            >
              visit
            </Link>
          </div>
        </div>
        {suggestedUsers}
        <Footer />
      </section>
    </section>
  );
};

export default Layout;
