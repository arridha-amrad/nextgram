import Avatar from "@/components/Avatar";
import { rgbDataURL } from "@/lib/utils";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { readStory } from "@/lib/actions/stories";

type Props = {
  avatar: string | null;
  username: string;
  id: string;
  contentUrl: string;
  duration: number;
  createdAt: Date;
  isDone: boolean;
  setProgress: Dispatch<SetStateAction<number>>;
  setIsDone: Dispatch<SetStateAction<boolean>>;
  hasWatched: boolean;
};

export default function Player({
  contentUrl,
  duration,
  setProgress,
  avatar,
  username,
  createdAt,
  id,
  isDone,
  setIsDone,
  hasWatched,
}: Props) {
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const [date, setDate] = useState("");

  useEffect(() => {
    if (isDone) {
      setIsPaused(true);
    }
  }, [isDone]);

  useEffect(() => {
    setDate(formatDistanceToNowStrict(createdAt));
  }, [createdAt]);

  const startTimeRef = useRef<number | null>(null);
  const elapsedRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateProgress = () => {
    if (startTimeRef.current === null) return;

    const now = Date.now();
    const elapsed = elapsedRef.current + (now - startTimeRef.current);
    const percent = Math.min((elapsed / duration) * 100, 100);
    setProgress(percent);

    if (percent >= 100 && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
  const startTimer = () => {
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(updateProgress, 16); // ~60fps
  };

  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (startTimeRef.current !== null) {
      elapsedRef.current += Date.now() - startTimeRef.current;
    }
    setIsPaused(true);
  };

  const resumeTimer = () => {
    if (isDone) {
      setIsDone(false);
      setIsPaused(false);
      startTimer();
      elapsedRef.current = 0;
    } else {
      startTimeRef.current = Date.now();
      intervalRef.current = setInterval(updateProgress, 16);
      setIsPaused(false);
    }
  };

  useEffect(() => {
    elapsedRef.current = 0;
    setIsPaused(false);
    startTimer();
    if (!hasWatched) {
      readStory({ storyId: id });
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line
  }, [id]);

  return (
    <>
      <div onClick={(e) => e.stopPropagation()} className="absolute inset-0">
        <div className="h-full w-full overflow-hidden rounded-xl">
          <Image
            src={contentUrl}
            alt="story"
            width={900}
            height={1600}
            placeholder="blur"
            blurDataURL={rgbDataURL(60, 60, 60)}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar
            url={avatar ?? "/default.jpg"}
            style={{ width: 32, height: 32 }}
          />
          <p className="text-sm font-medium text-white">{username}</p>
          <p className="text-sm text-white/50">{date}</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={isPaused ? resumeTimer : pauseTimer}>
            {isPaused ? <PlayIcon /> : <PauseIcon />}
          </button>
          <button>
            <MenuIcon />
          </button>
        </div>
      </div>
      <Actions username={username} />
    </>
  );
}

const Actions = ({ username }: { username: string }) => (
  <div className="absolute inset-x-0 bottom-0">
    <div className="relative flex items-center gap-4 px-4 py-6">
      <form className="relative flex w-full items-center" action="">
        <input
          type="text"
          className="w-full rounded-full border-2 border-white/50 px-4 py-3 text-sm outline-0"
          placeholder={`Reply to ${username}`}
        />
      </form>
      <div className="flex items-center gap-4">
        <button>
          <EmptyLikeIcon />
        </button>
        <button>
          <SendIcon />
        </button>
      </div>
    </div>
  </div>
);

const PauseIcon = () => (
  <svg
    aria-label="Pause"
    height="16"
    className="fill-white text-white"
    role="img"
    viewBox="0 0 48 48"
    width="16"
  >
    <title>Pause</title>
    <path d="M15 1c-3.3 0-6 1.3-6 3v40c0 1.7 2.7 3 6 3s6-1.3 6-3V4c0-1.7-2.7-3-6-3zm18 0c-3.3 0-6 1.3-6 3v40c0 1.7 2.7 3 6 3s6-1.3 6-3V4c0-1.7-2.7-3-6-3z"></path>
  </svg>
);

const MenuIcon = () => (
  <svg
    aria-label="Menu"
    className="fill-white text-white"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <title>Menu</title>
    <circle cx="12" cy="12" r="2.75"></circle>
    <circle cx="19.5" cy="12" r="2.75"></circle>
    <circle cx="4.5" cy="12" r="2.75"></circle>
  </svg>
);

const SendIcon = () => (
  <svg
    aria-label="Direct"
    className="fill-white text-white"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <title>Direct</title>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="22"
      x2="9.218"
      y1="3"
      y2="10.083"
    ></line>
    <polygon
      fill="none"
      points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
    ></polygon>
  </svg>
);

const EmptyLikeIcon = () => (
  <svg
    aria-label="Like"
    className="fill-white text-white"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <title>Like</title>
    <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
  </svg>
);
const PlayIcon = () => (
  <svg
    aria-label="Play"
    fill="currentColor"
    className="fill-white text-white"
    height="16"
    role="img"
    viewBox="0 0 24 24"
    width="16"
  >
    <title>Play</title>
    <path d="M5.888 22.5a3.46 3.46 0 0 1-1.721-.46l-.003-.002a3.451 3.451 0 0 1-1.72-2.982V4.943a3.445 3.445 0 0 1 5.163-2.987l12.226 7.059a3.444 3.444 0 0 1-.001 5.967l-12.22 7.056a3.462 3.462 0 0 1-1.724.462Z"></path>
  </svg>
);
