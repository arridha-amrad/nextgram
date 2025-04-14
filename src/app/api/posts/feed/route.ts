import { fetchFeedPostsForRouteHandler } from "@/lib/drizzle/queries/posts/fetchFeedPosts";
import { getAuth } from "@/lib/next.auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get("date");
  const page = searchParams.get("page");
  const total = searchParams.get("total");

  const session = await getAuth();

  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({ message: "UnAutehnticated" }, { status: 401 });
  }

  const result = await fetchFeedPostsForRouteHandler({
    date: date ? new Date(date) : new Date(),
    userId: session?.user.id ?? "",
    page: Number(page),
    total: Number(total),
  });

  return NextResponse.json(result, { status: 200 });
};
