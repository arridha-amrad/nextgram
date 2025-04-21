import { auth } from "@/auth";
import { page } from "@/lib/pages";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import CurrentUser from "./CurrentUser";
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

  return (
    <>
      <div className="mx-auto w-full flex-1 space-y-4 sm:px-4 md:max-w-[630px]">
        {stories}
        {children}
      </div>
      <section className="sticky top-0 hidden h-screen shrink-0 basis-[320px] overflow-auto xl:block">
        <div className="flex items-center py-2 pb-4">
          <CurrentUser user={session.user} />
        </div>
        {suggestedUsers}
        <Footer />
      </section>
    </>
  );
};

export default Layout;
