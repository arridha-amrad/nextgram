"use client";

import Spinner from "@/components/Spinner";
import { useLastElement } from "@/hooks/useLastElement";
import { loadMoreFeedPosts } from "@/lib/actions/post";
import { useFeedPosts } from "./store";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FeedPost from "./FeedPost";
import { TFeedPost } from "@/lib/drizzle/queries/posts/fetchFeedPosts";
import { TInfiniteResult } from "@/lib/drizzle/queries/type";

type Props = {
  posts: TInfiniteResult<TFeedPost>;
};

export default function FeedPosts({ posts: initPosts }: Props) {
  const addPosts = useFeedPosts((state) => state.addPosts);
  const page = useFeedPosts((state) => state.page);
  const posts = useFeedPosts((state) => state.posts);
  const total = useFeedPosts((state) => state.total);
  const date = useFeedPosts((state) => state.date);
  const setPosts = useFeedPosts((state) => state.setPosts);

  const [currPage, setCurrPage] = useState(page);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const pathname = usePathname();

  const lastElementRef = useLastElement({
    callback: () => setCurrPage((val) => val + 1),
    data: posts,
    loading,
    total: total,
  });

  useEffect(() => {
    if (initPosts.total > 0) {
      setPosts(initPosts);
    }
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const result = await loadMoreFeedPosts.bind(
          null,
          pathname,
        )({
          page: currPage,
          date: new Date(date),
          total: total,
        });
        if (result?.data) {
          addPosts(result.data);
        }
      } catch (err) {
        toast.error("Something went wrong", { theme });
      } finally {
        setLoading(false);
      }
    };

    if (posts.length === 0) {
      return;
    } else {
      loadPosts();
    }
  }, [currPage]);

  const windowRowVirtualizer = useWindowVirtualizer({
    count: posts.length === total ? total : posts.length + 1,
    estimateSize: () => 50,
    overscan: 5,
  });

  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      style={{
        height: windowRowVirtualizer.getTotalSize(),
        width: "100%",
        position: "relative",
      }}
    >
      {windowRowVirtualizer.getVirtualItems().map((virtualRow) => {
        const post = posts[virtualRow.index];
        const isLoaderRow = virtualRow.index > posts.length - 1;
        return (
          <div
            key={virtualRow.key}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <div
              data-index={virtualRow.index}
              ref={windowRowVirtualizer.measureElement}
            >
              {isLoaderRow ? (
                <div
                  ref={lastElementRef}
                  className="flex items-center justify-center py-10"
                >
                  <Spinner />
                </div>
              ) : (
                <FeedPost post={post} />
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
