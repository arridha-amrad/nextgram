"use client";

import Spinner from "@/components/Spinner";
import { loadMoreExplorePosts } from "@/lib/api/posts";
import { TUserPost } from "@/lib/drizzle/queries/posts/fetchUserPosts";
import { InfiniteResult } from "@/lib/drizzle/queries/type";
import { showToast, toMatrixPost } from "@/lib/utils";
import { useVirtualizer, useWindowVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import useMeasure from "react-use-measure";
import Post from "./PostCard";

type Props = {
  initialPosts: InfiniteResult<TUserPost>;
};

export default function ExplorePosts({ initialPosts }: Props) {
  const [explorePosts, setExplorePosts] = useState<TUserPost[]>([]);

  const [rowRef, { width }] = useMeasure();
  const { ref: refObserver, inView } = useInView({ threshold: 1 });
  const posts = toMatrixPost(explorePosts);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [latestDate, setLatestDate] = useState(new Date());
  const [hasInitialized, setHasInitialized] = useState(false);
  const [stop, setStop] = useState(false);

  useEffect(() => {
    if (initialPosts.data.length > 0) {
      console.log(initialPosts.total);

      setExplorePosts(initialPosts.data);
      if (initialPosts.total < 24) {
        setStop(false);
      } else {
        console.log("here...");

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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await loadMoreExplorePosts(new Date(latestDate));
        console.log({ data });

        if (data.length > 0) {
          setExplorePosts((posts) => [...posts, ...data]);
          if (data.length < 24) {
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
    console.log({ inView, hasInitialized });

    if (inView && hasInitialized) {
      console.log("go fetch");

      fetchPosts();
    }
    // eslint-disable-next-line
  }, [inView]);

  const rowVirtualizer = useWindowVirtualizer({
    count: !stop ? posts.length + 1 : posts.length,
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
              {isLoaderRow && !stop ? (
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
