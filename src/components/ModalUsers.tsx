import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Spinner from "./Spinner";
import { Dispatch, SetStateAction } from "react";
import UserWithFollowButtonCard from "@/components/UserCardWithFollowButton";
import { TFollow } from "@/lib/drizzle/queries/users/fetchUserFollowers";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  users: TFollow[];
  userId: string;
  title: string;
};

export default function ModalUsers({
  open,
  setOpen,
  isLoading,
  userId,
  users,
  title,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex items-center justify-center px-4 py-10">
        <DialogPanel className="flex w-full max-w-sm items-center justify-center">
          <div className="bg-bg-secondary roundedLg relative w-full max-w-sm rounded-xl">
            <div className="relative space-x-2 py-3 text-center">
              <h1 className="font-semibold tracking-wide">{title}</h1>
              <div className="absolute top-7 right-3 -translate-y-1/2">
                <button onClick={() => setOpen(false)}>
                  <svg
                    aria-label="Close"
                    fill="currentColor"
                    height="18"
                    role="img"
                    viewBox="0 0 24 24"
                    width="18"
                  >
                    <title>Close</title>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="21"
                      x2="3"
                      y1="3"
                      y2="21"
                    ></line>
                    <line
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      x1="21"
                      x2="3"
                      y1="21"
                      y2="3"
                    ></line>
                  </svg>
                </button>
              </div>
            </div>
            <hr className="border-foreground/20" />
            <div className="max-h-[500px] w-full max-w-sm overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Spinner className="w-6" />
                </div>
              ) : (
                users.map((user) => (
                  <UserWithFollowButtonCard
                    sessionUserId={userId}
                    key={user.id}
                    user={user}
                  />
                ))
              )}
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
