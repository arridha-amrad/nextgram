import { TSearchUser } from "@/lib/drizzle/queries/users/fetchSearchHistories";
import Container from "./Container";
import { SidebarProvider } from "./Context";
import Links from "./Links";

import { TNotification } from "@/lib/drizzle/queries/users/fetchUserNotifications";
import Options from "./Options";
import SidebarBrand from "./SidebarBrand";
import Threads from "./Threads";

type Props = {
  avatar: string;
  username: string;
  users: TSearchUser[];
  notifications: TNotification[];
};

export default async function Sidebar({
  notifications,
  users,
  avatar,
  username,
}: Props) {
  return (
    <SidebarProvider
      notificationsData={notifications}
      histories={users}
      searchResult={[]}
    >
      <Container>
        <SidebarBrand />
        <div className="mb-2 flex-1">
          <Links avatar={avatar} username={username} />
        </div>
        <div className="mb-8 space-y-2">
          <Threads />
          <Options />
        </div>
      </Container>
    </SidebarProvider>
  );
}
