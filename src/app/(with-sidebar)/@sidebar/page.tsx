import { getAuth } from "@/lib/next.auth";
import ExploreLink from "./Menu/Explore";
import HomeLink from "./Menu/Home";
import MessagesLink from "./Menu/Messages";
import NewPost from "./Menu/NewPost";
import NotificationLink from "./Menu/Notifications";
import Profile from "./Menu/Profile";
import ReelsLink from "./Menu/Reels";
import SearchLink from "./Menu/Search";
import Threads from "./Menu/Threads";
import Options from "./Options";
import SidebarBrand from "./SidebarBrand";
import Container from "./Container";
import { SidebarProvider } from "./Context";
import { fetchSearchHistories } from "@/lib/drizzle/queries/users/fetchSearchHistories";
import { searchUser as search } from "@/lib/drizzle/queries/users/searchUser";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ searchParams }: Props) {
  const session = await getAuth();
  if (!session) return null;
  const histories = await fetchSearchHistories({ userId: session.user.id });
  const sp = await searchParams;

  const searchResult =
    sp.searchUser && typeof sp.searchUser === "string"
      ? await search(sp.searchUser)
      : [];

  console.log(searchResult);

  return (
    <SidebarProvider histories={histories} searchResult={searchResult}>
      <Container>
        <div className="flex h-screen w-fit flex-col overflow-y-auto px-1">
          <SidebarBrand />
          <div className="mb-2 flex-1">
            <div className="space-y-2">
              <HomeLink />
              <SearchLink />
              <ExploreLink />
              <ReelsLink />
              <MessagesLink />
              <NotificationLink />
              <NewPost />
              <Profile
                avatar={session.user.image ?? "/default.jpg"}
                username={session.user.username}
              />
            </div>
          </div>
          <div className="mb-8 space-y-2">
            <Threads />
            <Options />
          </div>
        </div>
      </Container>
    </SidebarProvider>
  );
}
