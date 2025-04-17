"use client";

import { signIn } from "next-auth/react";
import SvgGoogle from "../svg/SvgGoogle";
import { Button } from "@headlessui/react";
import { page } from "@/lib/pages";

const GoogleButton = () => {
  const googleLogin = async () => {
    await signIn("google", { redirect: false, callbackUrl: page.home });
  };
  return (
    <Button
      onClick={googleLogin}
      className="border-foreground/20 flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-white"
    >
      <SvgGoogle />
      Google
    </Button>
  );
};

export default GoogleButton;
