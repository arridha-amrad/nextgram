"use client";

import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { useState, useTransition } from "react";
import { updateAccountPrivacy } from "./action";
import Spinner from "@/components/Spinner";
import MySwitch from "@/components/MySwitch";

type Props = {
  isPrivate: boolean;
};

export default function ModalPrivacy({ isPrivate: isP }: Props) {
  const [open, setOpen] = useState(false);
  const [isPrivate, setIsPrivate] = useState(isP);
  const [isPending, startTransition] = useTransition();

  const setPrivateAccount = () => {
    setOpen(false);
    startTransition(async () => {
      await updateAccountPrivacy();
      setIsPrivate(true);
    });
  };

  const setPublicAccount = () => {
    setOpen(false);
    startTransition(async () => {
      await updateAccountPrivacy();
      setIsPrivate(false);
    });
  };

  return (
    <>
      <div className="border-foreground/10 relative flex items-center justify-between rounded-xl border px-4 py-6">
        <div>
          <h1>Private Account</h1>
        </div>
        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute inset-0 z-[999] bg-black/50" />
            <Spinner className="size-8" />
          </div>
        )}
        <MySwitch isChecked={isPrivate} onChange={() => setOpen(true)} />
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="fixed inset-0 flex w-screen items-center justify-center p-4 transition duration-300 ease-out data-[closed]:opacity-0"
        transition
      >
        <DialogBackdrop className="bg-background/70 fixed inset-0" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="bg-bg-secondary relative flex w-full max-w-sm flex-col rounded-xl">
            <DialogTitle className="font-xl py-6 text-center font-medium">
              {isPrivate
                ? "Switch to public account"
                : "Switch to private account?"}
            </DialogTitle>
            <Description
              as="div"
              className="flex h-full w-full flex-col gap-y-4 px-8"
            >
              {isPrivate ? <PublicInfo /> : <PrivateInfo />}
            </Description>
            <hr className="border-foreground/10 mt-6" />
            <button
              onClick={isPrivate ? setPublicAccount : setPrivateAccount}
              className="text-skin-primary block h-12 w-full text-sm font-semibold"
            >
              {isPrivate ? "Switch to public" : "Switch to private"}
            </button>
            <hr className="border-foreground/10" />
            <button
              onClick={() => setOpen(false)}
              className="block h-12 w-full text-sm"
            >
              Cancel
            </button>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

const PublicInfo = () => (
  <>
    <div className="flex gap-4">
      <ReelsIcon />
      <p className="text-sm font-light">
        Anyone can see your posts, reels and stories, and can use your original
        audio and text.
      </p>
    </div>
    <div className="flex gap-4">
      <ThreadsIcon />
      <p className="text-sm font-light">
        This won&apos;t change who can message, tag or @mention you.
      </p>
    </div>
    <div className="flex gap-4">
      <RecyclesIcon />
      <p className="text-sm font-light">
        People can reuse all or part of your posts and reels in features like
        remixes, sequences, templates and stickers and download them as part of
        their reel or post.
      </p>
    </div>
    <div className="flex gap-4">
      <GearIcon />
      <p className="text-sm font-light">
        You can turn off reuse for each post or reel or change the default in
        your settings.
      </p>
    </div>
  </>
);

const GearIcon = () => (
  <svg
    aria-label=""
    fill="currentColor"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
    className="mt-1 shrink-0"
  >
    <title></title>
    <circle
      cx="12"
      cy="12"
      fill="none"
      r="8.635"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></circle>
    <path
      d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
    ></path>
  </svg>
);

const PrivateInfo = () => (
  <>
    <div className="flex gap-4">
      <ReelsIcon />
      <p className="text-sm font-light">
        Only your followers will be able to see your photos and videos.
      </p>
    </div>
    <div className="flex gap-4">
      <ThreadsIcon />
      <p className="text-sm font-light">
        This won&apos;t change who can message, tag or @mention you, but you
        won&apos;t be able to tag people who don&apos;t follow you.
      </p>
    </div>
    <div className="flex gap-4">
      <RecyclesIcon />
      <p className="text-sm font-light">
        No one can reuse your content. All reels, posts and stories that
        previously used your content in features like remixes, sequences,
        templates or stickers will be deleted. If you switch back to a public
        account within 24 hours, they will be restored.
      </p>
    </div>
  </>
);

