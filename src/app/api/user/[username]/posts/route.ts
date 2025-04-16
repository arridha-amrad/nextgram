import { loadMoreUserSavedPosts } from "@/lib/drizzle/queries/posts/fetchSavedPosts";
import { loadMoreUserPosts } from "@/lib/drizzle/queries/posts/fetchUserPosts";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{ username: string }>;
};

export const GET = async (req: NextRequest, { params }: Params) => {
  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get("type");
  const date = searchParams.get("date");
  const d = date ? new Date(date) : new Date();
  if (type === "saved") {
    try {
      const username = (await params).username;
      const data = await loadMoreUserSavedPosts({ date: d, username });
      return NextResponse.json(data, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 },
      );
    }
  } else {
    try {
      const username = (await params).username;
      const data = await loadMoreUserPosts({
        date: d,
        username: username,
      });
      return NextResponse.json(data, { status: 200 });
    } catch (err) {
      console.log(err);
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 },
      );
    }
  }
};
