"use client";

import Spinner from "@/components/Spinner";
import { loadMoreUserPosts } from "@/lib/api/posts";
import { TUserPost } from "@/lib/drizzle/queries/posts/fetchUserPosts";
import { InfiniteResult } from "@/lib/drizzle/queries/type";
import { useUserPostStore } from "@/lib/stores/profilePostStore";
import { showToast, toMatrixPost } from "@/lib/utils";
import { useVirtualizer, useWindowVirtualizer } from "@tanstack/react-virtual";
import { useParams } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import useMeasure from "react-use-measure";
import Post from "./PostCard";

type Props = {
  initialPosts: InfiniteResult<TUserPost>;
};

export default function UserPosts({ initialPosts }: Props) {
  const addPosts = useUserPostStore((state) => state.addPosts);
  const setPosts = useUserPostStore((state) => state.setPosts);
  const profilePosts = useUserPostStore((state) => state.posts);
  const hasMore = useUserPostStore((state) => state.hasMorePosts);

  const params = useParams();
  const [rowRef, { width }] = useMeasure();
  const { ref: refObserver, inView } = useInView({ threshold: 1 });
  const posts = toMatrixPost(profilePosts);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const parentOffsetRef = useRef(0);
  const [latestDate, setLatestDate] = useState(new Date());
  const [hasInitialized, setHasInitialized] = useState(false);
  const [stop, setStop] = useState(false);

  useEffect(() => {
    if (initialPosts.data.length > 0) {
      setPosts(initialPosts.data, "default", initialPosts.total);
      if (initialPosts.total <= 6) {
        setStop(true);
      } else {
        const d = initialPosts.data[initialPosts.data.length - 1].createdAt;
        setLatestDate(d);
        const id = setTimeout(() => {
          setHasInitialized(true);
        }, 1000);
        return () => {
          clearTimeout(id);
        };
      }
    }
    // eslint-disable-next-line
  }, []);

  useLayoutEffect(() => {
    parentOffsetRef.current = parentRef.current?.offsetTop ?? 0;
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await loadMoreUserPosts({
          date: new Date(latestDate),
          username: params.username as string,
        });
        if (data.length > 0) {
          addPosts(data, "default");
          if (data.length < 6) {
            setStop(true);
          } else {
            const date = data[data.length - 1].createdAt;
            setLatestDate(date);
          }
        } else {
          setStop(true);
        }
      } catch {
        showToast("Something went wrong", "error");
        setStop(true);
      }
    };
    if (inView && hasInitialized) {
      fetchPosts();
    }
    // eslint-disable-next-line
  }, [inView]);

  const rowVirtualizer = useWindowVirtualizer({
    count: hasMore && !stop ? posts.length + 1 : posts.length,
    estimateSize: () => 100,
    overscan: 5,
  });

  const colVirtualizer = useVirtualizer({
    horizontal: true,
    count: 3,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
  });

  return (
    <div ref={parentRef} className="w-full">
      <div
        ref={rowRef}
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const isLoaderRow = virtualRow.index === posts.length;
          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                transform: `translateY(${
                  virtualRow.start - rowVirtualizer.options.scrollMargin
                }px)`,
                display: "flex",
              }}
              className="relative w-full"
            >
              {isLoaderRow && hasMore && !stop ? (
                <div
                  className="flex w-full items-center justify-center py-4"
                  ref={refObserver}
                >
                  <Spinner />
                </div>
              ) : (
                colVirtualizer.getVirtualItems().map((virtualCol) => {
                  const post = posts[virtualRow.index][virtualCol.index];
                  return (
                    <div
                      key={virtualCol.key}
                      className="aspect-square p-0.5"
                      style={{
                        width: width / 3,
                      }}
                    >
                      {post && (
                        <Post
                          post={posts[virtualRow.index][virtualCol.index]}
                        />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
