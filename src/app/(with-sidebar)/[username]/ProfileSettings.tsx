"use client";

import { page } from "@/lib/pages";
import { signOut } from "next-auth/react";
import { useRouter as useR } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useState, useTransition } from "react";
import LogoutDialog from "../../../components/LogoutDialog";
import ModalActionOptions from "../../../components/ModalActionOptions";

const ProfileSettings = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };
  const router = useRouter();
  const r = useR();

  const [isPending, startTransition] = useTransition();

  const logout = async () => {
    await signOut({ redirect: false });
    startTransition(async () => {
      await new Promise((res) => setTimeout(res, 1000));
      r.replace(page.login, { scroll: false });
    });
  };

  return (
    <>
      <button onClick={openModal}>
        <SettingsIcon />
      </button>
      <ModalActionOptions open={open} setOpen={setOpen}>
        <>
          <button
            onClick={() => router.push(page.settings)}
            className="h-12 w-max self-center text-sm"
          >
            Settings
          </button>
          <hr className="border-foreground/10" />

          <button
            onClick={() => router.push(page.changeUsername)}
            className="h-12 w-max self-center text-sm"
          >
            Change Username
          </button>
          <hr className="border-foreground/10" />

          <button
            onClick={() => router.push(page.changePassword)}
            className="h-12 w-max self-center text-sm"
          >
            Change Password
          </button>
          <hr className="border-foreground/10" />
          <button onClick={logout} className="h-12 w-max self-center text-sm">
            Logout
          </button>
          <hr className="border-foreground/10" />
          <button
            onClick={() => setOpen(false)}
            className="h-12 w-max self-center text-sm"
          >
            Cancel
          </button>
        </>
      </ModalActionOptions>
      <LogoutDialog isPending={isPending} />
    </>
  );
};

export default ProfileSettings;

const SettingsIcon = () => (
  <svg
    aria-label="Options"
    fill="currentColor"
    height="24"
    role="img"
    viewBox="0 0 24 24"
    width="24"
  >
    <title>Options</title>
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
