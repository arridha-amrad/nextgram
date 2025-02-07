"use client";

import Avatar from "@/components/Avatar";
import ButtonFollow from "@/components/ButtonFollow";
import Button from "@/components/core/Button";
import SvgFemale from "@/components/svg/SvgFemale";
import SvgMale from "@/components/svg/SvgMale";
import { TProfile } from "@/lib/drizzle/queries/users/fetchUserProfile";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import AvatarEditable from "../../../components/AvatarEditable";
import Settings from "../../../components/Settings";
import { useSession } from "next-auth/react";

type Props = {
  profileData: TProfile;
};

export default function Profile({ profileData: user }: Props) {
  const { username } = useParams();
  const { data } = useSession();
  const isAuthUser = username === data?.user.username;

  const router = useRouter();

  return (
    <section className="flex flex-col justify-center gap-10 sm:flex-row sm:items-start">
      <div className="flex items-center justify-start sm:justify-center">
        {isAuthUser ? (
          <AvatarEditable avatar={user.avatar} />
        ) : (
          <Avatar className="w-24 sm:w-40" url={user.avatar} />
        )}
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-xl">{user.username}</h1>
          </div>
          {isAuthUser ? (
            <>
              <Button onClick={() => router.push("/settings")}>
                Edit Profile
              </Button>
              <Settings />
            </>
          ) : (
            <ButtonFollow
              isFollow={user.isFollowed ?? false}
              userId={user.id ?? ""}
            />
          )}
        </div>
        <div className="flex items-center gap-10 py-4">
          <div className="inline-flex">
            <h1 className="font-semibold">{user.sumPosts}</h1>
            <span className="pl-2">Posts</span>
          </div>

          <Link scroll={false} href={`/${username}/followers`}>
            <span className="font-semibold">{user.sumFollowers}</span>
            <span className="pl-2">Followers</span>
          </Link>

          <Link scroll={false} href={`/${username}/followings`}>
            <span className="font-semibold">{user.sumFollowings}</span>
            <span className="pl-2">Followings</span>
          </Link>
        </div>
        <div className="spacey-2 text-sm">
          <div className="flex items-center gap-1">
            <h1 className="font-medium">{user.name}</h1>
            {user.gender === "male" && <SvgMale className="fill-blue-500" />}
            {user.gender === "female" && (
              <SvgFemale className="fill-pink-500" />
            )}
          </div>
          <div className="text-skin-muted font-medium">{user.occupation}</div>
          <div className="whitespace-pre-line">{user.bio}</div>
          <div>
            <a
              target="_blank"
              className="font-semibold text-blue-500"
              href="https://www.google.com"
            >
              {user.website}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
