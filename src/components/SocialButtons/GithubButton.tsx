"use client";

import { signIn } from "next-auth/react";
import SvgGithub from "../svg/SvgGithub";

const GithubButton = () => {
  const githubLogin = async () => {
    await signIn("github", { redirect: false, callbackUrl: "/" });
  };
  return (
    <button
      onClick={githubLogin}
      className="border-skin-border text-skin-muted inline-flex items-center gap-3 rounded-md border px-3 py-2"
    >
      <SvgGithub />
      github
    </button>
  );
};

export default GithubButton;
