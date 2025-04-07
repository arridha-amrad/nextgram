"use client";

import { signIn } from "next-auth/react";
import SvgGithub from "../svg/SvgGithub";
import { Button } from "@headlessui/react";
import { page } from "@/lib/pages";

const GithubButton = () => {
  const githubLogin = async () => {
    await signIn("github", { redirect: false, callbackUrl: page.home });
  };
  return (
    <Button
      onClick={githubLogin}
      className="border-foreground/20 flex w-full items-center justify-center gap-2 rounded-lg border py-2 text-sm font-semibold text-white"
    >
      <SvgGithub />
      GitHub
    </Button>
  );
};

export default GithubButton;
