import { fetchReplies } from "@/lib/drizzle/queries/replies/fetchReplies";
import { getAuth } from "@/lib/next.auth";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{ commentId: string }>;
};

export const GET = async (req: NextRequest, { params }: Params) => {
  const page = req.nextUrl.searchParams.get("page") ?? "1";
  const commentId = (await params).commentId;
  const session = await getAuth();
  const userId = session?.user.id;

  const replies = await fetchReplies({ commentId, page: Number(page), userId });

  return NextResponse.json({ replies }, { status: 200 });
};
