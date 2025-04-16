import BottomNavigationBar from "@/components/BottomNavigationBar";
import TopBar from "@/components/TopBar";
import { getAuth } from "@/lib/next.auth";
import { ReactNode } from "react";
import Sidebar from "../sidebar";
import { fetchSearchHistories } from "@/lib/drizzle/queries/users/fetchSearchHistories";

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

export default async function Layout({ children, modal }: Props) {
  const session = await getAuth();

  const histories = session
    ? await fetchSearchHistories({
        userId: session.user.id,
      })
    : [];

  return (
    <div className="container mx-auto flex min-h-screen">
      {session?.user && (
        <>
          <TopBar searchHistories={histories} />
          <Sidebar />
          <BottomNavigationBar
            avatarUrl={session.user.image ?? "/default.jpg"}
            username={session.user.username}
          />
        </>
      )}
      {children}
      {modal}
    </div>
  );
}
