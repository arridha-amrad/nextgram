import { getAuth } from "@/lib/next.auth";
import { redirect } from "next/navigation";
import { page as pages } from "@/lib/pages";
import FormChangePassword from "./Form";

const Page = async () => {
  const session = await getAuth();
  if (!session) {
    redirect(`/${pages.login}?cbUrl=${pages.changePassword}`);
  }
  return (
    <div className="w-full pl-14">
      <h1 className="text-xl font-semibold">Change password</h1>
      <div className="h-6" />
      <FormChangePassword />
    </div>
  );
};

export default Page;
