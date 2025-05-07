import { loadMoreExplorePosts } from "@/lib/drizzle/queries/posts/fetchExplorePosts";
import { getAuth } from "@/lib/next.auth";
import { page } from "@/lib/pages";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const session = await getAuth();
  if (!session) {
    redirect(page.login);
  }

  const date = req.nextUrl.searchParams.get("date") as string;

  try {
    const posts = await loadMoreExplorePosts(session.user.id, new Date(date));
    return NextResponse.json({ posts }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
};
