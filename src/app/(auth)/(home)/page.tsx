import { auth } from "@/auth";
import FeedPosts from "./FeedPosts";
import { fetchFeedPosts } from "@/lib/drizzle/queries/posts/fetchFeedPosts";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import { ErrorBoundary } from "react-error-boundary";

export default async function Page() {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    redirect("/login");
  }

  const postsPromise = fetchFeedPosts({ page: 1, userId });

  return (
    <div className="py-4">
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense
          fallback={
            <div>
              <Spinner />
            </div>
          }
        >
          <FeedPosts postsPromise={postsPromise} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
