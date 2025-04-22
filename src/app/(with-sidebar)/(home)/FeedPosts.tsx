"use client";

import Spinner from "@/components/Spinner";
import { loadMoreFeedPosts } from "@/lib/api/posts";
import { TFeedPost } from "@/lib/drizzle/queries/posts/fetchFeedPosts";
import { TInfiniteResult } from "@/lib/drizzle/queries/type";
import { showToast } from "@/lib/utils";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import FeedPost from "./FeedPost";
import { useFeedPosts } from "./store";

type Props = {
  posts: TInfiniteResult<TFeedPost>;
};

export default function FeedPosts({ posts: initialPosts }: Props) {
  const addPosts = useFeedPosts((state) => state.addPosts);
  const hasMore = useFeedPosts((state) => state.hasMore);
  const posts = useFeedPosts((state) => state.posts);
  const total = useFeedPosts((state) => state.total);
  const setPosts = useFeedPosts((state) => state.setPosts);

  const [currPage, setCurrPage] = useState(0);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [latestDate, setLatestDate] = useState(new Date());

  const { ref: refObserver, inView } = useInView({ threshold: 1 });
  const [stop, setStop] = useState(false);

  useEffect(() => {
    if (initialPosts.data.length > 0) {
      setPosts(initialPosts);
      const d = initialPosts.data[initialPosts.data.length - 1].createdAt;
      setLatestDate(d);
      setCurrPage(1);
      const id = setTimeout(() => {
        setHasInitialized(true);
      }, 1000);
      return () => {
        clearTimeout(id);
      };
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      setCurrPage((val) => (val += 1));
      try {
        const result = await loadMoreFeedPosts({
          date: new Date(latestDate),
          page: currPage + 1,
          total,
        });
        if (result.data.length > 0) {
          addPosts(result);
          const date = result.data[result.data.length - 1].createdAt;
          setLatestDate(date);
        } else {
          setStop(true);
        }
      } catch {
        showToast("Something went wrong", "error");
        setStop(true);
      }
    };

    if (inView && hasInitialized) {
      loadPosts();
    }
    // eslint-disable-next-line
  }, [inView]);

  const windowRowVirtualizer = useWindowVirtualizer({
    count: hasMore && !stop ? posts.length + 1 : posts.length,
    estimateSize: () => 100,
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
              {isLoaderRow && hasMore && !stop ? (
                <div
                  ref={refObserver}
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