const RecyclesIcon = () => (
  <svg
    className="mt-1 shrink-0"
    aria-label=""
    fill="currentColor"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <title></title>
    <path d="M11.999 6.999a1 1 0 0 0-1 1V11H8a1 1 0 0 0 0 2h2.999v2.998a1 1 0 0 0 2 0V13H16a1 1 0 0 0 0-2h-3.001V7.999a1 1 0 0 0-1-1ZM21.001 11a1 1 0 0 0-1 1v3.104c0 2.355-.552 3.12-1.14 3.732-.637.614-1.404 1.165-3.758 1.165H8.896c-2.352 0-3.12-.552-3.731-1.139a3.729 3.729 0 0 1-.644-.864H7a1 1 0 0 0 0-2H2a1 1 0 0 0-1 1v5a1 1 0 0 0 2 0v-2.65a6.257 6.257 0 0 0 .751.928c1.076 1.036 2.362 1.725 5.146 1.725h6.206c2.786 0 4.072-.69 5.171-1.751 1.037-1.073 1.727-2.36 1.727-5.146V12a1 1 0 0 0-1-1ZM22 .999a1 1 0 0 0-1 1v2.653a6.2 6.2 0 0 0-.751-.926c-1.073-1.037-2.36-1.727-5.146-1.727H8.897c-2.788 0-4.074.69-5.17 1.751C2.69 4.82 2 6.104 2 8.896V12a1 1 0 0 0 2 0V8.896c0-2.358.55-3.122 1.14-3.731.635-.614 1.402-1.166 3.757-1.166h6.206c2.355 0 3.12.552 3.733 1.142a3.705 3.705 0 0 1 .638.858H17a1 1 0 0 0 0 2h5a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1Z"></path>
  </svg>
);

const ThreadsIcon = () => (
  <svg
    className="mt-1 shrink-0"
    aria-label=""
    fill="currentColor"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <title></title>
    <path
      d="M15.108 13.652a3.342 3.342 0 0 1-3.341 3.342h-.661a2.246 2.246 0 0 1-2.246-2.246v-.634a2.246 2.246 0 0 1 2.246-2.246h3.654"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="2"
    ></path>
    <path
      d="M17.521 22h-7.368a6.95 6.95 0 0 1-3.695-.642 4.356 4.356 0 0 1-1.813-1.812 6.96 6.96 0 0 1-.64-3.696v-7.7a6.964 6.964 0 0 1 .64-3.697 4.36 4.36 0 0 1 1.813-1.812A6.952 6.952 0 0 1 10.153 2h3.74a6.95 6.95 0 0 1 3.694.64 4.356 4.356 0 0 1 1.814 1.813 6.956 6.956 0 0 1 .64 3.696v6.464a2.38 2.38 0 0 1-2.38 2.38h-.13a2.423 2.423 0 0 1-2.422-2.422V9.019a2.471 2.471 0 0 0-2.47-2.471h-.994a2.471 2.471 0 0 0-2.47 2.47v.268"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="2"
    ></path>
  </svg>
);

const ReelsIcon = () => (
  <svg
    className="mt-1 shrink-0"
    aria-label=""
    fill="currentColor"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <title></title>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="2.049"
      x2="21.95"
      y1="7.002"
      y2="7.002"
    ></line>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="13.504"
      x2="16.362"
      y1="2.001"
      y2="7.002"
    ></line>
    <line
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      x1="7.207"
      x2="10.002"
      y1="2.11"
      y2="7.002"
    ></line>
    <path
      d="M2 12.001v3.449c0 2.849.698 4.006 1.606 4.945.94.908 2.098 1.607 4.946 1.607h6.896c2.848 0 4.006-.699 4.946-1.607.908-.939 1.606-2.096 1.606-4.945V8.552c0-2.848-.698-4.006-1.606-4.945C19.454 2.699 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.546 2 5.704 2 8.552Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    ></path>
    <path
      d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z"
      fillRule="evenodd"
    ></path>
  </svg>
);
