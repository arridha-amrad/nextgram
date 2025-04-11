import { fetchSearchHistories } from "@/lib/drizzle/queries/users/fetchSearchHistories";
import { getAuth } from "@/lib/next.auth";
import Container from "./Container";
import { SidebarProvider } from "./Context";
import Links from "./Links";

import Options from "./Options";
import SidebarBrand from "./SidebarBrand";
import Threads from "./Threads";

export default async function Sidebar() {
  const session = await getAuth();
  if (!session) return null;
  const histories = await fetchSearchHistories({ userId: session.user.id });

  return (
    <SidebarProvider histories={histories} searchResult={[]}>
      <Container>
        <SidebarBrand />
        <div className="mb-2 flex-1">
          <Links
            avatar={session.user.image ?? "/default.jpg"}
            username={session.user.username}
          />
        </div>
        <div className="mb-8 space-y-2">
          <Threads />
          <Options />
        </div>
      </Container>
    </SidebarProvider>
  );
}
