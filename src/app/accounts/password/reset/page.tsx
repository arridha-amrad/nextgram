import ForgotPasswordReset from "@/components/form/forgot-password-form";
import { Divider, Link, Spacer } from "@nextui-org/react";
import { CiLock } from "react-icons/ci";
import NextLink from "next/link";
import ThemeButton from "@/components/button/ThemeButton";

export default function PasswordReset() {
  return (
    <>
      <div className="fixed bottom-5 right-5">
        <ThemeButton />
      </div>
      <div className="fixed bg-background px-4 h-14 top-0 inset-x-0 z-50 border border-skin-base">
        <div className="container flex h-full items-center mx-auto">
          <h1 className="lg:text-3xl text-xl font-display">nextgram</h1>
        </div>
      </div>
      <Spacer y={20} />
      <div className="h-full w-full px-4 py-8">
        <div className="border border-skin-base mx-auto max-w-sm pt-4">
          <div className="px-8">
            <Spacer y={5} />
            <div className="w-16 h-16 mx-auto">
              <CiLock className="w-full h-full" />
            </div>
            <Spacer y={2} />
            <h1 className="font-semibold text-center">Trouble logging in?</h1>
            <Spacer y={2} />
            <p className="text-skin-accent text-sm text-center w-[80%] mx-auto">
              Enter your email, phone, or username and we&apos;ll send you a
              link to get back into your account.
            </p>
            <Spacer y={5} />
            <ForgotPasswordReset />
            <Spacer y={5} />
            <div className="my-6 relative">
              <Divider />
              <p className="absolute bg-background px-4 py-1 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-bold text-skin-accent">
                OR
              </p>
            </div>
            <Spacer y={5} />
            <div className="w-full text-center">
              <Link
                size="sm"
                className="font-semibold "
                as={NextLink}
                href="/accounts/emailsignup"
              >
                Create new account
              </Link>
            </div>
            <Spacer y={20} />
          </div>
          <div className="text-center py-2 border-t border-skin-base">
            <NextLink href="/accounts/login" className="font-semibold">
              Back to login
            </NextLink>
          </div>
        </div>
      </div>
    </>
  );
}
