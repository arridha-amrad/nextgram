import { db } from "@/lib/drizzle/db";
import { UsersTable } from "@/lib/drizzle/schema";
import { ilike, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (
  _: Request,
  { params }: { params: Promise<{ username: string }> },
) => {
  const { username } = await params;

  const users = await db
    .select({
      id: UsersTable.id,
      username: UsersTable.username,
      name: UsersTable.name,
      avatar: UsersTable.avatar,
    })
    .from(UsersTable)
    .where(
      or(
        ilike(UsersTable.username, `%${username}%`),
        ilike(UsersTable.name, `%${username}%`),
      ),
    )
    .limit(10);

  return NextResponse.json(users, { status: 200 });
};
