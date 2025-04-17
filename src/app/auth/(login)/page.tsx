import Link from "next/link";

import CarouselOnPhone from "@/components/CarouselOnPhone";
import InstagramLogo from "@/components/InstagramLogo";
import { page } from "@/lib/pages";
import InstagramDownloadLinks from "@/components/InstagramDownloadLinks";
import FormLogin from "./FormLogin";
import { Suspense } from "react";
import GoogleButton from "@/components/SocialButtons/GoogleButton";
import GithubButton from "@/components/SocialButtons/GithubButton";

export default function Page() {
  return (
    <main className="flex w-full flex-1 items-center justify-center gap-4">
      <div className="hidden transition-all duration-100 ease-in lg:block">
        <CarouselOnPhone />
      </div>
      <div className="flex w-full max-w-xs flex-col">
        <div className="border-skin-elevated-separator flex flex-col items-center justify-center rounded-lg border">
          <div className="mt-10 mb-12">
            <InstagramLogo />
          </div>
          <Suspense>
            <FormLogin />
          </Suspense>
          <div className="my-6">
            <Link
              className="text-skin-link text-sm font-semibold"
              href={page.forgotPassword}
            >
              Forgot password
            </Link>
          </div>
          <div className="mb-4 flex items-center gap-4">
            <GoogleButton />
            <GithubButton />
          </div>
        </div>
        <div className="border-skin-elevated-separator mt-4 flex items-center justify-center rounded-lg border p-4">
          <p className="text-sm">
            Don&apos;t have an account?&nbsp;
            <Link
              className="text-skin-primary font-semibold"
              href={page.signup}
            >
              Sign Up
            </Link>
          </p>
        </div>
        <div className="my-4">
          <InstagramDownloadLinks />
        </div>
      </div>
    </main>
  );
}
