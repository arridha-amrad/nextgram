import fetchSuggestedUsers from "@/lib/drizzle/queries/users/fetchSuggestedUsers";
import { getAuth } from "@/lib/next.auth";
import { redirect } from "next/navigation";
import Users from "./Users";

export default async function Page() {
  const session = await getAuth();
  const uid = session?.user.id;
  if (!uid) {
    redirect("/login");
  }

  const users = fetchSuggestedUsers(uid);

  return <Users users={users} />;
}
