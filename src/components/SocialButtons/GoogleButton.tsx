"use client";

import { signIn } from "next-auth/react";
import SvgGoogle from "../svg/SvgGoogle";

const GoogleButton = () => {
  const googleLogin = async () => {
    await signIn("google", { redirect: false, callbackUrl: "/" });
  };
  return (
    <button
      onClick={googleLogin}
      className="border-skin-border text-skin-muted inline-flex items-center gap-3 rounded-md border px-3 py-2"
    >
      <SvgGoogle /> google
    </button>
  );
};

export default GoogleButton;
