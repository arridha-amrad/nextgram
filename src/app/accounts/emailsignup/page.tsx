import FacebookButton from "@/components/button/facebook-btn";
import SignUpForm from "@/components/form/signup-form";
import NavbarAuth from "@/components/button/theme-btn";
import { Divider, Spacer } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4">
      <div className="fixed bottom-5 right-5">
        <NavbarAuth />
      </div>
      <div className="w-full flex">
        <div className="flex-1">
          <div className="max-w-sm mx-auto">
            <div className="border border-skin-base rounded-lg px-4">
              <Spacer y={6} />
              <h1 className="text-5xl text-center font-display">nextgram</h1>
              <Spacer y={6} />
              <h1 className="text-skin-accent text-lg font-semibold whitespace-pre-line break-words text-center">
                Sign up to see photos and videos from your friends
              </h1>
              <Spacer y={2} />
              <FacebookButton type="solid" />
              <Spacer y={2} />
              <div className="my-6 relative">
                <Divider />
                <p className="absolute bg-background px-4 py-1 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-bold text-skin-accent">
                  OR
                </p>
              </div>
              <SignUpForm />
              <Spacer y={4} />
            </div>
            <Spacer y={4} />
            <div className="max-w-sm border border-skin-base rounded-lg py-6">
              <p className="text-center text-small">
                Have an account?{" "}
                <Link className="font-bold text-primary" href="/accounts/login">
                  Login
                </Link>
              </p>
            </div>
            <Spacer y={4} />
            <div className="max-w-sm">
              <p className="text-center">Get the app</p>
              <Spacer y={4} />
              <div className="flex items-center gap-4 justify-center">
                <Image
                  src="https://static.cdninstagram.com/rsrc.php/v3/y1/r/mgodbVDc7bL.png"
                  alt="App Store"
                  width={136}
                  height={40}
                />
                <Image
                  src="https://static.cdninstagram.com/rsrc.php/v3/yT/r/wA97xtdkY1T.png"
                  alt="App Store"
                  width={136}
                  height={40}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
