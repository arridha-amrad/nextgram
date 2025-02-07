import { auth } from "@/auth";
import Avatar from "@/components/Avatar";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Instagram",
  description: "Home",
};

type Props = {
  children: ReactNode;
  suggestedUsers: ReactNode;
};

const Layout = async ({ children, suggestedUsers }: Props) => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const { image, name, username } = session.user;

  return (
    <section className="flex w-full">
      <section className="mx-auto min-h-screen w-full max-w-md flex-1">
        {children}
      </section>
      <section className="sticky inset-y-0 hidden h-screen min-h-[500px] w-full max-w-xs shrink-0 lg:block">
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
              className="text-skin-inverted text-sm font-medium"
              href={`/${username}`}
            >
              visit
            </Link>
          </div>
        </div>
        {suggestedUsers}
      </section>
    </section>
  );
};

export default Layout;
