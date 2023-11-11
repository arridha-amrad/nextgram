import ProfileData from "@/components/ProfilePage/ProfileData";
import ProfileTab from "@/components/ProfilePage/ProfileTab";
import ProfileTopBar from "@/components/ProfilePage/ProfileTopBar";
import { Spacer } from "@nextui-org/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default async function ProfileLayout({ children }: Props) {
  return (
    <main className="w-full max-w-5xl mx-auto sm:mt-4 sm:pl-10">
      <ProfileTopBar />
      <ProfileData />
      <Spacer y={4} />
      <div className="w-full">
        <ProfileTab />
      </div>
      {children}
    </main>
  );
}
