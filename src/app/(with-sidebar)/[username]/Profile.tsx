"use client";

import AvatarEditable from "@/components/AvatarEditable";
import AvatarWithStoryIndicator from "@/components/AvatarWithStoryIndicator";
import ButtonFollow from "@/components/ButtonFollow";
import Settings from "@/components/Settings";
import SvgFemale from "@/components/svg/SvgFemale";
import SvgMale from "@/components/svg/SvgMale";
import { TProfile } from "@/lib/drizzle/queries/users/fetchUserProfile";
import Link from "next/link";
import { useParams } from "next/navigation";

type Props = {
  isAuthUser: boolean;
  profile: TProfile;
};

export default function Profile({ isAuthUser, profile }: Props) {
  const { username } = useParams();

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
          <div>
            <h1 className="text-xl">{profile.username}</h1>
          </div>
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
            <ButtonFollow
              isFollow={profile.isFollowed ?? false}
              userId={profile.id ?? ""}
            />
          )}
        </div>
        <div className="flex items-center gap-10 py-4">
          <div className="inline-flex">
            <h1 className="font-semibold">{profile.sumPosts}</h1>
            <span className="text-foreground/70 pl-2">posts</span>
          </div>

          <Link scroll={false} href={`/${username}/followers`}>
            <span className="font-semibold">{profile.sumFollowers}</span>
            <span className="text-foreground/70 pl-2">followers</span>
          </Link>

          <Link scroll={false} href={`/${username}/followings`}>
            <span className="font-semibold">{profile.sumFollowings}</span>
            <span className="text-foreground/70 pl-2">followings</span>
          </Link>
        </div>
        <div className="spacey-2 text-sm">
          <div className="flex items-center gap-1">
            <h1 className="font-medium">{profile.name}</h1>
            {profile.gender === "male" && <SvgMale className="fill-blue-500" />}
            {profile.gender === "female" && (
              <SvgFemale className="fill-pink-500" />
            )}
          </div>
          <div className="text-skin-muted font-medium">
            {profile.occupation}
          </div>
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
