import { getAuth } from "@/lib/next.auth";
import { page } from "@/lib/pages";
import { redirect } from "next/navigation";
import FormChangeUsername from "./Form";

const Page = async () => {
  const session = await getAuth();
  if (!session) {
    redirect(`/${page.login}?cbUrl=${page.changeUsername}`);
  }
  return (
    <div className="w-full pl-14">
      <div>
        <h1 className="text-xl font-semibold">Change username</h1>
      </div>
      <div className="h-6" />
      <FormChangeUsername />
    </div>
  );
};

export default Page;
