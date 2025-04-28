import { cacheKeys } from "@/lib/cacheKeys";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { db } from "../../db";
import { UsersTable } from "../../schema";

const fetchUserMetadata = unstable_cache(
  async (username: string) => {
    const user = await db
      .select({
        username: UsersTable.username,
        name: UsersTable.name,
      })
      .from(UsersTable)
      .where(eq(UsersTable.username, username));
    return user.length === 0 ? null : user[0];
  },
  [cacheKeys.users.metadata],
  {
    tags: [cacheKeys.users.metadata],
  },
);

export default fetchUserMetadata;
