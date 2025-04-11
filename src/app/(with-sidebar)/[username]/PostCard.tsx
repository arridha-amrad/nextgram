"use client";

import { TUserPost } from "@/lib/drizzle/queries/type";
import { rgbDataURL } from "@/lib/utils";
import {
  ChatBubbleOvalLeftIcon,
  DocumentDuplicateIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import { memo } from "react";

type Props = {
  post: TUserPost;
};

const PostCard = memo(({ post }: Props) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/post/${post.id}`, { scroll: false })}
      className="relative aspect-[3/4] cursor-pointer overflow-hidden"
    >
      <Image
        src={post.urls[0].url}
        alt="post_image"
        placeholder="blur"
        blurDataURL={rgbDataURL(46, 46, 46)}
        width={1000}
        height={1000}
        className="h-full w-full object-cover"
      />
      {post.urls.length > 1 && (
        <div className="absolute top-2 right-2">
          <DocumentDuplicateIcon className="aspect-square w-4 md:w-5" />
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 md:gap-2">
            <HeartIcon className="aspect-square w-5 text-white md:w-7" />
            <p className="text-sm text-white md:text-base">{post.sumLikes}</p>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <ChatBubbleOvalLeftIcon className="aspect-square w-5 -scale-x-100 text-white md:w-7" />
            <p className="text-sm text-white md:text-base">
              {post.sumComments}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PostCard;
