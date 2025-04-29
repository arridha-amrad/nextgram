import { loadMoreComment } from "@/lib/drizzle/queries/comments/fetchComments";
import { getAuth } from "@/lib/next.auth";
import { page } from "@/lib/pages";
import { redirect, RedirectType } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{ id: string }>;
};

export const GET = async (req: NextRequest, { params }: Params) => {
  const postId = (await params).id;
  const session = await getAuth();

  if (!session) {
    redirect(page.login, RedirectType.replace);
  }

  const userId = session.user.id;
  const date = req.nextUrl.searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      {
        message: "please include string date to your url search params",
      },
      { status: 400 },
    );
  }

  const comments = await loadMoreComment(postId, new Date(date), userId);

  return NextResponse.json({ comments }, { status: 200 });
};
