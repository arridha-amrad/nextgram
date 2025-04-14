import { loadMoreUserPosts } from "@/lib/drizzle/queries/posts/fetchUserPosts";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{ username: string }>;
};

export const GET = async (req: NextRequest, { params }: Params) => {
  const username = (await params).username;
  const searchParams = req.nextUrl.searchParams;
  const date = searchParams.get("date");
  const total = searchParams.get("total");

  const data = await loadMoreUserPosts({
    date: date ? new Date(date) : new Date(),
    total: Number(total),
    username: username,
  });

  return NextResponse.json(data, { status: 200 });
};
