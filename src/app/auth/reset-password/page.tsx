import Link from "next/link";
import FormResetPassword from "./Form";
import InstagramLogo from "@/components/InstagramLogo";
import { page } from "@/lib/pages";
import InstagramDownloadLinks from "@/components/InstagramDownloadLinks";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="flex w-full max-w-[350px] flex-1 flex-col items-center justify-center gap-4">
      <main className="border-skin-elevated-separator flex w-full flex-col items-center justify-center rounded-lg border px-8 py-4">
        <div className="mt-6">
          <InstagramLogo />
        </div>
        <div className="border-foreground/20 mt-6 mb-2 flex size-25 items-center justify-center rounded-full border">
          <svg
            fill="#fff"
            height="50px"
            width="50px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 485 485"
            xmlSpace="preserve"
          >
            <g>
              <path
                d="M345,175v-72.5C345,45.981,299.019,0,242.5,0S140,45.981,140,102.5V175H70v310h345V175H345z M170,102.5
		c0-39.977,32.523-72.5,72.5-72.5S315,62.523,315,102.5V175H170V102.5z M385,455H100V205h285V455z"
              />
              <path
                d="M227.5,338.047v53.568h30v-53.569c11.814-5.628,20-17.682,20-31.616c0-19.299-15.701-35-35-35c-19.299,0-35,15.701-35,35
		C207.5,320.365,215.686,332.42,227.5,338.047z"
              />
            </g>
          </svg>
        </div>
        <div className="mb-6">
          <h1 className="text-skin-muted font-medium">Reset Password</h1>
        </div>
        <Suspense>
          <FormResetPassword />
        </Suspense>
        <div className="text-skin-muted mt-8 text-sm">
          <span>Back to &nbsp;</span>
          <Link className="text-skin-primary" href={page.login}>
            login
          </Link>
        </div>
      </main>
      <div className="mb-8">
        <InstagramDownloadLinks />
      </div>
    </main>
  );
}
