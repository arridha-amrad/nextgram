import { Button } from "@headlessui/react";
import Link from "next/link";
import InstagramLogo from "@/components/InstagramLogo";
import { page } from "@/lib/pages";
import InstagramDownloadLinks from "@/components/InstagramDownloadLinks";
import Form from "./Form";
import { cookies } from "next/headers";
import { getEmailVerificationRequestCookie } from "@/lib/utils";

export default async function Page() {
  const cookie = await cookies();
  const data = await getEmailVerificationRequestCookie(cookie);
  if (!data) {
    return (
      <div>
        <h1>You have no session to visit this page</h1>
        <Link href="/login">Back to login</Link>
      </div>
    );
  }
  return (
    <main className="flex w-full max-w-[350px] flex-1 flex-col items-center justify-center gap-4">
      <main className="border-skin-elevated-separator flex w-full flex-col items-center justify-center rounded-lg border px-8 py-4">
        <div className="mt-6">
          <InstagramLogo />
        </div>
        <div className="my-3 mb-6 space-y-3">
          <h1 className="text-skin-muted text-center leading-tight font-bold">
            Verify your new account
          </h1>
          <p className="text-skin-muted text-center text-sm">
            Enter the code you got from your email
          </p>
        </div>
        <Form id={data} />
        <div className="text-skin-muted my-5 text-sm">
          <span>Back to &nbsp;</span>
          <Link className="text-skin-primary" href={page.login}>
            login
          </Link>
        </div>
        <div className="mb-6 w-full">
          <Button className="bg-background border-skin-primary text-skin-primary w-full rounded-lg border py-2 text-sm font-semibold">
            Login With Facebook
          </Button>
        </div>
      </main>
      <div className="mb-8">
        <InstagramDownloadLinks />
      </div>
    </main>
  );
}
