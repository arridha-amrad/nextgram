import { db } from "@/lib/drizzle/db";
import { FollowingsTable, UsersTable } from "../../schema";
import { sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { USERS } from "@/lib/cacheKeys";

const query2 = async (userId: string) => {
  const result = await db.execute(sql`
    SELECT 
      ${UsersTable.id},
      ${UsersTable.username}, 
      ${UsersTable.avatar}, 
      ${UsersTable.name}
    FROM ${UsersTable}
    WHERE ${UsersTable.id} NOT IN (
      SELECT ${FollowingsTable.followId} 
      FROM ${FollowingsTable}
      WHERE ${FollowingsTable.userId} = ${userId}
    )
    AND ${UsersTable.id} != ${userId}
    LIMIT 5
    `);

  return result.rows;
};

export type TSuggestedUsers = {
  id: string;
  username: string;
  avatar: string;
  name: string;
};

const fetchSuggestedUsers = unstable_cache(
  async (authUserId: string): Promise<TSuggestedUsers[]> => {
    const users = (await query2(authUserId)) as TSuggestedUsers[];
    return users;
  },
  [USERS.suggestedUsers],
  {
    tags: [USERS.suggestedUsers],
    revalidate: 60 * 5,
  },
);

export default fetchSuggestedUsers;
