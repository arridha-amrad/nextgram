import BottomNavigationBar from "@/components/BottomNavigationBar";
import { SidebarProvider } from "@/components/NewSidebar/Context";
import Sidebar from "@/components/NewSidebar";
import TopBar from "@/components/Topbar";
import { getAuth } from "@/lib/next.auth";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

const Layout = async ({ children, modal }: Props) => {
  const session = await getAuth();

  return (
    <div className="container mx-auto flex min-h-screen">
      {session?.user && (
        <>
          <TopBar />
          <SidebarProvider>
            <Sidebar
              avatarUrl={session.user.image ?? "/default.jpg"}
              username={session.user.username}
            />
          </SidebarProvider>
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
};

export default Layout;
