"use client";

import { useUserPosts } from "./store";
import Spinner from "@/components/Spinner";
import { loadMoreUserPosts } from "@/lib/actions/post";
import { TUserPost } from "@/lib/drizzle/queries/posts/fetchUserPosts";
import { TInfiniteResult } from "@/lib/drizzle/queries/type";
import { showToast } from "@/lib/utils";
import { useVirtualizer, useWindowVirtualizer } from "@tanstack/react-virtual";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import useMeasure from "react-use-measure";
import Post from "./PostCard";

const toMatrix = (data: TUserPost[]) => {
  const size = 3;
  const result: TUserPost[][] = [];
  for (let i = 0; i < data.length; i += size) {
    result.push(data.slice(i, i + size));
  }
  return result;
};

type Props = {
  initialPosts: TInfiniteResult<TUserPost>;
};

export default function UserPosts({ initialPosts }: Props) {
  const addPosts = useUserPosts((store) => store.addPosts);
  const userPosts = useUserPosts((store) => store.posts);
  const hasMore = useUserPosts((store) => store.hasMore);
  const lastDate = useUserPosts((store) => store.lastDate);
  const setHasMore = useUserPosts((store) => store.setHasMore);
  const total = useUserPosts((store) => store.total);
  const setPosts = useUserPosts((store) => store.setPosts);

  useEffect(() => {
    setPosts(initialPosts);
  }, []);

  const params = useParams();
  const pathname = usePathname();
  const [rowRef, { width }] = useMeasure();

  const { ref: refObserver, inView } = useInView({ threshold: 1 });

  const posts = toMatrix(userPosts);

  const parentRef = useRef<HTMLDivElement | null>(null);
  const parentOffsetRef = useRef(0);

  useLayoutEffect(() => {
    parentOffsetRef.current = parentRef.current?.offsetTop ?? 0;
  }, []);

  useEffect(() => {
    if (hasMore && inView) {
      loadMoreUserPosts
        .bind(
          null,
          pathname,
        )({
          date: lastDate,
          total,
          username: params.username as string,
        })
        .then((result) => {
          if (result?.data) {
            if (result.data.data.length === 0) {
              setHasMore(false);
            } else {
              addPosts(result.data);
            }
          }
          if (result?.serverError) {
            showToast(result.serverError, "error");
          }
        });
    }
  }, [hasMore, inView]);

  const rowVirtualizer = useWindowVirtualizer({
    count: hasMore ? posts.length + 1 : posts.length,
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
              {isLoaderRow ? (
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
