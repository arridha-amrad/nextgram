import { Button } from "@headlessui/react";
import Form from "./Form";
import Link from "next/link";
import { page } from "@/lib/pages";
import InstagramLogo from "@/components/InstagramLogo";
import InstagramDownloadLinks from "@/components/InstagramDownloadLinks";
import GithubButton from "@/components/SocialButtons/GithubButton";
import GoogleButton from "@/components/SocialButtons/GoogleButton";

export default function Page() {
  return (
    <main className="flex w-full max-w-[350px] flex-col items-center justify-center gap-4">
      <main className="border-skin-elevated-separator flex w-full flex-col items-center justify-center rounded-lg border px-8 py-4">
        <div className="mt-6">
          <InstagramLogo />
        </div>
        <div className="my-3">
          <h1 className="text-skin-muted text-center leading-tight font-bold">
            Sign up to see photos and videos from your friends.
          </h1>
        </div>
        <div className="flex w-full items-center gap-2">
          <GoogleButton />
          <GithubButton />
        </div>
        <div className="bg-skin-separator relative my-6 h-px w-full">
          <span className="text-skin-muted absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black px-4 py-1 text-sm font-bold">
            OR
          </span>
        </div>
        <Form />
      </main>
      <div className="border-skin-elevated-separator flex w-full items-center justify-center border py-6">
        <p className="text-sm">
          Have an account&nbsp;
          <Link className="text-skin-primary font-semibold" href={page.login}>
            Login
          </Link>
        </p>
      </div>
      <div className="mb-8">
        <InstagramDownloadLinks />
      </div>
    </main>
  );
}
