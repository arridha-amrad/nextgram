import { fetchPostLikes } from "@/lib/drizzle/queries/posts/fetchPostLikes";
import { getAuth } from "@/lib/next.auth";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{ id: string }>;
};

export const GET = async (request: NextRequest, { params }: Params) => {
  const searchParams = request.nextUrl.searchParams;
  const session = await getAuth();
  const postId = (await params).id;

  const page = searchParams.get("page");
  const date = searchParams.get("date");

  const result = await fetchPostLikes({
    postId,
    authUserId: session?.user.id,
    date: date ? new Date(date) : new Date(),
    page: Number(page),
  });

  return NextResponse.json(result, { status: 200 });
};
