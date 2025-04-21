"use client";

import AvatarEditable from "@/components/AvatarEditable";
import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";
import Settings from "@/components/Settings";
import SvgFemale from "@/components/svg/SvgFemale";
import SvgMale from "@/components/svg/SvgMale";
import { TProfile } from "@/lib/drizzle/queries/users/fetchUserProfile";
import Link from "next/link";
import { useParams } from "next/navigation";
import ButtonFollow from "./ButtonFollow";
import { useEffect } from "react";
import { useProfileStore } from "@/providers/profile-store-provider";

type Props = {
  isAuthUser: boolean;
  profile: TProfile;
};

export default function Profile({ isAuthUser, profile }: Props) {
  const { username } = useParams();
  const setProfile = useProfileStore((store) => store.setProfile);

  useEffect(() => {
    setProfile(profile);
  }, [setProfile, profile]);

  const canViewFollowingList =
    isAuthUser || !profile.isProtected || profile.isFollowed;

  return (
    <section className="mt-10 flex flex-col sm:grid sm:grid-cols-3 md:mt-0">
      <div className="flex items-center justify-start px-4 sm:justify-center">
        {isAuthUser ? (
          <AvatarEditable avatar={profile.avatar} />
        ) : (
          <AvatarWithStoryIndicator
            isStoryExists={false}
            isStoryWatched={false}
            size={150}
            avatarUrl={profile.avatar}
          />
        )}
      </div>
      <div className="mt-4 px-4 sm:col-span-2 sm:mt-0 sm:px-0">
        <div className="flex items-center gap-4">
          <h1 className="text-xl">{profile.username}</h1>
          {isAuthUser ? (
            <>
              <Link
                href="/settings"
                className="bg-bg-secondary flex cursor-pointer items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm leading-5 font-medium transition-all duration-200 ease-linear disabled:brightness-125"
              >
                Edit Profile
              </Link>

              <Settings />
            </>
          ) : (
            <ButtonFollow />
          )}
        </div>
        <div className="flex items-center gap-10 py-4">
          <ProfilePostFollowersFollowings
            label="posts"
            total={profile.sumPosts}
          />
          {canViewFollowingList ? (
            <Link scroll={false} href={`/${username}/followers`}>
              <ProfilePostFollowersFollowings
                label="followers"
                total={profile.sumFollowers}
              />
            </Link>
          ) : (
            <ProfilePostFollowersFollowings
              label="followers"
              total={profile.sumFollowers}
            />
          )}

          {canViewFollowingList ? (
            <Link scroll={false} href={`/${username}/followings`}>
              <ProfilePostFollowersFollowings
                label="followings"
                total={profile.sumFollowings}
              />
            </Link>
          ) : (
            <ProfilePostFollowersFollowings
              label="followings"
              total={profile.sumFollowings}
            />
          )}
        </div>

        <div className="spacey-2 text-sm">
          <div className="flex items-center gap-1">
            <h1 className="font-medium">{profile.name}</h1>
            {profile.gender === "male" && <SvgMale className="fill-blue-500" />}
            {profile.gender === "female" && (
              <SvgFemale className="fill-pink-500" />
            )}
          </div>
          <div className="text-foreground/70">{profile.occupation}</div>
          <div className="whitespace-pre-line">{profile.bio}</div>
          <div>
            <a
              target="_blank"
              className="font-semibold text-blue-500"
              href="https://www.google.com"
            >
              {profile.website}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const ProfilePostFollowersFollowings = ({
  label,
  total,
}: {
  total: number;
  label: string;
}) => {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <p className="font-semibold">{total}</p>
      <p className="text-foreground/70">{label}</p>
    </div>
  );
};
