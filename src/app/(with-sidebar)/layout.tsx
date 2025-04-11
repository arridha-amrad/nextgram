import BottomNavigationBar from "@/components/BottomNavigationBar";
import TopBar from "@/components/Topbar";
import { getAuth } from "@/lib/next.auth";
import { ReactNode } from "react";
import Sidebar from "../sidebar";

type Props = {
  sidebar: ReactNode;
  children: ReactNode;
  modal: ReactNode;
};

export default async function Layout({ children, modal, sidebar }: Props) {
  const session = await getAuth();
  return (
    <div className="container mx-auto flex min-h-screen">
      {session?.user && (
        <>
          <TopBar />
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
