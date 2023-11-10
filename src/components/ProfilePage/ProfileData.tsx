import { Avatar, Button } from "@nextui-org/react";
import { FaLink, FaThreads } from "react-icons/fa6";
import Link from "next/link";

export default function ProfileData() {
  return (
    <div className="px-4">
      <div className="h-24 w-full px-4 flex items-center justify-between">
        <div className="w-auto">
          <Avatar
            className="w-20 h-20 text-large"
            src="https://i.pravatar.cc/150?u=a04258114e29026702d"
          />
        </div>
        <div className="flex w-full justify-evenly">
          <div className="flex items-center flex-col">
            <h1 className="font-bold">0</h1>
            <p>Posts</p>
          </div>
          <div className="flex items-center flex-col">
            <h1 className="font-bold">0</h1>
            <p>Followers</p>
          </div>
          <div className="flex items-center flex-col">
            <h1 className="font-bold">0</h1>
            <p>Followings</p>
          </div>
        </div>
      </div>
      <h1>Arridha Amrad</h1>
      <h2 className="text-skin-accent">Programmer</h2>
      <Button variant="flat" size="sm">
        <FaThreads className="w-4 h-4" />
        <span>@arridhaamrad</span>
      </Button>
      <p className="whitespace-break-spaces">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, quisquam.
        Lorem ipsum dolor sit.
      </p>
      <div className="space-x-2">
        <FaLink className="w-4 h-4 inline" />
        <Link className="inline" href="/">
          wwww.arridhaamrad.com
        </Link>
      </div>
    </div>
  );
}
