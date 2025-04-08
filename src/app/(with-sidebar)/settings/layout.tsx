import SvgMeta from "@/components/svg/SvgMeta";
import {
  DocumentTextIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { ReactNode } from "react";
import MyLink from "./MyLink";

type Props = {
  children: ReactNode;
};

export default async function Layout({ children }: Props) {
  return (
    <main className="flex min-h-screen w-full">
      <section className="w-full max-w-xs">
        <div className="flex h-[100px] items-center justify-start px-4">
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
        <AccountCenter />
        <div className="py-4">
          <h1 className="text-skin-muted px-4 text-xs font-medium">
            How you use nextgram
          </h1>
          <div className="h-2" />
          <MyLink href="/settings" label="Edit Profile">
            <UserCircleIcon className="square w-7" />
          </MyLink>
          <MyLink href="/settings/change-username" label="Change Username">
            <UserIcon className="square w-7" />
          </MyLink>
          <MyLink href="/settings/change-password" label="Change Password">
            <LockClosedIcon className="square w-7" />
          </MyLink>
        </div>
      </section>
      <section className="flex-1 basis-0">{children}</section>
    </main>
  );
}

const AccountCenter = () => {
  return (
    <div style={{ width: 267 }} className="relative">
      <div className="bg-skin-fill absolute inset-0 -z-10 rounded-lg blur-sm" />
      <div className="bg-bg-secondary z-50 flex flex-col gap-3 rounded-lg p-4">
        <div className="flex items-center justify-start gap-2">
          <SvgMeta className="h-6 w-6 fill-blue-500" />
          <h1 className="">Meta</h1>
        </div>
        <h1 className="block font-semibold">Account Center</h1>
        <p className="text-skin-muted text-[11px]">
          Manage your connected experiences and account settings across Meta
          technologies.
        </p>
        <div className="text-skin-muted flex items-center gap-2 text-xs">
          <UserIcon className="aspect-square w-5" />
          <p>Personal details</p>
        </div>
        <div className="text-skin-muted flex items-center gap-2 text-xs">
          <ShieldCheckIcon className="aspect-square w-5" />
          <p>Password and security</p>
        </div>
        <div className="text-skin-muted flex items-center gap-2 text-xs">
          <DocumentTextIcon className="aspect-square w-5" />
          <p>Ads preferences</p>
        </div>
        <div className="text-xs">
          <Link href="/" className="text-skin-primary font-medium">
            See more on account ceter
          </Link>
        </div>
      </div>
    </div>
  );
};
