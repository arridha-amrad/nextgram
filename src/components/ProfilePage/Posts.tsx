import Image from "next/image";
import CommentIcon from "@heroicons/react/24/solid/ChatBubbleOvalLeftIcon";
import HeartIcon from "@heroicons/react/24/solid/HeartIcon";

type Props = {
  fetched: string[];
};

export default function Posts({ fetched }: Props) {
  return fetched.map((url) => (
    <div key={url} className="relative group aspect-square cursor-pointer">
      <Image className="object-cover" alt="post" src={url} sizes="100vh" fill />
      <div className="absolute transition-opacity duration-400 ease-in group-hover:opacity-100 opacity-0 inset-0 bg-black/50 flex items-center justify-center gap-6">
        <div className="flex items-center gap-1">
          <HeartIcon className=" w-7 h-7" />
          <h1 className=" text-lg font-bold">150</h1>
        </div>
        <div className="flex items-center gap-1">
          <CommentIcon className="w-7 h-7 -scale-x-100" />
          <h1 className="text-lg font-bold">2000</h1>
        </div>
      </div>
    </div>
  ));
}
