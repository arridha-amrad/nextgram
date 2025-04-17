import ButtonFollow from "@/components/ButtonFollow";

type Props = {
  profileIsFollowed: boolean;
  profileUserId: string;
};

function PrivateAccountInfo({ profileIsFollowed, profileUserId }: Props) {
  return (
    <div className="flex-1 py-10">
      <hr className="border-foreground/20" />
      <div className="flex items-start justify-center gap-4 py-4">
        <svg
          aria-label=""
          fill="currentColor"
          height="48"
          role="img"
          viewBox="0 0 96 96"
          width="48"
        >
          <title></title>
          <circle
            cx="48"
            cy="48"
            fill="none"
            r="47"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          ></circle>
          <path
            d="M60.931 70.001H35.065a5.036 5.036 0 0 1-5.068-5.004V46.005A5.036 5.036 0 0 1 35.065 41H60.93a5.035 5.035 0 0 1 5.066 5.004v18.992A5.035 5.035 0 0 1 60.93 70ZM37.999 39.996v-6.998a10 10 0 0 1 20 0v6.998"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          ></path>
        </svg>
        <div className="space-y-1">
          <h1 className="text-sm font-medium">This account is private</h1>
          <p className="text-foreground/60 text-sm font-light">
            Follow to see their photos and videos.
          </p>
          <ButtonFollow isFollow={profileIsFollowed} userId={profileUserId} />
        </div>
      </div>
    </div>
  );
}

export default PrivateAccountInfo;
