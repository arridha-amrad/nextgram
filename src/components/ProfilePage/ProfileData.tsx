import { Avatar, Button } from "@nextui-org/react";
import { FaLink, FaThreads } from "react-icons/fa6";
import Link from "next/link";
import ProfileEditButton from "./ProfileEditBtn";
import ProfileViewArchiveButton from "./ProfileViewArchiveBtn";
import ProfileSettingsButton from "./ProfileSettingsBtn";
import SuggestUserButton from "./SuggestUserBtn";
import MessageButton from "./MessageBtn";
import FollowButton from "./FollowButton";

export default function ProfileData() {
  return (
    <div className="px-4">
      <div className="h-24 md:h-max w-full md:gap-10 px-4 flex items-center justify-between">
        <div className="w-auto md:flex-2 h-max">
          <Avatar
            className="w-20 h-20 md:w-40 md:h-40 text-large"
            src="https://i.pravatar.cc/150?u=a04258114e29026702d"
          />
        </div>
        <div className="md:flex-3 md:space-y-2 w-full">
          <div className="md:flex hidden items-center gap-4">
            <h1 className="text-lg">bltdilsah</h1>
            <ProfileEditButton />
            <ProfileViewArchiveButton />
            <ProfileSettingsButton />
          </div>
          <div className="flex w-full justify-evenly md:justify-start md:gap-10">
            <div className="flex items-center flex-col md:flex-row md:gap-2">
              <h1 className="font-bold">0</h1>
              <p>Posts</p>
            </div>
            <div className="flex items-center flex-col md:flex-row md:gap-2">
              <h1 className="font-bold">0</h1>
              <p>Followers</p>
            </div>
            <div className="flex items-center flex-col md:flex-row md:gap-2">
              <h1 className="font-bold">0</h1>
              <p>Followings</p>
            </div>
          </div>
          <div className="md:block hidden">
            <Description />
          </div>
        </div>
      </div>
      <div className="md:hidden block">
        <Description />
      </div>
      <div className="md:hidden flex items-center justify-start gap-4 mt-4">
        {false ? <ProfileEditButton /> : <FollowButton />}
        {false ? <ProfileViewArchiveButton /> : <MessageButton />}
        {false ? <ProfileSettingsButton /> : <SuggestUserButton />}
      </div>
    </div>
  );
}

const Description = () => {
  return (
    <>
      <h1 className="md:font-bold">Dilsah Bulut</h1>
      <h2 className="text-skin-accent">Nutritionist</h2>
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
    </>
  );
};
