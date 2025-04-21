import { getAuth } from "@/lib/next.auth";
import { redirect } from "next/navigation";
import { page as pages } from "@/lib/pages";
import FormChangePassword from "./Form";
import Footer from "@/components/Footer";

const Page = async () => {
  const session = await getAuth();
  if (!session) {
    redirect(`${pages.login}?cbUrl=${pages.changePassword}`);
  }
  return (
    <div className="flex h-full w-full flex-col">
      <div className="mx-auto w-full flex-1 px-10 xl:max-w-[706px]">
        <div className="flex h-[100px] items-center justify-start">
          <h1 className="text-xl font-bold">Change Password</h1>
        </div>
        <FormChangePassword />
      </div>
      <div className="mt-10 flex items-center justify-center gap-2">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
